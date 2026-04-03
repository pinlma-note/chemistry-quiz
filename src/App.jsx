import React, { useState } from 'react';
import { quizPool } from './data';
import './index.css';

function App() {
  const [gameState, setGameState] = useState('start'); // 'start', 'quiz', 'result'
  const [activeQuizData, setActiveQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const startGame = () => {
    const selectedQuizData = [];
    for (let level = 1; level <= 5; level++) {
      const levelQuestions = quizPool[level];
      const randomQuestion = levelQuestions[Math.floor(Math.random() * levelQuestions.length)];
      selectedQuizData.push(randomQuestion);
    }
    setActiveQuizData(selectedQuizData);

    setGameState('quiz');
    setCurrentIndex(0);
    setScore(0);
    setShowExplanation(false);
  };

  const handleAnswer = (option) => {
    setSelectedOption(option);
    const correct = option === activeQuizData[currentIndex].correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setSelectedOption(null);
    if (currentIndex + 1 < activeQuizData.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setGameState('result');
    }
  };

  return (
    <div className="app-container">
      {gameState === 'start' && (
        <div className="glass-card">
          <div className="bounce" style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧪✨</div>
          <h1 className="title">まいにちの<br/>かがくクイズ</h1>
          <p className="description">
            化学（かがく）は魔法みたいな力！<br/>
            きみのまわりにある不思議を<br/>
            クイズで解き明かそう！
          </p>
          <button className="primary-btn" onClick={startGame}>
            スタート！
          </button>
        </div>
      )}

      {gameState === 'quiz' && activeQuizData.length > 0 && (
        <div className="glass-card" style={{ position: 'relative' }}>
          <div style={{ textAlign: 'left', marginBottom: '1rem', color: 'var(--secondary)', fontWeight: 'bold' }}>
            第 {currentIndex + 1} 問 / {activeQuizData.length}
          </div>
          
          <div style={{ display: 'inline-block', background: 'var(--accent)', padding: '5px 15px', borderRadius: '20px', marginBottom: '1rem', fontWeight: 'bold' }}>
            {activeQuizData[currentIndex].type}
          </div>
          
          <h2 style={{ fontSize: '1.4rem', marginBottom: '2rem', lineHeight: '1.5' }}>
            {activeQuizData[currentIndex].question}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {activeQuizData[currentIndex].options.map((option, idx) => (
              <button 
                key={idx}
                className="primary-btn"
                style={{ 
                  backgroundColor: showExplanation ? (option === activeQuizData[currentIndex].correctAnswer ? '#4FB0C6' : '#CCC') : 'var(--primary)',
                  boxShadow: showExplanation ? 'none' : '0 6px 0 #D47A3A',
                  transform: showExplanation ? 'none' : '',
                  pointerEvents: showExplanation ? 'none' : 'auto'
                }}
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {showExplanation && (
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              animation: 'bounce 0.5s ease-out'
            }}>
              <h2 style={{ color: isCorrect ? '#4FB0C6' : '#FF9B54', fontSize: '2.5rem', marginBottom: '1rem' }}>
                {isCorrect ? 'せいかい！🎉' : 'ざんねん！💦'}
              </h2>
              <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem', textAlign: 'left' }}>
                {activeQuizData[currentIndex].explanation}
              </p>
              <button className="primary-btn" onClick={nextQuestion}>
                {currentIndex + 1 < activeQuizData.length ? 'つぎの問題へ' : '結果をみる'}
              </button>
            </div>
          )}
        </div>
      )}

      {gameState === 'result' && (
        <div className="glass-card">
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆✨</div>
          <h1 className="title">クイズ終了！</h1>
          <p className="description" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--secondary)' }}>
            {activeQuizData.length}問中、{score}問せいかい！
          </p>
          <p className="description" style={{ marginBottom: '2rem' }}>
            化学はいつもきみのまわりにあって、<br/>
            生活を便利で楽しくしてくれているよ。<br/>
            化学はお友達なんだ！
          </p>
          <button className="primary-btn" onClick={startGame}>
            もういちど遊ぶ
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
