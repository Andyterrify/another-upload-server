import { Schema, model } from 'mongoose'

const userSchema = Schema({
    username: { type: String, unique: true, require: true },
    displayName: { type: String, require: true },
    password: { type: String, require: true },
    email: String // don't want to force the user to have a password, or at least not yet
})

export default model('User', userSchema)