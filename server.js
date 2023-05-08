const express = require('express');
const cors = require("cors");
const database = require("./database");
const mongoose = require('mongoose');

database.startDatabaseConnection();

const Comment = mongoose.model('comments', database.commentSchema);
Comment.createIndexes();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/comments", async (req, resp) => {
    if (!req.headers.authorization || (req.headers.authorization && (req.headers.authorization.split(" ")[1] !== process.env.TOKEN))) {
        resp.status(401).send("Not authorized")
    } else {
        Comment.find().sort('date').
            then(comments => resp.status(200).send(comments)).
            catch(error => resp.status(500).send(error))
    }
});

app.post("/comment", async (req, resp) => {

    if (!req.headers.authorization || (req.headers.authorization && (req.headers.authorization.split(" ")[1] !== process.env.TOKEN))) {
        resp.status(401).send("Not authorized")
    } else {
        try {
            let comment = new Comment(req.body);
            comment.date = Date.now();
            let result = await comment.save();
            result = result.toObject();
            resp.status(201).send(result);
        } catch (e) {
            resp.status(500).send(e);
        }
    }
});

app.listen(8080);
console.log("Service running at port 8080");