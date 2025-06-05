import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaFileCode, FaCheckCircle, FaTimesCircle, FaInfoCircle, FaImage } from 'react-icons/fa';
import './App.css';

export default function ResultPage() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedResult = sessionStorage.getItem('latestResult');
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    } else {
      navigate('/upload');
    }
  }, [navigate]);

  if (!result) return null;

  const fadeInStyle = {
    animation: 'fadeIn 1s ease-in',
    backgroundColor: '#1e1e2f',
    color: '#f4f4f4',
    padding: '4rem',
    borderRadius: '12px',
    boxShadow: '0 0 15px rgba(0, 255, 255, 0.2)',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    maxWidth: '700px',
    margin: '2rem auto',
    transition: 'all 0.3s ease-in-out',
  };

  const highlightStyle = {
  fontWeight: 'bold',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.3rem 0.8rem',
  borderRadius: '8px',
  backgroundColor: result.isFake ? '#330000' : '#003300',
  color: result.isFake ? '#ff4d4d' : '#66ff66',
  boxShadow: result.isFake
    ? '0 0 10px #ff1a1a, 0 0 20px #ff1a1a, 0 0 30px #ff1a1a'
    : '0 0 10px #33ff33, 0 0 20px #33ff33, 0 0 30px #33ff33',
  transition: 'all 0.5s ease-in-out',
};


  const iconStyle = { marginRight: '0.5rem', color: '#00e6e6' };

  return (
    <div style={fadeInStyle} className="slideFadeIn">
      <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '1rem' }}>
        <FaInfoCircle style={iconStyle} />
        Prediction Result
      </h2>

      <p>
        <FaFileAlt style={iconStyle} />
        <strong>Filename:</strong> {result.filename}
      </p>

      <p>
        <FaFileCode style={iconStyle} />
        <strong>File Type:</strong> {result.filetype}
      </p>

      <p>
        <strong>Prediction:</strong>{' '}
        <span style={highlightStyle}>
          {result.isFake ? (
            <>
              <FaTimesCircle /> Fake
            </>
          ) : (
            <>
              <FaCheckCircle /> Real
            </>
          )}
        </span>
      </p>

      {result.explanation ? (
        <div
          style={{
            marginTop: '1.5rem',
            padding: '4rem',
            backgroundColor: '#2a2a40',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(255,255,255,0.1)',
          }}
        >
          <strong>
            <FaInfoCircle style={iconStyle} />
            Explanation:
          </strong>
          <p style={{ marginTop: '0.5rem', lineHeight: '1.5' }}>{result.explanation}</p>
        </div>
      ) : (
        <p style={{ fontStyle: 'italic', marginTop: 20 }}>No explanation available.</p>
      )}

      {result.shap_image_url && (
        <div style={{ marginTop: '2rem' }}>
          <p>
            <FaImage style={iconStyle} />
            <strong>Raw backend result:</strong> {result.rawResult}
          </p>
          <img
            src={result.shap_image_url}
            alt="SHAP Explanation"
            style={{
              maxWidth: '100%',
              borderRadius: '12px',
              marginTop: '0.5rem',
              boxShadow: '0 0 12px rgba(0, 255, 255, 0.3)',
            }}
          />
        </div>
      )}
    </div>
  );
}
