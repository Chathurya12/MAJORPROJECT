# DeepfakeGuard: Classical ML Approach to Media Forgery Detection

## Project Description
This project uses machine learning to detect deepfakes in images and videos. It leverages Python libraries such as `scikit-learn`, `OpenCV`, and `librosa` to analyze media files and classify them as real or fake. The system works by extracting features from video frames and images to detect forgeries.

## Setup Instructions

### Step 1: Clone the Repository
Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/deepfakeguard.git
Step 2: Install Python and Virtual Environment
Make sure Python 3.7 or higher is installed. Download Python here.

Create a virtual environment in your project folder:

python -m venv venv
Step 3: Activate the Virtual Environment
On Windows (Command Prompt):

.\venv\Scripts\activate
Step 4: Install Required Dependencies
Install the necessary libraries:

pip install opencv-python librosa scikit-learn numpy
Step 5: Organize Dataset
Download the Celeb-DF dataset or any suitable dataset containing real and fake videos.

Organize the dataset inside the dataset/ folder as follows:

dataset/
├── real/         # Contains real video files
├── fake/         # Contains fake video files
├── real_frames/  # Frames extracted from real videos (images)
├── fake_frames/  # Frames extracted from fake videos (images)
Step 6: Extract Frames from Videos
To extract frames from your videos, run the following script:

python extract_frames.py
This will extract frames from the real and fake videos and save them inside the real_frames/ and fake_frames/ directories.

Step 7: Train the Model
After extracting frames, proceed to train your machine learning model using the extracted frames. Modify the training script accordingly.

Step 8: Test the Model
Once the model is trained, use it to classify new video frames as real or fake.

Make sure you have enough disk space for storing the dataset and extracted frames.

Always activate the virtual environment before running any Python script in this project.