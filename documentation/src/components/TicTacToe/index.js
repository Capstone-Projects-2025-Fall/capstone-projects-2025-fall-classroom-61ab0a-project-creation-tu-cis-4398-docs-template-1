import React, { useState, useEffect, useRef } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState('');
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const playerRef = useRef('X');
  const boardRef = useRef(['', '', '', '', '', '', '', '', '']);
  
  // Text-to-speech function
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  // Get position name for audio announcement
  const getPositionName = (index) => {
    const positionNames = [
      'top left', 'top center', 'top right',
      'middle left', 'center', 'middle right', 
      'bottom left', 'bottom center', 'bottom right'
    ];
    return positionNames[index];
  };

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
        handleVoiceCommand(command);
      };
      
      setRecognition(recognition);
    }
  }, []);

  const handleVoiceCommand = (command) => {
    console.log('Voice command:', command); // Debug log
    
    // Check for position commands FIRST to avoid false matches
    const positions = {
      'top left': 0, 'top center': 1, 'top right': 2,
      'middle left': 3, 'center': 4, 'middle right': 5,
      'bottom left': 6, 'bottom center': 7, 'bottom right': 8,
      'one': 0, 'two': 1, 'three': 2, 'four': 3, 'five': 4,
      'six': 5, 'seven': 6, 'eight': 7, 'nine': 8,
      '1': 0, '2': 1, '3': 2, '4': 3, '5': 4,
      '6': 5, '7': 6, '8': 7, '9': 8
    };

    // Try exact match first
    let position = positions[command];
    
    // If no exact match, try partial matches
    if (position === undefined) {
      for (const [key, value] of Object.entries(positions)) {
        if (command.includes(key)) {
          position = value;
          break;
        }
      }
    }
    
    if (position !== undefined) {
      console.log('Moving to position:', position, 'Current player:', playerRef.current); // Debug log
      handleClick(position);
      return;
    }
    
    // Only check for control commands if no position was found
    if (command === 'new game' || command === 'reset' || command.includes('new game') || command.includes('reset game')) {
      console.log('Resetting game'); // Debug log
      reset();
      return;
    }
    
    if (command.includes('stop listening')) {
      stopListening();
      return;
    }
    
    if (command.includes('start listening')) {
      startListening();
      return;
    }
    
    console.log('Command not recognized:', command); // Debug log
  };

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setListening(true);
      speak("Listening for voice commands");
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setListening(false);
      speak("Stopped listening");
    }
  };

  const checkWinner = (currentBoard = boardRef.current) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return currentBoard[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    const currentBoard = boardRef.current;
    if (currentBoard[index] || winner) return;

    const currentPlayer = playerRef.current;
    console.log('Current player:', currentPlayer, 'Placing at index:', index); // Debug log
    console.log('Board before move:', currentBoard); // Debug log
    
    const newBoard = [...currentBoard];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    boardRef.current = newBoard;

    // Announce the move
    const positionName = getPositionName(index);
    speak(`${currentPlayer} has been placed in ${positionName}`);
    
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      console.log('Winner found:', gameWinner); // Debug log
      setWinner(gameWinner);
      setTimeout(() => {
        speak(`Player ${gameWinner} wins!`);
      }, 1000);
    } else if (newBoard.every(cell => cell !== '')) {
      console.log('Draw - board is full'); // Debug log
      setWinner('draw');
      setTimeout(() => {
        speak("It's a draw!");
      }, 1000);
    } else {
      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
      console.log('Switching from', currentPlayer, 'to', nextPlayer); // Debug log
      setPlayer(nextPlayer);
      playerRef.current = nextPlayer;
      console.log('Player state updated to:', nextPlayer); // Debug log
      setTimeout(() => {
        speak(`It's ${nextPlayer}'s turn`);
      }, 1500);
    }
  };

  const reset = () => {
    const emptyBoard = ['', '', '', '', '', '', '', '', ''];
    setBoard(emptyBoard);
    boardRef.current = emptyBoard;
    setPlayer('X');
    playerRef.current = 'X';
    setWinner('');
    speak("New game started. It's X's turn");
  };

  console.log('Rendering with player:', player); // Debug log
  
  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Tic Tac Toe with Voice Control</h1>
      
      {!winner && <h2>Current Player: {player}</h2>}
      {winner && winner !== 'draw' && <h2>Player {winner} wins!</h2>}
      {winner === 'draw' && <h2>It's a draw!</h2>}
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={listening ? stopListening : startListening}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: listening ? '#ff4444' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          {listening ? 'Stop' : 'Start'}
        </button>
        
        <button 
          onClick={reset}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          New Game
        </button>
      </div>
      
      {listening && <p style={{ color: 'red' }}>🎤 Listening... Say positions like "top left", "center", "bottom right"</p>}
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 100px)', 
        gap: '5px', 
        justifyContent: 'center',
        margin: '20px auto'
      }}>
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => {
              console.log('Button clicked for index:', index, 'Current player:', player);
              handleClick(index);
            }}
            style={{
              width: '100px',
              height: '100px',
              fontSize: '30px',
              border: '2px solid black',
              backgroundColor: 'white',
              cursor: cell || winner ? 'not-allowed' : 'pointer'
            }}
            disabled={cell || winner}
          >
            {cell}
          </button>
        ))}
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p>Voice Commands:</p>
        <p>"top left", "center", "bottom right", "new game", "start listening", "stop listening"</p>
      </div>
    </div>
  );
};

export default TicTacToe;
