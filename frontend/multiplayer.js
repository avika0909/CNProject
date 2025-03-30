const socket = io("http://localhost:3000");
let currentRoom = "";

// Create a new game room
function createRoom() {
    socket.emit("createRoom");
}

socket.on("roomCreated", (roomCode) => {
    currentRoom = roomCode;
    document.getElementById("roomCodeDisplay").innerText = `Game Code: ${roomCode}`;
    document.getElementById("gameArea").style.display = "block";
});

// Join an existing room
function joinGame() {
    let code = document.getElementById("gameCodeInput").value;
    if (code) {
        socket.emit("joinRoom", code);
        currentRoom = code;
    }
}

socket.on("playerJoined", (players) => {
    document.getElementById("status").innerText = `${players} players in the game!`;
    if (players >= 2) {
        document.getElementById("startGame").style.display = "block";
    }
});

// Start the game
function startGame() {
    socket.emit("startGame", currentRoom);
}

socket.on("gameStarted", () => {
    document.getElementById("status").innerText = "Game Started!";
});

// Simulate game over (Random winner)
function gameOver() {
    let winner = "Player " + Math.floor(Math.random() * 4 + 1);
    socket.emit("gameOver", currentRoom, winner);
}

socket.on("announceWinner", (winner) => {
    document.getElementById("winnerDisplay").innerText = `🏆 Winner is: ${winner} 🏆`;
});
