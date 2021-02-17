import {Schema, model} from 'mongoose'

const userSchema = Schema({
    email: {type: String, unique: true},
    displayName: String,
    password: String
})

export default model('User', userSchema)