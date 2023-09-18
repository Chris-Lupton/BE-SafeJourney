const db = require('./connection')

exports.seed = async (data) => {
  let client
  try {
    client = await db.connect()

    const database = client.db()

    await database.collection("users").drop().catch(err => {
      if (err.message !== 'ns not found') {
        throw err
      }
    })

    await database.createCollection("users")

    await database.collection("users").insertMany(data)

  } finally {
    await client.close()
  }
}
