require('dotenv').config()

const cfg = {
    host: String(process.env.APP_HOST),
    port: parseInt(process.env.APP_PORT),
    mongoDNS: String(process.env.APP_MONGO_DNS),
    mongoUser: String(process.env.APP_MONGO_USER),
    mongoPassword: String(process.env.APP_MONGO_PASSWORD)
}

module.exports = cfg