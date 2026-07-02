import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g., 'site_config', 'homepage_hero'
  value: { type: mongoose.Schema.Types.Mixed, required: true }
});

export default mongoose.models.Setting || mongoose.model('Setting', SettingSchema);
