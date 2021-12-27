const mongoose = require('mongoose')
const config = require('config')
const db = config.get("mongoURI")

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Ket noi co so du lieu thanh cong");
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

module.exports = connectDB