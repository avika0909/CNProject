const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const app = express();

const server = http.createServer(app);
app.use(cors());
const io = socketIo(server, {
   cors: {
     origin: "http://localhost:5173",
     methods: ["GET", "POST"],
   },
});
const questions = [
    {
      question: "What is the Tamil word for 'Good Morning'?",
      answers: [
        { text: "காலை வணக்கம் (Kaalai Vanakkam)", correct: true },
        { text: "வணக்கம் (Vanakkam)", correct: false },
        { text: "நன்றி (Nandri)", correct: false },
        { text: "சென்று வாருங்கள் (Sendru Vaazhungal)", correct: false },
      ],
    },
    {
      question: "How do you say 'Thank You' in Tamil?",
      answers: [
        { text: "மன்னிக்கவும் (Mannikkavum)", correct: false },
        { text: "நன்றி (Nandri)", correct: true },
        { text: "வணக்கம் (Vanakkam)", correct: false },
        { text: "எப்படி இருக்கிறீர்கள்? (Eppadi Irukkirirgal?)", correct: false },
      ],
    },
    {
      question: "What is the Tamil word for 'Water'?",
      answers: [
        { text: "காலம் (Kaalam)", correct: false },
        { text: "தண்ணீர் (Thanneer)", correct: true },
        { text: "வெயில் (Veyil)", correct: false },
        { text: "மழை (Mazhai)", correct: false },
      ],
    },
    {
      question: "How do you say 'Friend' in Tamil?",
      answers: [
        { text: "அம்மா (Amma)", correct: false },
        { text: "நண்பன் (Nanban)", correct: true },
        { text: "புத்தகம் (Puthagam)", correct: false },
        { text: "உணவு (Unavu)", correct: false },
      ],
    },
    {
      question: "What is the Tamil word for 'Food'?",
      answers: [
        { text: "நீர் (Neer)", correct: false },
        { text: "உணவு (Unavu)", correct: true },
        { text: "தொலைபேசி (Tholaipesi)", correct: false },
        { text: "மணி (Mani)", correct: false },
      ],
    },
    {
      question: "How do you say 'Book' in Tamil?",
      answers: [
        { text: "மணிகண்டன் (Manikandan)", correct: false },
        { text: "புத்தகம் (Puthagam)", correct: true },
        { text: "படிப்பு (Padippu)", correct: false },
        { text: "எழுது (Ezhuthu)", correct: false },
      ],
    },
    {
      question: "What is the Tamil word for 'School'?",
      answers: [
        { text: "மருத்துவமனை (Maruthuvamanai)", correct: false },
        { text: "பள்ளி (Palli)", correct: true },
        { text: "நகர் (Nagar)", correct: false },
        { text: "படிப்பு (Padippu)", correct: false },
      ],
    },
    {
      question: "How do you say 'Teacher' in Tamil?",
      answers: [
        { text: "மாணவர் (Maanavar)", correct: false },
        { text: "ஆசிரியர் (Aasiriyar)", correct: true },
        { text: "நண்பர் (Nanbar)", correct: false },
        { text: "வாத்தியார் (Vaathiyar)", correct: false },
      ],
    },
    {
      question: "What is the Tamil word for 'Sun'?",
      answers: [
        { text: "மழை (Mazhai)", correct: false },
        { text: "சூரியன் (Sooriyan)", correct: true },
        { text: "நிலவு (Nilavu)", correct: false },
        { text: "காற்று (Kaatru)", correct: false },
      ],
    },
    {
      question: "How do you say 'Father' in Tamil?",
      answers: [
        { text: "தங்கை (Thangai)", correct: false },
        { text: "அப்பா (Appa)", correct: true },
        { text: "அம்மா (Amma)", correct: false },
        { text: "பெரியவர் (Periyavar)", correct: false },
      ],
    },
    {
      question: "What is the Tamil word for 'Mother'?",
      answers: [
        { text: "அப்பா (Appa)", correct: false },
        { text: "அம்மா (Amma)", correct: true },
        { text: "தங்கை (Thangai)", correct: false },
        { text: "சிறுவன் (Siruvan)", correct: false },
      ],
    },
    {
      question: "How do you say 'Brother' in Tamil?",
      answers: [
        { text: "அண்ணன் (Annan)", correct: true },
        { text: "தங்கை (Thangai)", correct: false },
        { text: "அம்மா (Amma)", correct: false },
        { text: "நண்பர் (Nanbar)", correct: false },
      ],
    },
    {
      question: "What is the Tamil word for 'Sister'?",
      answers: [
        { text: "நண்பன் (Nanban)", correct: false },
        { text: "தங்கை (Thangai)", correct: true },
        { text: "அப்பா (Appa)", correct: false },
        { text: "பள்ளி (Palli)", correct: false },
      ],
    },
    {
      question: "How do you say 'Doctor' in Tamil?",
      answers: [
        { text: "வாத்தியார் (Vaathiyar)", correct: false },
        { text: "மருத்துவர் (Maruththuvvar)", correct: true },
        { text: "ஆசிரியர் (Aasiriyar)", correct: false },
        { text: "மாணவர் (Maanavar)", correct: false },
      ],
    },
    {
      question: "What is the Tamil word for 'Hospital'?",
      answers: [
        { text: "மருத்துவமனை (Maruthuvamanai)", correct: true },
        { text: "பள்ளி (Palli)", correct: false },
        { text: "புத்தகம் (Puthagam)", correct: false },
        { text: "நகரம் (Nagaram)", correct: false },
      ],
    },
    {
      question: "How do you say 'Home' in Tamil?",
      answers: [
        { text: "மருத்துவமனை (Maruthuvamanai)", correct: false },
        { text: "வீடு (Veedu)", correct: true },
        { text: "நகரம் (Nagaram)", correct: false },
        { text: "மரம் (Maram)", correct: false },
      ],
    },
    {
      question: "What is the Tamil word for 'Rain'?",
      answers: [
        { text: "மழை (Mazhai)", correct: true },
        { text: "சூரியன் (Sooriyan)", correct: false },
        { text: "நிலவு (Nilavu)", correct: false },
        { text: "வெயில் (Veyil)", correct: false },
      ],
    },
    {
      question: "How do you say 'Cold' in Tamil?",
      answers: [
        { text: "குளிர் (Kulir)", correct: true },
        { text: "வெயில் (Veyil)", correct: false },
        { text: "காற்று (Kaatru)", correct: false },
        { text: "மழை (Mazhai)", correct: false },
      ],
    },
    {
      question: "What is the Tamil word for 'Hot'?",
      answers: [
        { text: "வெயில் (Veyil)", correct: true },
        { text: "குளிர் (Kulir)", correct: false },
        { text: "மழை (Mazhai)", correct: false },
        { text: "நிலவு (Nilavu)", correct: false },
      ],
    },
  ];
  const rooms = {};
  
