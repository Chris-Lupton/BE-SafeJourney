const db = require('./connection.js')

exports.seed = async (data) => {
  try {
    await db.connect()

    await db.users.drop()

    await db.createCollection("users")

    await db.users.insertMany(data)

  } finally {
    await db.close()
  }
}
