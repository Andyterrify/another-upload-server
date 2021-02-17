export default {
    retrieve: async (req, res) => {
        const user = await UserModel.findOne({_id: req.decoded.user._id})
        user.password = '**********'
        return res.json({user: user})
    },
    update: (req, res) => {

    },
    delete: (req, res) => {

    }
}