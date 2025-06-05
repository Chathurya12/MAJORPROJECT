import React, { useEffect, useState } from 'react';
import { FaTimesCircle, FaCheckCircle, FaFileAlt, FaFilm } from 'react-icons/fa';

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('uploadHistory')) || [];
    setHistory(saved.reverse());
  }, []);

  if (history.length === 0) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Upload History</h2>
        <p style={styles.noHistory}>No uploads yet.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Upload History</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Filename</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Prediction</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, i) => (
            <tr key={i} style={i % 2 === 0 ? styles.rowEven : styles.rowOdd} className="fade-in">
              <td style={styles.td}>
                <FaFileAlt style={{ marginRight: 8, color: '#666' }} />
                {item.filename}
              </td>
              <td style={styles.td}>
                {item.filetype.startsWith('image') ? (
                  <FaFileAlt style={{ color: '#007bff', marginRight: 6 }} />
                ) : (
                  <FaFilm style={{ color: '#28a745', marginRight: 6 }} />
                )}
                {item.filetype}
              </td>
              <td
                style={{
                  ...styles.td,
                  color: item.isFake ? '#d9534f' : '#5cb85c',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {item.isFake ? <FaTimesCircle /> : <FaCheckCircle />}
                {item.isFake ? 'Fake' : 'Real'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .fade-in {
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
          transform: translateY(10px);
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        table {
          border-collapse: collapse;
        }

        th, td {
          transition: background-color 0.3s ease;
        }

        tr:hover {
          background-color: #f1f1f1;
          cursor: default;
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: '3rem auto',
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#2c3e50', // Dark blue-gray background
    borderRadius: 8,
    boxShadow: '0 3px 12px rgba(0,0,0,0.4)',
    color: '#ecf0f1', // Light text color for contrast
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '700',
    fontSize: '1.8rem',
    color: '#ecf0f1', // Light title color
  },
  noHistory: {
    textAlign: 'center',
    color: '#bdc3c7', // lighter gray text for no-history message
    fontSize: 16,
  },
  table: {
    width: '100%',
    border: '1px solid #34495e', // darker border to match bg
    borderRadius: 6,
    overflow: 'hidden',
    boxShadow: 'inset 0 0 8px rgba(255,255,255,0.05)',
  },
  th: {
    backgroundColor: '#34495e', // dark header background
    padding: '12px 15px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: 16,
    borderBottom: '2px solid #2c3e50',
    color: '#ecf0f1',
  },
  td: {
    padding: '12px 15px',
    fontSize: 15,
  },
  rowEven: {
    backgroundColor: '#3b4a5a', // slightly lighter row
  },
  rowOdd: {
    backgroundColor: '#2c3e50', // container bg for odd rows
  },
};

