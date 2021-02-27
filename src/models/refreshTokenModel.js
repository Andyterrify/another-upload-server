import { Schema, model, ObjectId } from 'mongoose';

const refreshTokenSchema = Schema({
  userId: {
    type: ObjectId,
    require: true,
  },
  tokenHash: {
    type: String,
    require: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    require: true,
  },
});

export default model('RefreshToken', refreshTokenSchema);
