import {Schema, model} from 'mongoose'

const urlSchema = Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    longUrl: {
        type: String,
        required: true,
        unique: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    clickCount: {
        type: String,
        default: 0
    },
    maxClicks: {
        type: String,
        default: 0
    },
    enabled: {
        type: Boolean,
        default: true
    },
    expiresAt: Date
})

export default model('shortUrl', urlSchema)