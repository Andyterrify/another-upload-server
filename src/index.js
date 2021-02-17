import dotenv from 'dotenv'
import {resolve} from 'path'
import server from './server'

dotenv.config({ path: resolve(__dirname, "../.env") })

server.listen(process.env.PORT, () => {
    console.log("Listening on " + process.env.PORT)
})