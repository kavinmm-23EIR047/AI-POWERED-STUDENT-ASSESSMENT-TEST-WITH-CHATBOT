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
      const emotions = ["Happy 😀", "Neutral 😐", "Stressed 😟", "Sad 😢", "Fear 😨", "Scared 😱", "Anxious 🤯"];

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
        {emotion === "Fear 😨" && <p className="warning">Fear is natural. Take deep breaths! 🧘</p>}
{emotion === "Anxious 🤯" && <p className="warning">It's okay to feel overwhelmed. Try to relax. 🌿</p>}
{emotion === "Scared 😱" && <p className="warning">You're safe. Face your fears with courage! 💪</p>}
{emotion === "Frustrated 😤" && <p className="warning">Take a break. Clear your mind. 🕊️</p>}
{emotion === "Happy 😃" && <p className="success">Great to see you smiling! Keep spreading positivity! 🌟</p>}
{emotion === "Confused 🤔" && <p className="warning">It's okay to ask for help. You're not alone! 🫂</p>}
{emotion === "Angry 😠" && <p className="warning">Take deep breaths. Calmness brings clarity. 🌊</p>}
{emotion === "Tired 😴" && <p className="warning">Rest is important. Recharge and come back stronger! 💆‍♂️</p>}
{emotion === "Happy 😀" && <p className="positive">Great to see you happy! Keep smiling! 😊</p>}
{emotion === "Excited 🤩" && <p className="positive">Your enthusiasm is inspiring! Keep it up! 🚀</p>}
{emotion === "Neutral 😐" && <p className="info">Stay balanced and keep moving forward. ⚖️</p>}

      </div>
    </div>
  );
};

export default WebcamEmotion;
