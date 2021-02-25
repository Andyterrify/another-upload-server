import dotenv from 'dotenv'
import { resolve } from 'path'
import server from './server'
import mongoose from 'mongoose'


dotenv.config({ path: resolve(__dirname, "../.env") })

// additions to fix deprecation warnings
// non-existent property `MongoError` can be ignored until new mongodb driver is released
// https://mongoosejs.com/docs/deprecations.html
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const db = mongoose.connection
db.on('error', console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Connection Successful")
})

server.listen(process.env.PORT, () => {
    console.log("Listening on " + process.env.PORT)
})