from flask import Flask, request, jsonify
from flask_socketio import SocketIO
import cv2
import base64
import numpy as np
from deepface import DeepFace
import eventlet

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Emotion detection function
def analyze_emotion(image):
    try:
        emotions = DeepFace.analyze(image, actions=['emotion'], enforce_detection=False)
        return emotions[0]['dominant_emotion']
    except Exception as e:
        print("Error:", e)
        return None

@app.route('/analyze_emotion', methods=['POST'])
def detect_emotion():
    data = request.json['image']
    image_data = base64.b64decode(data.split(",")[1])
    np_arr = np.frombuffer(image_data, np.uint8)
    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    
    emotion = analyze_emotion(frame)
    return jsonify({"emotion": emotion})

@socketio.on('frame')
def handle_frame(data):
    image_data = base64.b64decode(data.split(",")[1])
    np_arr = np.frombuffer(image_data, np.uint8)
    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    
    emotion = analyze_emotion(frame)
    if emotion:
        socketio.emit('emotion', {"emotion": emotion})
        
        # Trigger alert for distress emotions
        if emotion in ["sad", "fear", "angry"]:
            socketio.emit('alert', {"message": f"Alert! Detected distress emotion: {emotion}"})

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
