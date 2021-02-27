import { Schema, model } from 'mongoose';

const blackAccToken = Schema({
  token: {
    type: String,
    require: true,
    unique: true,
  },
});

export default model('BlackAccToken', blackAccToken);
