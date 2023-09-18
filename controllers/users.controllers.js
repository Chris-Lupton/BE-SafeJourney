const { selectUserById } = require("../models/users.models");

exports.getUserById = async (request, response, next) => {
    try {
        const { user_id } = request.params
        const user = await selectUserById(user_id)
        response.status(200).send({ user: user })
    } catch (err) {
        next(err)
    }
}