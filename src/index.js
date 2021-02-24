import dotenv from 'dotenv'
import { resolve } from 'path'
import server from './server'
import mongoose from 'mongoose'


dotenv.config({ path: resolve(__dirname, "../.env") })

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
});

const db = mongoose.connection
db.on('error', console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Connection Successful")
})

server.listen(process.env.PORT, () => {
    console.log("Listening on " + process.env.PORT)
})