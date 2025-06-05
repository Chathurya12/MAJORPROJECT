import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/detect', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Detection failed.');
      }

      const result = await response.json();

      const finalResult = {
        filename: result.filename,
        filetype: result.filetype,
        isFake: result.result === 'fake',
         explanation: result.explanation || '',  
          rawResult: result.result // keep original for debugging
      };

      // Save to sessionStorage
      sessionStorage.setItem('latestResult', JSON.stringify(finalResult));

      // Save to localStorage history
      const history = JSON.parse(localStorage.getItem('uploadHistory')) || [];
      history.push(finalResult);
      localStorage.setItem('uploadHistory', JSON.stringify(history));

      setSuccess(true);

      setTimeout(() => {
        navigate('/result');
      }, 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container" style={styles.container}>
      <h2 style={styles.title}>Upload Media</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="file-upload" style={styles.label}>
          <FaUpload size={40} style={{ marginRight: 10 }} />
          {file ? file.name : 'Choose an image or video'}
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          style={styles.input}
        />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? (
            <>
              <FaSpinner className="spin" style={{ marginRight: 8 }} />
              Analyzing...
            </>
          ) : success ? (
            <>
              <FaCheckCircle style={{ marginRight: 8, color: '#4BB543' }} />
              Success!
            </>
          ) : (
            'Analyze'
          )}
        </button>
      </form>

      {error && (
        <p style={{ ...styles.message, ...styles.error }}>
          <FaExclamationCircle style={{ marginRight: 6 }} />
          {error}
        </p>
      )}

      <style>
        {`
          .spin {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
          label:hover {
            color: #2196f3;
            cursor: pointer;
          }
          button:hover:enabled {
            background-color: #2196f3;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    maxheight:500,
    margin: '3rem auto',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: '#1e1e2f',
    color: 'white',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: 'center',
  },
  title: {
    marginBottom: 20,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  label: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '12px 18px',
    border: '2px dashed #555',
    borderRadius: 10,
    cursor: 'pointer',
    fontSize: 16,
    color: '#bbb',
    userSelect: 'none',
  },
  input: {
    display: 'none',
  },
  button: {
    padding: '12px 20px',
    borderRadius: 10,
    border: 'none',
    backgroundColor: '#4caf50',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  message: {
    marginTop: 15,
    fontWeight: 'bold',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: '#ff5252',
  },
};
