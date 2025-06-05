import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import cv2
import librosa
import numpy as np
import joblib

# Initialize Flask app
app = Flask(__name__)

# Folder to temporarily save uploads
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Allowed file extensions
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'mp3', 'wav', 'mp4', 'avi', 'mov'}

# Load pre-trained model
model = joblib.load('rf_model.pkl')  # Make sure this file exists

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/detect', methods=['POST'])
def detect():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if not allowed_file(file.filename):
        return jsonify({'error': 'Unsupported file type'}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    file_ext = filename.rsplit('.', 1)[1].lower()
    filetype = None

    try:
        if file_ext in {'png', 'jpg', 'jpeg'}:
            filetype = 'image'
            image = cv2.imread(filepath)
            if image is None:
                return jsonify({'error': 'Invalid image file'}), 400
            features = extract_image_features(image)
            prediction = model.predict([features])
            result = 'real' if prediction[0] == 0 else 'fake'

        elif file_ext in {'mp3', 'wav'}:
            filetype = 'audio'
            audio, sr = librosa.load(filepath, sr=None)
            features = extract_audio_features(audio, sr)
            prediction = model.predict([features])
            result = 'real' if prediction[0] == 0 else 'fake'

        elif file_ext in {'mp4', 'avi', 'mov'}:
            filetype = 'video'
            frames_features = extract_frames_from_video(filepath)
            if not frames_features:
                return jsonify({'error': 'No valid frames extracted from video'}), 400
            predictions = model.predict(frames_features)
            avg_pred = np.mean(predictions)
            result = 'real' if avg_pred < 0.5 else 'fake'

        else:
            return jsonify({'error': 'Unsupported file type'}), 400

    finally:
        if os.path.exists(filepath):
            os.remove(filepath)

    return jsonify({'result': result, 'filename': filename, 'filetype': filetype})

def extract_image_features(image):
    # Convert to grayscale and compute mean pixel intensity as a simple feature
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    return [np.mean(gray)]

def extract_audio_features(audio, sr):
    # Simple feature: mean of audio amplitude
    return [np.mean(audio)]

def extract_frames_from_video(filepath):
    cap = cv2.VideoCapture(filepath)
    features = []
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        feat = np.mean(gray)
        features.append([feat])  # Model expects 2D array: list of feature lists
    cap.release()
    return features

if __name__ == '__main__':
    app.run(debug=True)
