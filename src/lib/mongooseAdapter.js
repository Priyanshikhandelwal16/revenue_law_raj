import mongoose from 'mongoose';
import { readLocalDb, writeLocalDb, getLocalItem, createLocalItem, updateLocalItem, deleteLocalItem } from './localDb';

let patched = false;

export function patchMongooseModels() {
  if (patched) return;
  patched = true;

  console.log("Initializing local file database virtual adapter for Mongoose models...");

  const originalFind = mongoose.Model.find;
  const originalFindOne = mongoose.Model.findOne;
  const originalFindById = mongoose.Model.findById;
  const originalCreate = mongoose.Model.create;
  const originalFindByIdAndUpdate = mongoose.Model.findByIdAndUpdate;
  const originalFindByIdAndDelete = mongoose.Model.findByIdAndDelete;
  const originalFindOneAndDelete = mongoose.Model.findOneAndDelete;
  const originalSave = mongoose.Model.prototype.save;

  const isOffline = () => {
    return global.mongoose && global.mongoose.isOffline;
  };

  const getCollectionName = (modelName) => {
    const map = {
      'Article': 'articles',
      'Judgment': 'judgments',
      'RevenueLaw': 'laws',
      'Notification': 'notifications',
      'Download': 'downloads',
      'Comment': 'comments',
      'Query': 'queries',
      'Glossary': 'glossary',
      'User': 'users',
      'Setting': 'settings'
    };
    return map[modelName] || modelName.toLowerCase() + 's';
  };

  mongoose.Model.find = function(query, ...args) {
    if (isOffline()) {
      console.warn(`[LocalDB] Intercepting Model.find for ${this.modelName}`);
      const type = getCollectionName(this.modelName);
      let items = readLocalDb(type);
      
      // Basic query filtering for offline compatibility
      if (query && typeof query === 'object') {
        items = items.filter(item => {
          for (let key in query) {
            let val = query[key];
            if (key === '$or' && Array.isArray(val)) {
              const matchesOr = val.some(condition => {
                for (let k in condition) {
                  let v = condition[k];
                  if (v && typeof v === 'object' && v instanceof RegExp) {
                    if (v.test(item[k] || '')) return true;
                  } else if (v && typeof v === 'object' && v.$regex) {
                    const opts = v.$options || '';
                    const r = new RegExp(v.$regex, opts);
                    if (r.test(item[k] || '')) return true;
                  } else {
                    if (item[k] === v) return true;
                  }
                }
                return false;
              });
              if (!matchesOr) return false;
              continue;
            }
            if (key.startsWith('$')) continue; // Skip other operators for simple list responses
            if (val && typeof val === 'object' && val instanceof RegExp) {
              if (!val.test(item[key] || '')) return false;
            } else if (val && typeof val === 'object' && val.$regex) {
              const opts = val.$options || '';
              const r = new RegExp(val.$regex, opts);
              if (!r.test(item[key] || '')) return false;
            } else {
              if (item[key] !== val) return false;
            }
          }
          return true;
        });
      }
      
      const mockQuery = Promise.resolve(items);
      mockQuery.sort = function() { return this; };
      mockQuery.limit = function() { return this; };
      mockQuery.select = function() { return this; };
      mockQuery.lean = function() { return this; };
      return mockQuery;
    }
    return originalFind.apply(this, [query, ...args]);
  };

  mongoose.Model.findOne = function(query, ...args) {
    if (isOffline()) {
      console.warn(`[LocalDB] Intercepting Model.findOne for ${this.modelName}`);
      const type = getCollectionName(this.modelName);
      const items = readLocalDb(type);
      let found = null;

      if (query && query.email) {
        found = items.find(i => i.email === query.email);
      } else if (query && query.slug) {
        found = items.find(i => i.slug === query.slug);
      } else if (query && query.key) {
        found = items.find(i => i.key === query.key);
      } else if (query && typeof query === 'object') {
        // Match general object key/value
        found = items.find(item => {
          for (let k in query) {
            if (item[k] !== query[k]) return false;
          }
          return true;
        }) || null;
      } else {
        found = items[0] || null;
      }

      // Convert to model instance so instance methods (toObject, save) exist
      const doc = found ? new this(found) : null;
      if (doc) doc._id = found._id;

      const mockQuery = Promise.resolve(doc);
      mockQuery.sort = function() { return this; };
      mockQuery.limit = function() { return this; };
      mockQuery.select = function() { return this; };
      mockQuery.lean = function() { return this; };
      return mockQuery;
    }
    return originalFindOne.apply(this, [query, ...args]);
  };

  mongoose.Model.findById = function(id, ...args) {
    if (isOffline()) {
      console.warn(`[LocalDB] Intercepting Model.findById for ${this.modelName}`);
      const type = getCollectionName(this.modelName);
      const found = getLocalItem(type, id);
      
      const doc = found ? new this(found) : null;
      if (doc) doc._id = found._id;

      const mockQuery = Promise.resolve(doc);
      mockQuery.sort = function() { return this; };
      mockQuery.limit = function() { return this; };
      mockQuery.select = function() { return this; };
      mockQuery.lean = function() { return this; };
      return mockQuery;
    }
    return originalFindById.apply(this, [id, ...args]);
  };

  mongoose.Model.create = async function(doc, ...args) {
    if (isOffline()) {
      console.warn(`[LocalDB] Intercepting Model.create for ${this.modelName}`);
      const type = getCollectionName(this.modelName);
      const created = createLocalItem(type, doc);
      const docInstance = new this(created);
      docInstance._id = created._id;
      return docInstance;
    }
    return originalCreate.apply(this, [doc, ...args]);
  };

  mongoose.Model.findByIdAndUpdate = function(id, update, options, ...args) {
    if (isOffline()) {
      console.warn(`[LocalDB] Intercepting Model.findByIdAndUpdate for ${this.modelName}`);
      const type = getCollectionName(this.modelName);
      const updates = update && update.$set ? update.$set : update;
      const updated = updateLocalItem(type, id, updates);
      
      const doc = updated ? new this(updated) : null;
      if (doc) doc._id = updated._id;
      return Promise.resolve(doc);
    }
    return originalFindByIdAndUpdate.apply(this, [id, update, options, ...args]);
  };

  mongoose.Model.findByIdAndDelete = function(id, ...args) {
    if (isOffline()) {
      console.warn(`[LocalDB] Intercepting Model.findByIdAndDelete for ${this.modelName}`);
      const type = getCollectionName(this.modelName);
      deleteLocalItem(type, id);
      return Promise.resolve({ _id: id });
    }
    return originalFindByIdAndDelete.apply(this, [id, ...args]);
  };

  mongoose.Model.findOneAndDelete = function(query, ...args) {
    if (isOffline()) {
      console.warn(`[LocalDB] Intercepting Model.findOneAndDelete for ${this.modelName}`);
      const type = getCollectionName(this.modelName);
      if (query && query._id) {
        deleteLocalItem(type, query._id);
      }
      return Promise.resolve({});
    }
    return originalFindOneAndDelete.apply(this, [query, ...args]);
  };

  mongoose.Model.prototype.save = async function(...args) {
    if (isOffline()) {
      console.warn(`[LocalDB] Intercepting Model.prototype.save for ${this.constructor.modelName}`);
      const type = getCollectionName(this.constructor.modelName);
      const data = this.toObject();
      
      if (data._id) {
        updateLocalItem(type, data._id, data);
      } else {
        const created = createLocalItem(type, data);
        this._id = created._id;
      }
      return this;
    }
    return originalSave.apply(this, args);
  };
}
