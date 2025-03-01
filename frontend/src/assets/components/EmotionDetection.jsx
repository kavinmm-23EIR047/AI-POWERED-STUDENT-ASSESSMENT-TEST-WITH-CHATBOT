import React, { useState } from "react";

const WebcamEmotion = ({ onEmotionDetect }) => {
  const [emotion, setEmotion] = useState("");

  // Simulate Emotion Detection (Replace with Real Model)
  const detectEmotion = () => {
    const emotions = ["Happy 😊", "Neutral 😐", "Stressed 😟", "Sad 😢"];
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    setEmotion(randomEmotion);
    onEmotionDetect(randomEmotion);
  };

  return (
    <div className="webcam-container">
      <h3>Webcam Emotion Detection</h3>
      <button onClick={detectEmotion}>Detect Emotion</button>
      {emotion && <p>Detected Emotion: {emotion}</p>}
    </div>
  );
};

export default WebcamEmotion;
