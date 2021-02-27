import { Schema, model } from 'mongoose';

const userSchema = Schema({
  username: {
    type: String,
    unique: true,
    require: true,
  },
  displayName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: String,
  accountCreated: {
    type: Date,
    default: Date.now,
  },
  access: {
    type: String,
    enum: ['admin', 'basic'],
    default: 'basic',
  },
  refreshTokens: [String],
  blacklistedApiTokens: [{ type: String }],
});

export default model('User', userSchema);
