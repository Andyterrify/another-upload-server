import argon from 'argon2'
import userModel from '../models/userModel'
import clientErrors from '../utils/clientErrors'
import codes from '../utils/codes'

export default {
    register: async (req, res) => {
        // TODO: should I maybe check if the user exists before argon? could have like 20ms
        try {
            const user = await userModel.create({
                username: req.body.username,
                displayName: req.body.displayName,
                email: req.body.email,
                password: await argon.hash(req.body.password)
            })
            // TODO: Need to return a JWT
            return res.status(codes.CREATED).json(user)
        } catch (err) {
            // handle for duplicated fields, maybe, need to check
            if (err.code && err.code === 11000) return clientErrors.duplicateField(res, err)
            // implement other errors
            console.log(err)
            return res.status(500).json(err)
        }

    },
    login: async (req, res) => {

    }
}