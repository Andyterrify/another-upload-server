import errs from "./codes"

export default {
    missingField: async (res, field) => {
        return res.status(errs.BAD_REQUEST).json({
            error: `Missing field '${field}'`
        })
    },
    duplicateField: async (res, err) => {
        const field = Object.keys(err.keyValue)
        return res.status(errs.CONFLICT).send(`An account with that field '${field}' already exists.`)
    }
}