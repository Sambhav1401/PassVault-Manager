const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const port = 3000
const { MongoClient, Collection } = require('mongodb');
const bodyParser = require('body-parser');
const cors=require('cors');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'passwordManager';
client.connect();


const app = express()
app.use(bodyParser.json());
app.use(cors());
//get all passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findresult = await collection.find({}).toArray();
    res.json(findresult)
})

//save password
app.post('/', async (req, res) => {
    const password=req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findresult = await collection.insertOne(password);
    res.json({success:true,result:findresult})
})

//delete password
app.delete('/', async (req, res) => {
    const password=req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findresult = await collection.deleteOne(password);
    res.json({success:true,result:findresult})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
