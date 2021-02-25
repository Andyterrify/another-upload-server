import jwt from 'jsonwebtoken'
import user from '../models/userModel'

export default {
    create: (user) => {
        return jwt.sign({
             username: user.username,
             
             displayName: 
             user.displayName }, process.env.JWT_SECRET)
    }
}