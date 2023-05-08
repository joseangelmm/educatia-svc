const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@academy.33nitp5.mongodb.net/Academy?retryWrites=true&w=majority`;


const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const startDatabaseConnection = () => {
    mongoose
        .connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected to database");
        })
        .catch((e) => console.error("Error connecting to the database: ", e));


    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
}

module.exports ={
    startDatabaseConnection,
    commentSchema,
}