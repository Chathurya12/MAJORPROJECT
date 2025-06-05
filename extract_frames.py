import cv2
import os

# Set paths
video_dirs = {
    "real": "dataset/real",
    "fake": "dataset/fake"
}
frame_dirs = {
    "real": "dataset/real_frames",
    "fake": "dataset/fake_frames"
}

# Create frame directories if they don't exist
for key in frame_dirs:
    os.makedirs(frame_dirs[key], exist_ok=True)

# Number of frames to extract per video (set low for speed)
frames_per_video = 5

def extract_frames(video_path, output_dir, video_name):
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"⚠️ Couldn't open {video_path}")
        return

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    step = max(1, total_frames // frames_per_video)

    count = 0
    saved = 0

    while cap.isOpened() and saved < frames_per_video:
        ret, frame = cap.read()
        if not ret:
            break
        if count % step == 0:
            frame_name = f"{video_name}_frame{saved}.jpg"
            cv2.imwrite(os.path.join(output_dir, frame_name), frame)
            saved += 1
        count += 1

    cap.release()

# Process both real and fake videos
for label in ["real", "fake"]:
    video_folder = video_dirs[label]
    frame_folder = frame_dirs[label]
    for filename in os.listdir(video_folder):
        if filename.endswith(".mp4") or filename.endswith(".avi"):
            video_path = os.path.join(video_folder, filename)
            name = os.path.splitext(filename)[0]
            print(f"🔄 Extracting from {filename}...")
            extract_frames(video_path, frame_folder, name)

print("✅ Frame extraction complete.")