// export default questions;
io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("joinRoom", (room, name) => {
        socket.join(room);
        console.log(`${name} joined room ${room}`);

    io.to(room).emit("message", `${name} has joined the game!`);  


if (!rooms[room]) {
    rooms[room] = {
      players: [],
      currentQuestion: null,
      correctAnswer: null,
      questionTimeout: null,
      shouldAskNewQuestion: true,
    };
  }
  rooms[room].players.push({ id: socket.id, name });
  console.log(rooms);

    if (!rooms[room].currentQuestion) {
      askNewQuestion(room);
    }


});
socket.on("submitAnswer", (room, answerIndex) => {
    const currentPlayer = rooms[room].players.find(
      (player) => player.id === socket.id
    );

    if (currentPlayer) {
      const correctAnswer = rooms[room].correctAnswer;
      const isCorrect = correctAnswer !== null && correctAnswer === answerIndex;
      currentPlayer.score = isCorrect
        ? (currentPlayer.score || 0) + 1
        : (currentPlayer.score || 0) - 0;

      clearTimeout(rooms[room].questionTimeout);

      io.to(room).emit("answerResult", {
        playerName: currentPlayer.name,
        isCorrect,
        correctAnswer,
        scores: rooms[room].players.map((player) => ({
          name: player.name,
          score: player.score || 0,
        })),
      });

      const winningThreshold = 5;
      const winner = rooms[room].players.find(
        (player) => (player.score || 0) >= winningThreshold
      );

      if (winner) {
        io.to(room).emit("gameOver", { winner: winner.name });
        delete rooms[room];
      } else {
        askNewQuestion(room);
      }
    }
  });

  socket.on("disconnect", () => {
    for (const room in rooms) {
      rooms[room].players = rooms[room].players.filter(
        (player) => player.id !== socket.id
      );
    }

    console.log("A user disconnected");
  });
});
    

function askNewQuestion(room) {
    if (rooms[room].players.length === 0) {
      clearTimeout(rooms[room].questionTimeout);
      delete rooms[room];
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];
    rooms[room].currentQuestion = question;

    const correctAnswerIndex = question.answers.findIndex(
      (answer) => answer.correct
    );
  
    rooms[room].correctAnswer = correctAnswerIndex;
    rooms[room].shouldAskNewQuestion = true;
    io.to(room).emit("newQuestion", {
      question: question.question,
      answers: question.answers.map((answer) => answer.text),
      timer: 8,    //change the timer
    });


  
    rooms[room].questionTimeout = setTimeout(() => {
      io.to(room).emit("answerResult", {
        playerName: "No one",
        isCorrect: false,
        correctAnswer: rooms[room].correctAnswer,
        scores: rooms[room].players.map((player) => ({
          name: player.name,
          score: player.score || 0,
        })),
      });
  
      askNewQuestion(room);
    }, 10000);
  }


  
const PORT = process.env.PORT || 5001;


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });