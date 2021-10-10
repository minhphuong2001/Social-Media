const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@social-media.tjqcb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("Connect DB success!");
    } catch (error) {
        console.log("Connect DB failed ", error.message);
        process.exit(1);
    }
}
module.exports = connectDB;