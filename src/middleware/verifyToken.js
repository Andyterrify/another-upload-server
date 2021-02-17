import jwt from 'jsonwebtoken'

const pattern = /(?<=Bearer )([a-zA-Z0-9-_]+.[a-zA-Z0-9-_]+.[a-zA-Z0-9-_]+)/g

export default (req, res, next) => {
    if (!req.headers.authorization) return res.status(400).json({"error": "Missing token"})
    try {
        const token = req.headers.authorization.match(pattern)[0]
        req.decoded = jwt.verify(token, process.env.APP_KEY)
    } catch(e) {
        return res.status(400).json({"error": "Invalid token"})
    }
    next()
}