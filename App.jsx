import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import UploadPage from './UploadPage';
import ResultPage from './ResultPage';
import History from './History';
import RegisterPage from './RegisterPage';
import Navbar from './Navbar';
import ChatBot from './components/ChatBot'; // Adjust path if needed
import './App.css';
import React from 'react';
import HomePage from './HomePage';

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}



const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/results" element={<ResultPage />} />
      <Route path="/history" element={<History />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/chat" element={<ChatBot />} />
    </Routes>
  </Router>
);

export default App;
