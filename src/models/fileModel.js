import { Schema, model } from 'mongoose'

const fileSchema = mongoose.Schema({
    hash: {
        type: String,
        unique: true
    },
    path: String
})

export default model('File', fileSchema)