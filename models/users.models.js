const db = require('../db/connection')

exports.selectUserById = async (id) => {
    const client = await db.connect()
    const database = client.db()

    const user = await database.collection('users').findOne({user_id: +id})

    await client.close()

    return user
}

exports.insertUser = async (user) =>  {
    const client = await db.connect()
    const database = client.db()
    const newUser = await database.collection('users').insertOne(user)
    await client.close()
    return newUser

}
