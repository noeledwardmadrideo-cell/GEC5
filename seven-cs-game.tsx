import React, { useState, useEffect } from 'react';

const GAMES_DATA = {
  clarity: {
    title: "Clarity",
    instruction: "Clear or Confusing?",
    questions: [
      {
        text: "Meet me at the place we discussed.",
        options: ["Clear", "Confusing"],
        correct: 1
      },
      {
        text: "Meeting at Conference Room 3, Tuesday 2 PM.",
        options: ["Clear", "Confusing"],
        correct: 0
      },
      {
        text: "Let's catch up sometime soon.",
        options: ["Clear", "Confusing"],
        correct: 1
      },
      {
        text: "Submit your report by Friday 5 PM.",
        options: ["Clear", "Confusing"],
        correct: 0
      },
      {
        text: "We need to talk about that thing.",
        options: ["Clear", "Confusing"],
        correct: 1
      }
    ]
  },
  conciseness: {
    title: "Conciseness",
    instruction: "Which is more concise?",
    questions: [
      {
        text: "Choose the better version:",
        options: [
          "In my opinion, I think we should go",
          "We should go"
        ],
        correct: 1
      },
      {
        text: "Choose the better version:",
        options: [
          "Thanks",
          "I wanted to take this opportunity to thank you"
        ],
        correct: 0
      },
      {
        text: "Choose the better version:",
        options: [
          "Due to the fact that it's late",
          "Because it's late"
        ],
        correct: 1
      },
      {
        text: "Choose the better version:",
        options: [
          "Let's meet",
          "Let's arrange a time to get together"
        ],
        correct: 0
      },
      {
        text: "Choose the better version:",
        options: [
          "At this point in time",
          "Now"
        ],
        correct: 1
      }
    ]
  },
  correctness: {
    title: "Correctness",
    instruction: "Which is correct?",
    questions: [
      {
        text: "Choose the correct version:",
        options: ["Your welcome", "You're welcome"],
        correct: 1
      },
      {
        text: "Choose the correct version:",
        options: ["She doesn't like it", "She don't like it"],
        correct: 0
      },
      {
        text: "Choose the correct version:",
        options: ["alot", "a lot"],
        correct: 1
      },
      {
        text: "Choose the correct version:",
        options: ["It's raining", "Its raining"],
        correct: 0
      },
      {
        text: "Choose the correct version:",
        options: ["I could of gone", "I could have gone"],
        correct: 1
      }
    ]
  },
  concreteness: {
    title: "Concreteness",
    instruction: "Specific or Vague?",
    questions: [
      {
        text: "We'll meet soon.",
        options: ["Specific", "Vague"],
        correct: 1
      },
      {
        text: "Meeting Tuesday at 3 PM in Room 205.",
        options: ["Specific", "Vague"],
        correct: 0
      },
      {
        text: "Send it to me later.",
        options: ["Specific", "Vague"],
        correct: 1
      },
      {
        text: "Email the file to john@company.com by noon.",
        options: ["Specific", "Vague"],
        correct: 0
      },
      {
        text: "Let's improve things.",
        options: ["Specific", "Vague"],
        correct: 1
      }
    ]
  },
  completeness: {
    title: "Completeness",
    instruction: "Complete or Incomplete?",
    questions: [
      {
        text: "Send the file.",
        options: ["Complete", "Incomplete"],
        correct: 1
      },
      {
        text: "Send the budget file to Sarah by 3 PM today.",
        options: ["Complete", "Incomplete"],
        correct: 0
      },
      {
        text: "Call me.",
        options: ["Complete", "Incomplete"],
        correct: 1
      },
      {
        text: "Review the proposal and send feedback by Thursday.",
        options: ["Complete", "Incomplete"],
        correct: 0
      },
      {
        text: "Please respond.",
        options: ["Complete", "Incomplete"],
        correct: 1
      }
    ]
  },
  courtesy: {
    title: "Courtesy",
    instruction: "Which is more polite?",
    questions: [
      {
        text: "Choose the better version:",
        options: [
          "You're wrong",
          "I see it differently"
        ],
        correct: 1
      },
      {
        text: "Choose the better version:",
        options: [
          "Could you please help?",
          "I need help now"
        ],
        correct: 0
      },
      {
        text: "Choose the better version:",
        options: [
          "You made a mistake",
          "Let's review this together"
        ],
        correct: 1
      },
      {
        text: "Choose the better version:",
        options: [
          "Thank you for your time",
          "Hurry up"
        ],
        correct: 0
      },
      {
        text: "Choose the better version:",
        options: [
          "That's stupid",
          "I have a different perspective"
        ],
        correct: 1
      }
    ]
  },
  coherence: {
    title: "Coherence",
    instruction: "Which order makes sense?",
    questions: [
      {
        text: "Choose the logical sequence:",
        options: [
          "I woke up. I got dressed. I had breakfast.",
          "I had breakfast. I woke up. I got dressed."
        ],
        correct: 0
      },
      {
        text: "Choose the logical sequence:",
        options: [
          "We launched. We planned. We built.",
          "We planned. We built. We launched."
        ],
        correct: 1
      },
      {
        text: "Choose the logical sequence:",
        options: [
          "First mix. Then bake. Finally eat.",
          "First eat. Then bake. Finally mix."
        ],
        correct: 0
      },
      {
        text: "Choose the logical sequence:",
        options: [
          "I'm celebrating. I got hired. I interviewed.",
          "I interviewed. I got hired. I'm celebrating."
        ],
        correct: 1
      },
      {
        text: "Choose the logical sequence:",
        options: [
          "Turn on computer. Open email. Reply.",
          "Reply. Open email. Turn on computer."
        ],
        correct: 0
      }
    ]
  }
};

