import React, { useState, useEffect } from "react";
import questions from "./McqQuestions";
import WebcamEmotion from "./WebcamEmotion1";
import Chatbot from "./ChatBot";

const Assessment = () => {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (started && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [started, timeLeft]);

  const handleStartTest = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStarted(true);
    }, 3000); // 3-second delay before starting the test
  };

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(30);
    } else {
      setShowResult(true);
    }
  };

  const handleEmotionDetect = (emotion) => {
    setDetectedEmotion(emotion);
  };

  return (
    <div className="assessment-container">
      <h2>MCQ Assessment</h2>

      {!started ? (
        <>
          {loading ? (
            <p>Loading... Please wait.</p>
          ) : (
            <button onClick={handleStartTest} className="start-btn">Start Test</button>
          )}
        </>
      ) : showResult ? (
        <div className="result">
          <h3>Assessment Complete!</h3>
          <p>Your Score: {score} / {questions.length}</p>
          <p>Final Detected Emotion: {detectedEmotion}</p>
        </div>
      ) : (
        <div className="question-section">
          <h3>{questions[currentQuestion].question}</h3>
          <p>Time Left: {timeLeft} seconds</p>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {started && <WebcamEmotion onEmotionDetect={handleEmotionDetect} />}
      {detectedEmotion && <Chatbot emotion={detectedEmotion} />}
    </div>
  );
};

export default Assessment;
