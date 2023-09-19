const db = require('../db/connection')

exports.selectUserById = async (id) => {
    const client = await db.connect()
    const database = client.db()

    const user = await database.collection('users').findOne({user_id: +id})

    await client.close()

    return user
}

exports.insertUser = async (user) =>  {
   
    if(user.name===undefined||user.phoneNumber===undefined){
        return Promise.reject({status:400, msg:"Invalid input"})
    }
    const client = await db.connect()
    const database = client.db()
    const newUser = await database.collection('users').insertOne(user)

    await client.close()
    return newUser

}

exports.updateUserFriends = async (id, newFriendsList) =>{
    const client = await db.connect()
    const database = client.db()
    const filterCriteria = { user_id: id };
    const newUser = await database.collection('users').updateOne(filterCriteria, {friendsList: newFriendsList})



}
