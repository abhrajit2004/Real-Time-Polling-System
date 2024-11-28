const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb');
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);  
const MONGO_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
app.use(express.json());
const client = new MongoClient(MONGO_URI);
const io = require('socket.io')(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST']
    }
});


let pollCache = {};


io.on('connection', (socket) => {
    console.log('A user is connected', socket.id);

    socket.on('joinpoll', async (pollId) => {
        socket.join(pollId);
        console.log(`Client ${socket.id} joined poll ${pollId}`)

        if (!pollCache.pollId) {
            const db = client.db('pollswift');
            const poll = await db.collection('polls').findOne({ pollId });
            pollCache[pollId] = poll;
        }

        socket.emit('pollData', pollCache[pollId]);
    })

    socket.on('vote', async (pollId, optionIndex) => {
        let poll = pollCache[pollId];

        
        if (poll && poll.options[optionIndex]) {
            
            poll.options[optionIndex].votes++;

            io.to(pollId).emit('pollData', poll); // Emit updated poll to all clients in the room

            const db = client.db('pollswift');
            await db.collection('polls').updateOne(
                { pollId },
                { $set: { options: poll.options } }
            );
        }
       

    })

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

client.connect().then(() => console.log('Connected to MongoDB'));

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Socket is running");
});
