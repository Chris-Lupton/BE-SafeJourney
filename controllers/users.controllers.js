const { selectUserById, insertUser } = require("../models/users.models");

exports.getUserById = async (request, response, next) => {
    try {
        const { user_id } = request.params
        const user = await selectUserById(user_id)
        response.status(200).send({ user: user })
    } catch (err) {
        next(err)
    }
}

exports.postUser = async(request, response, next) => {
    try{
        const newUser = request.body
        console.log(newUser)
        const user = await insertUser(newUser)
        console.log(user)
        response.status(201).send({user: user })
    } catch(err){
        next(err)
    }
}