const cors = require('cors')
const express = require("express");
const mongodb = require("mongodb");
require('dotenv').config()

const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;

const app = express();
const dbURL =process.env.DB_URL || "mongodb://127.0.0.1:27017";
const dbNAME =process.env.DB_NAME
const port =process.env.port || 3000


app.use(express.json());
app.use(cors())
app.options("*",cors())

app.get("/getmentor", async (req, res) => {
    try {
        let clientInfo = await mongoClient.connect(dbURL);
        let db = clientInfo.db(dbNAME);
        let data = await db.collection("mentor").find().toArray();
        res.status(200).json({data});
        clientInfo.close();
    } catch (error) {
        console.log(error);
        res.send(500);
    }
});

app.post("/Addmentor", async (req, res) => {
    try {
        let clientInfo = await mongoClient.connect(dbURL);
        let db = clientInfo.db(dbNAME);
        let data = await db.collection("mentor").insertOne(req.body);
        res.status(200).json({message: "mentor created"});
        clientInfo.close();
    } catch (error) {
        console.log(error);
        res.send(500);
    }
});

app.get("/getmentor/:id", async (req, res) => {
    try {
        let clientInfo = await mongoClient.connect(dbURL);
        let db = clientInfo.db(dbNAME);
        let data = await db.collection("mentor").findOne({
            _id: objectId(req.params.id)
        });
        res.status(200).json({data});
        clientInfo.close();
    } catch (error) {
        console.log(error);
        res.send(500);
    }
});

app.put("/updatementor/:id", async (req, res) => {
    try {
        let clientInfo = await mongoClient.connect(dbURL);
        let db = clientInfo.db(dbNAME);
        let data = await db.collection("mentor").updateOne({
            _id: objectId(req.params.id)
        },{$push:{students:req.body.studentname}});
        res.status(200).json({message: "mentor updated"});
        clientInfo.close();
    } catch (error) {
        console.log(error);
        res.send(500);
    }
})

app.put("/removefrommentor/:id", async (req, res) => {
    try {
        let clientInfo = await mongoClient.connect(dbURL);
        let db = clientInfo.db(dbNAME);
        let data = await db.collection("mentor").updateOne({
            _id: objectId(req.params.id)
        },{$pull:{students:req.body.studentname}});
        res.status(200).json({message: "mentor updated"});
        clientInfo.close();
    } catch (error) {
        console.log(error);
        res.send(500);
    }
})

app.delete("/deletementor/:id", async (req, res) => {
    try {
        let clientInfo = await mongoClient.connect(dbURL);
        let db = clientInfo.db(dbNAME);
        let data = await db.collection("mentor").deleteOne({
            _id: objectId(req.params.id)
        });
        res.status(200).json({message: "mentor deleted"});
        clientInfo.close();
    } catch (error) {
        console.log(error);
        res.send(500);
    }
})

app.get("/getstudent", async (req, res) => {
    try {
        let clientInfo = await mongoClient.connect(dbURL);
        let db = clientInfo.db(dbNAME);
        let data = await db.collection("student").find().toArray();
        res.status(200).json({data});
        clientInfo.close();
    } catch (error) {
        console.log(error);
        res.send(500);
    }
});

app.post("/Addstudent", async (req, res) => {
    try {
        let clientInfo = await mongoClient.connect(dbURL);
        let db = clientInfo.db(dbNAME);
        let data = await db.collection("student").insertOne(req.body);
        res.status(200).json({message: "student created"});
        clientInfo.close();
    } catch (error) {
        console.log(error);
        res.send(500);
    }
});

app.get("/getstudent/:id", async (req, res) => {
    try {
        let clientInfo = await mongoClient.connect(dbURL);
        let db = clientInfo.db(dbNAME);
        let data = await db.collection("student").findOne({
            _id: objectId(req.params.id)
        });
        res.status(200).json({data});
        clientInfo.close();
    } catch (error) {
        console.log(error);
        res.send(500);
    }
});

app.put("/updatestudent/:id", async (req, res) => {
    try {
        let clientInfo = await mongoClient.connect(dbURL);
        let db = clientInfo.db(dbNAME);
        let data = await db.collection("student").updateOne({
            _id: objectId(req.params.id)
        },{$set:req.body});
        res.status(200).json({message: "student updated"});
        clientInfo.close();
    } catch (error) {
        console.log(error);
        res.send(500);
    }
})

app.delete("/deletestudent/:id", async (req, res) => {
    try {
        let clientInfo = await mongoClient.connect(dbURL);
        let db = clientInfo.db(dbNAME);
        let data = await db.collection("student").deleteOne({
            _id: objectId(req.params.id)
        });
        res.status(200).json({message: "student deleted"});
        clientInfo.close();
    } catch (error) {
        console.log(error);
        res.send(500);
    }
})

app.listen(port, () => console.log("your app runs with port:",port));
