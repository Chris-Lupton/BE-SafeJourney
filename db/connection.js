const { MongoClient, ServerApiVersion } = require('mongodb')

require('dotenv').config({path: `${__dirname}/../.env.development`})

module.exports = new MongoClient(process.env.DATABASE_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})