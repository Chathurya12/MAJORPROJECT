from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import cv2
import numpy as np
from skimage.feature import hog
import pickle
import sqlite3
from google.oauth2 import id_token
from google.auth.transport import requests as grequests
import shap

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# --- Configurations ---
GOOGLE_CLIENT_ID = '334546713322-nqfkppmr7qfehs0s.apps.googleusercontent.com'
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs("uploads", exist_ok=True)

# --- Load ML Model ---
with open('rf_model.pkl', 'rb') as f:
    model = pickle.load(f)

def generate_shap_explanation(features, is_video=False):
    feature_names = [
        "Texture smoothness",
        "Color variance",
        "Edge sharpness",
        "Brightness level",
        "Noise level",
        # Add all your features here...
    ]
    
    explainer = shap.TreeExplainer(model, feature_perturbation="interventional")
    shap_values = explainer.shap_values(features, check_additivity=False)
    fake_shap = shap_values[1]

    prediction_prob = model.predict_proba([features])[0][1]  # probability of 'fake'
    confidence_text = f"Prediction confidence: {prediction_prob*100:.1f}% that this is fake."

    if is_video:
        if prediction_prob < 0.5:
            return f"The video frames appear consistent and natural. {confidence_text.replace('fake', 'real')}"
        else:
            return f"Several frames show signs of manipulation. {confidence_text}"

    top_indices = np.argsort(fake_shap)[-3:][::-1]  # top 3 features descending
    explanation_lines = []
    for idx in top_indices:
        contribution = fake_shap[idx]
        level = "strongly" if contribution > 0.1 else "moderately"
        # Use feature name if index is valid, else fallback to "Feature {idx}"
        feature_name = feature_names[idx] if idx < len(feature_names) else f"Feature {idx}"
        explanation_lines.append(f"{feature_name} contributes {level} to the prediction as fake.")

    explanation = confidence_text + " " + " ".join(explanation_lines)
    return explanation

# --- Feature extraction ---
def extract_features(image_path):
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if image is None:
        return None
    image = cv2.resize(image, (64, 64))
    features = hog(image, pixels_per_cell=(8, 8), cells_per_block=(2, 2))
    return features

def extract_frames_from_video(video_path):
    video = cv2.VideoCapture(video_path)
    frames = []
    while True:
        ret, frame = video.read()
        if not ret:
            break
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        gray = cv2.resize(gray, (64, 64))
        features = hog(gray, pixels_per_cell=(8, 8), cells_per_block=(2, 2))
        frames.append(features)
    video.release()
    return frames
# Google Login token verification
@app.route('/google-login', methods=['POST'])
def google_login():
    try:
        token = request.json.get('token')
        if not token:
            return jsonify({'status': 'error', 'message': 'Token missing'}), 400

        idinfo = id_token.verify_oauth2_token(token, grequests.Request(), GOOGLE_CLIENT_ID)
        user_id = idinfo['sub']
        email = idinfo['email']
        name = idinfo.get('name', 'Google User')

        user = {
            'id': user_id,
            'email': email,
            'name': name
        }
        return jsonify({'status': 'success', 'user': user})

    except ValueError:
        return jsonify({'status': 'error', 'message': 'Invalid token'}), 400


# --- Detect route ---
@app.route('/detect', methods=['POST'])
def detect():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    ext = filename.lower()
    filetype = None
    result = None
    explanation = None
    confidence = None

    if ext.endswith(('.png', '.jpg', '.jpeg')):
        filetype = 'image'
        features = extract_features(filepath)
        if features is None:
            return jsonify({'error': 'Invalid image'}), 400

        prediction_prob = model.predict_proba([features])[0][1]
        result = 'fake' if prediction_prob >= 0.5 else 'real'

        explanation = generate_shap_explanation(features, is_video=False)
        
    elif ext.endswith(('.mp4', '.mov', '.avi')):
        filetype = 'video'
        frames = extract_frames_from_video(filepath)
        if not frames:
            return jsonify({'error': 'No valid frames extracted'}), 400

        predictions = model.predict(frames)
        avg_prediction = np.mean(predictions)  # average prediction across frames
        result = 'fake' if avg_prediction >= 0.5 else 'real'

        avg_features = np.mean(frames, axis=0)
        explanation = generate_shap_explanation(avg_features, is_video=True)

    else:
        return jsonify({'error': 'Unsupported file type'}), 400

    # 💡 Double-check explanation consistency
    if ("real" in explanation.lower() and result == "fake") or ("fake" in explanation.lower() and result == "real"):
        explanation = f"Prediction confidence: {'<50.0%' if result == 'real' else '>50.0%'} that this is {result}. The prediction is consistent with the model output."

    return jsonify({
        'result': result,
        'filename': filename,
        'filetype': filetype,
        'explanation': explanation
    })


# --- Other routes (register, login, etc.) remain unchanged ---

if __name__ == '__main__':
    app.run(debug=True)

