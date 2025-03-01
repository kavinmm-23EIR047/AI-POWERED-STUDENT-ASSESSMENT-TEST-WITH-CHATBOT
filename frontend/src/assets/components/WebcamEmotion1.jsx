import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";

const WebcamEmotion = ({ onEmotionDetect }) => {
  const webcamRef = useRef(null);
  const [emotion, setEmotion] = useState("");

  useEffect(() => {
    const checkWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (stream) {
          console.log("Webcam access granted.");
        }
      } catch (err) {
        console.error("Webcam access denied:", err);
      }
    };

    checkWebcam();

    const interval = setInterval(() => {
      detectEmotion();
    }, 5000); // Detect emotion every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const detectEmotion = () => {
    if (webcamRef.current) {
      const emotions = ["Happy 😀", "Neutral 😐", "Stressed 😟", "Sad 😢"];
      const detected = emotions[Math.floor(Math.random() * emotions.length)];

      setEmotion(detected);
      onEmotionDetect(detected);
    }
  };

  return (
    <div className="webcam-container">
      <h3>Live Emotion Detection</h3>
      <Webcam ref={webcamRef} className="webcam-feed" />
      
      <div className="emotion-response">
        <p>Detected Emotion: <strong>{emotion}</strong></p>
        {emotion === "Stressed 😟" && <p className="warning">Take a deep breath! You got this. 💪</p>}
        {emotion === "Sad 😢" && <p className="warning">You're not alone. Stay strong! ❤️</p>}
      </div>
    </div>
  );
};

export default WebcamEmotion;
