const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const PORT = 3000;

let client;

async function connect() {
    const uri = "mongodb://localhost:27017";
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

function getCollection(collectionName) {
    return client.db("bubble_db").collection(collectionName);
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connect();
});

module.exports = { getCollection };
