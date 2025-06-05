import os
import cv2
import numpy as np
from skimage.feature import hog
from sklearn.ensemble import RandomForestClassifier
import pickle

# Paths
real_path = 'dataset/real_frames'
fake_path = 'dataset/fake_frames'

# Feature extraction function
def extract_features(image_path):
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if image is None:
        return None
    image = cv2.resize(image, (64, 64))
    features = hog(image, pixels_per_cell=(8, 8), cells_per_block=(2, 2))
    return features

X, y = [], []

# Load real images
for filename in os.listdir(real_path):
    path = os.path.join(real_path, filename)
    features = extract_features(path)
    if features is not None:
        X.append(features)
        y.append(0)  # 0 for real

# Load fake images
for filename in os.listdir(fake_path):
    path = os.path.join(fake_path, filename)
    features = extract_features(path)
    if features is not None:
        X.append(features)
        y.append(1)  # 1 for fake

# Train Random Forest
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# Save the model
with open("rf_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Model trained and saved as rf_model.pkl")
