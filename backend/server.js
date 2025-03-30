const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5500", // Change this to match your frontend URL
        methods: ["GET", "POST"]
    }
});

let rooms = {}; // Store game rooms and players

// When a client connects
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Create a new game room
    socket.on("createRoom", () => {
        let roomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
        rooms[roomCode] = { players: [] };
        socket.join(roomCode);
        rooms[roomCode].players.push(socket.id);
        socket.emit("roomCreated", roomCode);
        console.log(`Room Created: ${roomCode}`);
    });

    // Join an existing game room
    socket.on("joinRoom", (roomCode) => {
        if (rooms[roomCode] && rooms[roomCode].players.length < 4) {
            socket.join(roomCode);
            rooms[roomCode].players.push(socket.id);
            io.to(roomCode).emit("playerJoined", rooms[roomCode].players.length);
            console.log(`Player joined room: ${roomCode}`);
        } else {
            socket.emit("error", "Room full or doesn't exist");
        }
    });

    // Start the game when enough players join
    socket.on("startGame", (roomCode) => {
        if (rooms[roomCode] && rooms[roomCode].players.length >= 2) {
            io.to(roomCode).emit("gameStarted");
        }
    });

    // Handle game results and determine winner
    socket.on("gameOver", (roomCode, winnerName) => {
        io.to(roomCode).emit("announceWinner", winnerName);
        delete rooms[roomCode]; // Reset the room after the game ends
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Start the server
server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
