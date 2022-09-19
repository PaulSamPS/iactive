const mongoose = require('mongoose')

const connectDb = () => {
    mongoose.connect(process.env.MONGO_CONNECT_URL)
}

module.exports = connectDb