export default function SevenCsGame() {
  const [gameState, setGameState] = useState('lobby');
  const [roomCode, setRoomCode] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState([]);
  const [currentC, setCurrentC] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [playerAnswers, setPlayerAnswers] = useState({});
  const [transitioning, setTransitioning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('playerName');
    if (stored) setPlayerName(stored);
  }, []);

  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateRoom = () => {
    if (!playerName.trim()) return;
    localStorage.setItem('playerName', playerName);
    const code = generateRoomCode();
    setRoomCode(code);
    setPlayers([{ name: playerName, score: 0 }]);
    setGameState('waiting');
  };

  const handleJoinRoom = () => {
    if (!playerName.trim() || !roomCode.trim()) return;
    localStorage.setItem('playerName', playerName);
    setPlayers([
      { name: 'Host', score: 0 },
      { name: playerName, score: 0 }
    ]);
    setGameState('waiting');
  };

  const handleStart = () => {
    setGameState('playing');
    setStartTime(Date.now());
    setQuestionStartTime(Date.now());
  };

  const cKeys = Object.keys(GAMES_DATA);
  const currentCData = GAMES_DATA[cKeys[currentC]];
  const currentQ = currentCData.questions[currentQuestion];

  const handleOptionSelect = (index) => {
    if (selectedOption !== null) return;
    
    const answerTime = Date.now() - questionStartTime;
    setSelectedOption(index);
    const correct = index === currentQ.correct;
    setIsCorrect(correct);
    setShowFeedback(true);

    // Update current player score and time
    const updatedPlayers = [...players];
    updatedPlayers[0] = {
      ...updatedPlayers[0],
      score: updatedPlayers[0].score + (correct ? 1 : 0),
      totalTime: (updatedPlayers[0].totalTime || 0) + answerTime
    };

    // Simulate other players answering with random times
    const newAnswers = {};
    updatedPlayers.forEach((player, i) => {
      if (i === 0) {
        newAnswers[player.name] = correct;
      } else {
        const otherCorrect = Math.random() > 0.3;
        const otherTime = Math.random() * 3000 + 1000;
        newAnswers[player.name] = otherCorrect;
        updatedPlayers[i] = {
          ...updatedPlayers[i],
          score: updatedPlayers[i].score + (otherCorrect ? 1 : 0),
          totalTime: (updatedPlayers[i].totalTime || 0) + otherTime
        };
      }
    });
    
    setPlayers(updatedPlayers);
    setPlayerAnswers(newAnswers);

    setTimeout(() => {
      setTransitioning(true);
      setTimeout(() => {
        moveToNext();
      }, 250);
    }, 1200);
  };

  const moveToNext = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    setTransitioning(false);
    setPlayerAnswers({});

    if (currentQuestion < currentCData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setQuestionStartTime(Date.now());
    } else {
      if (currentC < cKeys.length - 1) {
        setCurrentC(currentC + 1);
        setCurrentQuestion(0);
        setQuestionStartTime(Date.now());
      } else {
        setGameState('complete');
      }
    }
  };

  const handleRestart = () => {
    setGameState('lobby');
    setRoomCode('');
    setCurrentC(0);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setPlayers([]);
  };

  if (gameState === 'lobby') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="text-center max-w-md w-full animate-fadeIn">
          <h1 className="text-5xl font-light text-blue-900 mb-12">
            7 Cs of Communication
          </h1>
          
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Your name"
            className="w-full p-4 mb-8 text-center text-xl text-blue-900 border-2 border-blue-900 focus:outline-none focus:border-yellow-400 transition-colors duration-150"
          />

          <button
            onClick={handleCreateRoom}
            disabled={!playerName.trim()}
            className="w-full mb-4 px-12 py-4 text-lg text-blue-900 bg-white border-2 border-blue-900 hover:bg-yellow-400 transition-all duration-150 disabled:opacity-40 disabled:hover:bg-white"
          >
            Create Room
          </button>

          <div className="my-8 text-blue-900 opacity-40 text-sm">or</div>

          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            placeholder="Room code"
            className="w-full p-4 mb-4 text-center text-xl text-blue-900 border-2 border-blue-900 focus:outline-none focus:border-yellow-400 transition-colors duration-150"
          />

          <button
            onClick={handleJoinRoom}
            disabled={!playerName.trim() || !roomCode.trim()}
            className="w-full px-12 py-4 text-lg text-blue-900 bg-white border-2 border-blue-900 hover:bg-yellow-400 transition-all duration-150 disabled:opacity-40 disabled:hover:bg-white"
          >
            Join Room
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'waiting') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="text-center max-w-md w-full animate-fadeIn">
          <h1 className="text-3xl font-light text-blue-900 mb-4">
            Room Code
          </h1>
          <p className="text-6xl font-light text-blue-900 mb-12 tracking-wider">
            {roomCode}
          </p>

          <div className="mb-12">
            <p className="text-sm font-light text-blue-900 opacity-60 mb-4">
              Players in room:
            </p>
            {players.map((player, i) => (
              <p key={i} className="text-xl text-blue-900 mb-2">
                {player.name}
              </p>
            ))}
          </div>

          <button
            onClick={handleStart}
            className="px-12 py-4 text-lg text-blue-900 bg-white border-2 border-blue-900 hover:bg-yellow-400 transition-all duration-150"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'complete') {
    // Calculate rankings: first by score (descending), then by time (ascending)
    const rankedPlayers = [...players].sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score; // Higher score first
      }
      return a.totalTime - b.totalTime; // Faster time first
    });

    const formatTime = (ms) => {
      const seconds = Math.floor(ms / 1000);
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      if (minutes > 0) {
        return `${minutes}m ${remainingSeconds}s`;
      }
      return `${seconds}s`;
    };

    const totalQuestions = Object.values(GAMES_DATA).reduce((sum, c) => sum + c.questions.length, 0);

    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="text-center max-w-2xl w-full animate-fadeIn">
          <h1 className="text-5xl font-light text-blue-900 mb-16">
            Final Rankings
          </h1>
          
          <div className="mb-16 space-y-6">
            {rankedPlayers.map((player, i) => (
              <div 
                key={i} 
                className={`p-6 border-2 transition-all duration-150 ${
                  i === 0 
                    ? 'border-yellow-400 bg-yellow-400' 
                    : 'border-blue-900'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-light text-blue-900">
                    {i + 1}. {player.name}
                  </span>
                  {i === 0 && (
                    <span className="text-2xl">👑</span>
                  )}
                </div>
                <div className="flex items-center justify-between text-blue-900 opacity-60">
                  <span className="text-lg">
                    Score: {player.score}/{totalQuestions}
                  </span>
                  <span className="text-lg">
                    Time: {formatTime(player.totalTime || 0)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleRestart}
            className="px-12 py-4 text-lg text-blue-900 bg-white border-2 border-blue-900 hover:bg-yellow-400 transition-all duration-150"
          >
            New Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-3xl">
        <div className="mb-16 text-center">
          <p className="text-sm font-light text-blue-900 opacity-60">
            {currentCData.title} — {currentQuestion + 1} of {currentCData.questions.length}
          </p>
        </div>

        <div
          className={`transition-all duration-300 ${
            transitioning ? 'opacity-0 -translate-x-8' : 'opacity-100 translate-x-0'
          }`}
        >
          <h2 className="text-3xl font-light text-blue-900 mb-4 text-center animate-slideUp">
            {currentCData.instruction}
          </h2>

          <p className="text-2xl font-normal text-blue-900 mb-12 text-center leading-relaxed animate-slideUp">
            {currentQ.text}
          </p>

          <div className="space-y-4 mb-8">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={selectedOption !== null}
                className={`w-full p-6 text-left text-xl font-normal text-blue-900 transition-all duration-150
                  ${selectedOption === null ? 'hover:bg-yellow-400 cursor-pointer' : 'cursor-default'}
                  ${selectedOption === index ? 'bg-yellow-400 scale-[1.02]' : 'bg-white'}
                  ${selectedOption !== null && selectedOption !== index ? 'opacity-40' : 'opacity-100'}
                  border-2 border-blue-900
                `}
              >
                {option}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className="text-center animate-fadeIn">
              <p className="text-3xl font-light text-blue-900 mb-6">
                {isCorrect ? 'Correct!' : '...'}
              </p>
              
              {Object.keys(playerAnswers).length > 0 && (
                <div className="text-sm text-blue-900 opacity-60">
                  {Object.entries(playerAnswers).map(([name, correct]) => (
                    <span key={name} className="inline-block mx-2">
                      {name}: {correct ? '✓' : '○'}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 300ms ease-out;
        }

        .animate-slideUp {
          animation: slideUp 300ms ease-out;
        }
      `}</style>
    </div>
  );
}