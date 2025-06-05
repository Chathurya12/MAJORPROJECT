import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function UploadForm() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult('');
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setResult('');

    try {
      const res = await axios.post('http://localhost:5000/detect', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setResult(res.data.result);
    } catch (err) {
      console.error('Error uploading:', err);
      setResult('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ background: '#222', padding: '1rem', color: 'white', minHeight: '100vh', textAlign: 'center' }}>
      <h1>Deepfake Detection</h1>
      <input type="file" onChange={handleFileChange} />
      <br />
      <button onClick={handleUpload}>Upload</button>

      {loading ? (
        <p className="loading-dots" aria-label="loading">
          Detecting
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </p>
      ) : (
        result && <h3>{`Result: ${result}`}</h3>
      )}
    </div>
  );
}

export default UploadForm;
