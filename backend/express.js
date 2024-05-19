import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import { Server } from 'socket.io';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const ATLAS_URI = process.env.ATLAS_URI;
const PORT = process.env.PORT || 5050;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Update this to match your frontend URL
    methods: ['GET', 'POST']
  }
}); // Initialize Socket.io server

let db;

async function connectToDatabase() {
  const uri = ATLAS_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB!');
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

// Socket.io connection handling
let waitingUsers = [];

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinRoom', () => {
    const userId = socket.id;
    waitingUsers.push(userId);
    io.emit('waitingUsersUpdate', waitingUsers);
  });

  socket.on('disconnect', () => {
    waitingUsers = waitingUsers.filter((user) => user !== socket.id);
    io.emit('waitingUsersUpdate', waitingUsers);
    console.log('user disconnected');
  });
});

connectToDatabase().then(() => {
  server.listen(PORT, () => {
    console.log(`Express Server is running on port ${PORT}`);
  });
});
