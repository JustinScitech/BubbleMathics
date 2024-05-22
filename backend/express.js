import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const ATLAS_URI = process.env.ATLAS_URI;
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: '*',
        methods: '*'
    }
});

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

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to BubbleMath API -  ExpressJS Backend');
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

let waitingUsers = [[], [], []];

io.on('connection', (socket) => {
    console.log('[*] a user connected');

    socket.on('joinRoom', (lobbyIndex) => {
        const userId = socket.id;
        waitingUsers[lobbyIndex].push(userId);
        io.emit('waitingUsersUpdate', waitingUsers);

        if (lobbyIndex === 0 && waitingUsers[lobbyIndex].length === 2) {
            io.to(waitingUsers[lobbyIndex][0]).emit('startGame');
            io.to(waitingUsers[lobbyIndex][1]).emit('startGame');
            waitingUsers[lobbyIndex] = [];
        }
    });

    socket.on('disconnect', () => {
        waitingUsers = waitingUsers.map(lobby => lobby.filter(user => user !== socket.id));
        io.emit('waitingUsersUpdate', waitingUsers);
        console.log('[*] user disconnected');
    });
});

connectToDatabase().then(() => {
    server.listen(PORT, () => {
        console.log(`Express Server is running on port ${PORT}`);
    });
});
