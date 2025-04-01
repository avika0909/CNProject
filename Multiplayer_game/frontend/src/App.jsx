import { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import io from 'socket.io-client';

const socket=io('ws://localhost:5001');

function App() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [info, setInfo] = useState(false);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [scores, setScores] = useState([]);
  const [seconds, setSeconds] = useState(30); // Set an initial value
  const [winner, setWinner] = useState();
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null); // Added missing state

  function handleSubmit(e) {
    e.preventDefault();
    if (name && room) {
      setInfo(true);
    }
  }

  const handleAnswer = (answerIndex) => {
    if (!answered) {
      
      
      
      setSelectedAnswerIndex(answerIndex);

      socket.emit('submitAnswer', room, answerIndex);
      setAnswered(true);
    }
  };

  //socket.io to connect
  useEffect(() => {
    // Exit the effect when the timer reaches 0
    if (seconds === 0) return;
  
    // Create an interval to decrement the time every second
    const timerInterval = setInterval(() => {
      setSeconds(prevTime => prevTime - 1);
    }, 1000);
  
    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(timerInterval);
    };
  }, [seconds]); 
    useEffect(() => {
      if (name) {
        socket.emit('joinRoom', room, name);
      }
    }, [info]);

    useEffect(() => {
      socket.on('message', (message) => {
       
        toast(`${message} joined`,{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
  
  
      });
      return ()=>{
        socket.off('message')
      }
    }, []);

    useEffect(() => {
      socket.on('newQuestion', (data) => {
        setQuestion(data.question);
        setOptions(data.answers);
        setAnswered(false);
        setSeconds(data.timer)
        setSelectedAnswerIndex();
       
  
    
      });
  
      socket.on('answerResult', (data) => {
        if (data.isCorrect) {
          
          toast(`Correct! ${data.playerName} got it right.`, {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        } 
        setScores(data.scores);
        // else {
        // setResult(`Incorrect. The correct answer was: ${data.answers[data.correctAnswer]}`);
      // }

    });

    socket.on('gameOver', (data)=>{
      setWinner(data.winner);
    })

    return () => {
      socket.off('newQuestion');
      socket.off('answerResult');
      socket.off('gameOver');
    };
  }, []);

  if(winner){
    return (
      
      <h1><b>Congratulation😽</b> <br /> <br />Winner is {winner} 🩵💙</h1>
    )
  }

  
  
  

  // function handleAnswer(index) {
  //   setSelectedAnswerIndex(index);
  //   setAnswered(true);
  // }

  return (
    <div className="App">
      {!info ? (
        <div className="join-div">
          <h1>Langlink</h1>
          <form onSubmit={handleSubmit}>
            <input required placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
            <input required placeholder="Enter room no" value={room} onChange={(e) => setRoom(e.target.value)} />
            <button type="submit" className="join-btn">JOIN</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Langlink</h1>
          <p className="room-id">Room Id: {room}</p>
          <ToastContainer />
          {question ? (
            <div className="quiz-div">
              <p>Remaining Time: {seconds}</p>
              <div className="question">
                <p className="question-text">{question}</p>
              </div>
              <ul>
                {options.map((answer, index) => (
                  <li key={index}>
                    <button
                      className={`options ${selectedAnswerIndex === index ? 'selected' : ''}`}
                      onClick={() => handleAnswer(index)}
                      disabled={answered}
                    >
                      {answer}
                    </button>
                  </li>
                ))}
              </ul>
              {scores.map((player, index) => (
                <p key={index}>
                  {player.name}: {player.score}
                </p>
              ))}
            </div>
          ) : (
            <p>Loading Question........</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
