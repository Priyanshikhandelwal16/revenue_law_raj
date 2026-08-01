import mongoose from 'mongoose';
import { readLocalDb, getLocalItem, createLocalItem, updateLocalItem, deleteLocalItem } from './localDb';

function convertDatesToStrings(obj) {
  if (obj instanceof Date) {
    return obj.toISOString();
  }
  if (Array.isArray(obj)) {
    return obj.map(convertDatesToStrings);
  }
  if (obj && typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Object]') {
    const res = {};
    for (let k in obj) {
      res[k] = convertDatesToStrings(obj[k]);
    }
    return res;
  }
  return obj;
}

let patched = false;

export function patchMongooseModels() {
  if (patched) return;
  patched = true;

  console.log("Initializing Firebase Firestore virtual adapter for Mongoose models...");

  const originalFind = mongoose.Model.find;
  const originalFindOne = mongoose.Model.findOne;
  const originalFindById = mongoose.Model.findById;
  const originalCreate = mongoose.Model.create;
  const originalFindByIdAndUpdate = mongoose.Model.findByIdAndUpdate;
  const originalFindByIdAndDelete = mongoose.Model.findByIdAndDelete;
  const originalFindOneAndDelete = mongoose.Model.findOneAndDelete;
  const originalFindOneAndUpdate = mongoose.Model.findOneAndUpdate;
  const originalSave = mongoose.Model.prototype.save;
  const originalDeleteOne = mongoose.Model.deleteOne;
  const originalDeleteMany = mongoose.Model.deleteMany;

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
      console.warn(`[FirestoreAdapter] Intercepting Model.find for ${this.modelName}`);
      const type = getCollectionName(this.modelName);
      
      const promise = readLocalDb(type).then(items => {
        // Basic query filtering for offline compatibility
        if (query && typeof query === 'object') {
          items = items.filter(item => {
            for (let key in query) {
              let val = query[key];
              if (key === '$or' && Array.isArray(val)) {
                const matchesOr = val.some(condition => {
                  for (let k in condition) {
                    let v = condition[k];
                    if (v && typeof v === 'object' && Array.isArray(v.$in)) {
                      if (Array.isArray(item[k])) {
                        if (item[k].some(valEl => v.$in.includes(valEl))) return true;
                      } else {
                        if (v.$in.includes(item[k])) return true;
                      }
                    } else if (v && typeof v === 'object' && v instanceof RegExp) {
                      if (Array.isArray(item[k])) {
                        if (item[k].some(valEl => v.test(valEl || ''))) return true;
                      } else {
                        if (v.test(item[k] || '')) return true;
                      }
                    } else if (v && typeof v === 'object' && v.$regex) {
                      const opts = v.$options || '';
                      const r = new RegExp(v.$regex, opts);
                      if (Array.isArray(item[k])) {
                        if (item[k].some(valEl => r.test(valEl || ''))) return true;
                      } else {
                        if (r.test(item[k] || '')) return true;
                      }
                    } else {
                      if (Array.isArray(item[k])) {
                        if (item[k].includes(v)) return true;
                      } else {
                        if (item[k] === v) return true;
                      }
                    }
                  }
                  return false;
                });
                if (!matchesOr) return false;
                continue;
              }
              if (key.startsWith('$')) continue; // Skip other operators for simple list responses
              if (val && typeof val === 'object' && Array.isArray(val.$in)) {
                if (Array.isArray(item[key])) {
                  if (!item[key].some(valEl => val.$in.includes(valEl))) return false;
                } else {
                  if (!val.$in.includes(item[key])) return false;
                }
              } else if (val && typeof val === 'object' && val instanceof RegExp) {
                if (Array.isArray(item[key])) {
                  if (!item[key].some(valEl => val.test(valEl || ''))) return false;
                } else {
                  if (!val.test(item[key] || '')) return false;
                }
              } else if (val && typeof val === 'object' && val.$regex) {
                const opts = val.$options || '';
                const r = new RegExp(val.$regex, opts);
                if (Array.isArray(item[key])) {
                  if (!item[key].some(valEl => r.test(valEl || ''))) return false;
                } else {
                  if (!r.test(item[key] || '')) return false;
                }
              } else {
                if (item[key] !== val) return false;
              }
            }
            return true;
          });
        }
        return items;
      });

      // Chain helpers
      promise.sort = function(sortObj) {
        const nextPromise = this.then(items => {
          if (sortObj && typeof sortObj === 'object') {
            const key = Object.keys(sortObj)[0];
            const direction = sortObj[key];
            return [...items].sort((a, b) => {
              const valA = a[key];
              const valB = b[key];
              if (valA === valB) return 0;
              if (valA === undefined || valA === null) return 1;
              if (valB === undefined || valB === null) return -1;
              if (direction === -1 || direction === 'desc') {
                return valA > valB ? -1 : 1;
              }
              return valA > valB ? 1 : -1;
            });
          }
          return items;
        });
        nextPromise.sort = this.sort;
        nextPromise.limit = this.limit;
        nextPromise.select = this.select;
        nextPromise.lean = this.lean;
        return nextPromise;
      };

      promise.limit = function(num) {
        const nextPromise = this.then(items => {
          if (typeof num === 'number') {
            return items.slice(0, num);
          }
          return items;
        });
        nextPromise.sort = this.sort;
        nextPromise.limit = this.limit;
        nextPromise.select = this.select;
        nextPromise.lean = this.lean;
        return nextPromise;
      };

      promise.select = function() { return this; };
      promise.lean = function() { return this; };
      return promise;
    }
    return originalFind.apply(this, [query, ...args]);
  };

  mongoose.Model.findOne = function(query, ...args) {
    if (isOffline()) {
      console.warn(`[FirestoreAdapter] Intercepting Model.findOne for ${this.modelName}`);
      const type = getCollectionName(this.modelName);
      
      const promise = readLocalDb(type).then(items => {
        let found = null;
        if (query && query.email) {
          found = items.find(i => i.email === query.email);
        } else if (query && query.slug) {
          found = items.find(i => i.slug === query.slug);
        } else if (query && query.key) {
          found = items.find(i => i.key === query.key);
        } else if (query && typeof query === 'object') {
          found = items.find(item => {
            for (let k in query) {
              if (item[k] !== query[k]) return false;
            }
            return true;
          }) || null;
        } else {
          found = items[0] || null;
        }
        
        const doc = found ? new this(found) : null;
        if (doc) {
          doc._id = found._id;
          doc.isNew = false;
          doc.__originalId = found._id;
        }
        return doc;
      });

      promise.sort = function() { return this; };
      promise.limit = function() { return this; };
      promise.select = function() { return this; };
      promise.lean = function() { return this; };
      return promise;
    }
    return originalFindOne.apply(this, [query, ...args]);
  };

  mongoose.Model.findById = function(id, ...args) {
    if (isOffline()) {
      console.warn(`[FirestoreAdapter] Intercepting Model.findById for ${this.modelName}`);
      const type = getCollectionName(this.modelName);
      
      const promise = getLocalItem(type, id).then(found => {
        const doc = found ? new this(found) : null;
        if (doc) {
          doc._id = found._id;
          doc.isNew = false;
          doc.__originalId = found._id;
        }
        return doc;
      });

      promise.sort = function() { return this; };
      promise.limit = function() { return this; };
      promise.select = function() { return this; };
      promise.lean = function() { return this; };
      return promise;
    }
    return originalFindById.apply(this, [id, ...args]);
  };

  mongoose.Model.create = async function(doc, ...args) {
    if (isOffline()) {
      console.warn(`[FirestoreAdapter] Intercepting Model.create for ${this.modelName}`);
      const type = getCollectionName(this.modelName);
      const created = await createLocalItem(type, doc);
      const docInstance = new this(created);
      docInstance._id = created._id;
      docInstance.isNew = false;
      docInstance.__originalId = created._id;
      return docInstance;
    }
    return originalCreate.apply(this, [doc, ...args]);
  };

  mongoose.Model.findByIdAndUpdate = async function(id, update, options, ...args) {
    if (isOffline()) {
      console.warn(`[FirestoreAdapter] Intercepting Model.findByIdAndUpdate for ${this.modelName}`);
      const type = getCollectionName(this.modelName);
      const updates = update && update.$set ? update.$set : update;
      const updated = await updateLocalItem(type, id, updates);
      
      const doc = updated ? new this(updated) : null;
      if (doc) {
        doc._id = updated._id;
        doc.isNew = false;
        doc.__originalId = updated._id;
      }
      return doc;
    }
    return originalFindByIdAndUpdate.apply(this, [id, update, options, ...args]);
  };

  mongoose.Model.findOneAndUpdate = async function(query, update, options, ...args) {
    if (isOffline()) {
      console.warn(`[FirestoreAdapter] Intercepting Model.findOneAndUpdate for ${this.modelName}`);
      const type = getCollectionName(this.modelName);
      const items = await readLocalDb(type);
      
      let found = items.find(item => {
        for (let k in query) {
          if (item[k] !== query[k]) return false;
        }
        return true;
      });

      const updates = update && update.$set ? update.$set : update;
      let item;
      if (found) {
        item = await updateLocalItem(type, found._id, updates);
      } else {
        const insertData = { ...query, ...updates };
        item = await createLocalItem(type, insertData);
      }

      const doc = item ? new this(item) : null;
      if (doc) {
        doc._id = item._id;
        doc.isNew = false;
        doc.__originalId = item._id;
      }
      return doc;
    }
    return originalFindOneAndUpdate.apply(this, [query, update, options, ...args]);
  };

  mongoose.Model.findByIdAndDelete = async function(id, ...args) {
    if (isOffline()) {
      console.warn(`[FirestoreAdapter] Intercepting Model.findByIdAndDelete for ${this.modelName}`);
      const type = getCollectionName(this.modelName);
      await deleteLocalItem(type, id);
      return { _id: id };
    }
    return originalFindByIdAndDelete.apply(this, [id, ...args]);
  };

  mongoose.Model.findOneAndDelete = async function(query, ...args) {
    if (isOffline()) {
      console.warn(`[FirestoreAdapter] Intercepting Model.findOneAndDelete for ${this.modelName}`);
      const type = getCollectionName(this.modelName);
      if (query && query._id) {
        await deleteLocalItem(type, query._id);
      }
      return {};
    }
    return originalFindOneAndDelete.apply(this, [query, ...args]);
  };

  mongoose.Model.deleteOne = async function(query, ...args) {
    if (isOffline()) {
      console.warn(`[FirestoreAdapter] Intercepting Model.deleteOne for ${this.modelName}`);
      const type = getCollectionName(this.modelName);
      if (query && query.uploadId) {
        const items = await readLocalDb(type);
        const found = items.find(i => i.uploadId === query.uploadId);
        if (found) {
          await deleteLocalItem(type, found._id);
        }
      } else if (query && query._id) {
        await deleteLocalItem(type, query._id);
      } else if (query && typeof query === 'object') {
        const items = await readLocalDb(type);
        const found = items.find(item => {
          for (let k in query) {
            if (item[k] !== query[k]) return false;
          }
          return true;
        });
        if (found) {
          await deleteLocalItem(type, found._id);
        }
      }
      return { deletedCount: 1 };
    }
    return originalDeleteOne.apply(this, [query, ...args]);
  };

  mongoose.Model.deleteMany = async function(query, ...args) {
    if (isOffline()) {
      console.warn(`[FirestoreAdapter] Intercepting Model.deleteMany for ${this.modelName}`);
      const type = getCollectionName(this.modelName);
      if (!query || Object.keys(query).length === 0) {
        const items = await readLocalDb(type);
        for (let item of items) {
          await deleteLocalItem(type, item._id);
        }
        return { deletedCount: items.length };
      }
      const items = await readLocalDb(type);
      let count = 0;
      for (let item of items) {
        let match = true;
        for (let k in query) {
          if (item[k] !== query[k]) {
            match = false;
            break;
          }
        }
        if (match) {
          await deleteLocalItem(type, item._id);
          count++;
        }
      }
      return { deletedCount: count };
    }
    return originalDeleteMany.apply(this, [query, ...args]);
  };

  mongoose.Model.prototype.save = async function(...args) {
    if (isOffline()) {
      console.warn(`[FirestoreAdapter] Intercepting Model.prototype.save for ${this.constructor.modelName}`);
      const type = getCollectionName(this.constructor.modelName);
      const data = convertDatesToStrings(this.toObject({ flattenMaps: true }));
      
      let id = this.__originalId || this._id;
      if (id && typeof id === 'object' && id.toString) {
        id = id.toString();
      }
      
      if (id) {
        data._id = id;
        await updateLocalItem(type, id, data);
      } else {
        const created = await createLocalItem(type, data);
        this._id = created._id;
        this.__originalId = created._id;
      }
      return this;
    }
    return originalSave.apply(this, args);
  };
}
