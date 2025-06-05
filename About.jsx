// src/pages/About.jsx
import React from 'react';
import "./App.css";

function About() {
  return (
    <div className="about-page">
      <h2>About DeepfakeGuard</h2>
      <p>
        DeepfakeGuard is a smart system that uses machine learning to detect manipulated media like fake videos or altered voices. It helps identify whether uploaded content is genuine or artificially created.
      </p>
      <p>
        Built using Random Forest and SVM models, it analyzes images, audio, and videos. Ideal for journalism, education, or digital verification.
      </p>
    </div>
  );
}

export default About;
