import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';  // Import cors

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Specify the path to the .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const ATLAS_URI = process.env.ATLAS_URI;
const PORT = process.env.PORT || 3000; 

const app = express();
let db;

async function connectToDatabase() {
    const uri = ATLAS_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        db = client.db('bubbleMath');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

// Use CORS middleware
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to BubbleMath API');
});

app.get('/questions', async (req, res) => {
    try {
        const collection = db.collection('questions');
        const questions = await collection.find({}).toArray();
        res.json(questions);
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
        console.log(`Express Server is running on port ${PORT}`);
    });
});
