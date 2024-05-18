const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = process.env.PORT || 3000;

let db;

async function connectToDatabase() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        db = client.db('bubble_db');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to BubbleMath API');
});

app.get('/collection/:name', async (req, res) => {
    const collectionName = req.params.name;
    try {
        const collection = db.collection(collectionName);
        const documents = await collection.find({}).toArray();
        res.json(documents);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.post('/collection/:name', async (req, res) => {
    const collectionName = req.params.name;
    const document = req.body;
    try {
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(document);
        res.status(201).json(result.ops[0]);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
