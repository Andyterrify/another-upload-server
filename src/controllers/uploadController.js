import { resolve } from 'path'
import File from '../models/fileModel'

export default {
    newFile: async (req, res) => {
        console.log(req.file)
        res
            .send({ "message": "Hello World!" })
            .status(200)
    },
    getFile: async (req, res) => {
        try {
            //const foundFile = await File.findOne({ hash: 'hash' })
            return res.sendFile(resolve(__dirname, '../../uploads/', req.body.image))
        } catch (e) {
            //Not found
            return res.status(404).json({ "error": "Not found" })
        }
    }
}