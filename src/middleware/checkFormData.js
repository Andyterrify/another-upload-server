import clientErrors from '../utils/clientErrors'

export default {
    // Check if all the required data for registering is provided
    register: async (req, res, next) => {

        if (typeof req.body.username === 'undefined') return clientErrors.missingField(res, 'username')
        if (typeof req.body.email === 'undefined') return clientErrors.missingField(res, 'email')
        if (typeof req.body.password === 'undefined') return clientErrors.missingField(res, 'password')
        if (typeof req.body.displayName === 'undefined') return clientErrors.missingField(res, 'displayName')
        return next()
    }

}