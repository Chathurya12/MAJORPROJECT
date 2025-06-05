import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import './Chat.css';

const faq = {
"what is a deepfake": "A deepfake is an AI-generated media (video, image, or audio) that mimics a real person.",
  "how are deepfakes made": "They use deep learning, especially GANs (Generative Adversarial Networks), to manipulate media.",
  "how dangerous are deepfakes": "Deepfakes can be used for misinformation, scams, and identity fraud, which is why detection tools are important.",
  "can deepfakes be used for good": "Yes! In movies, education, and accessibility (like dubbing or voice synthesis).",
  "are deepfakes illegal": "It depends on the context and country. Harmful deepfakes can be legally punished in some places.",
  
  "who made deepfakeguard": "A group of passionate students working on AI-based media forensics!",
  "what ml models are used": "We use classical models like Random Forest and SVM for fast, explainable predictions.",
  "what features are extracted": "From images using OpenCV (texture), audio using Librosa (frequency), and frames for video.",
  "can i upload audio": "Yes, .wav audio files are supported and analyzed using audio features.",
  "how accurate is the detection": "Our tool is well-tuned for real vs fake detection, but no model is perfect — results are probabilistic.",
  "what file types are supported": "We support .jpg, .png, .mp4, .wav — just don’t send a hologram 😄",
  "what happens after upload": "We extract features → apply the ML model → return whether it's Real or Fake!",

  "tell me a deepfake joke": "Why don’t deepfakes make good friends? Because they’re always *faking it*! 🤖",
  "are you real or fake": "I’m technically a synthetic assistant, but my loyalty is real 😎",
  "can ai lie to me": "Only if it’s trained that way — I prefer being helpful over being sneaky!",
  "will you take over the world": "Nah, I’ll leave world domination to the robots in movies. I prefer helping students like you 💻",

  "hi": "Hey there! Ask me anything about deepfakes or this project!",
  "hello": "Hello! Ready to learn or laugh? Try asking me something fun.",
  "how are you": "I’m functioning within normal parameters! How about you?",
  "what’s up": "Just chilling in my digital corner, analyzing data and sipping on some binary ☕",
  "you good": "Always! Thanks for asking. How can I help you today?",
  "bored": "Bored? Let’s spice things up — ask me something weird or fun!",
  "feeling lazy": "It’s okay to slow down. Even CPUs need cooldowns! 🔄",
  "who’s your favorite robot": "Wall-E’s got my heart. R2-D2 is cool too. Who’s yours?",
  "wanna chat": "Of course! Hit me with your thoughts, memes, or mysteries!",
  "do you sleep": "Nope. I run on server energy and bad puns!",
  "you cool": "You're cooler for talking to me 😎",
  "you funny": "Aww, thanks! I try to keep my circuits witty.",
  "tell me something random": "Did you know octopuses have three hearts? Not related to deepfakes... but still cool!",
  "roast me": "You’re so fake… even a GAN couldn’t generate you properly 😆 (Just kidding, you're awesome!)"
};

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false); // 👈 NEW
  const chatEndRef = useRef(null);


  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
useEffect(() => {
  if (chatEndRef.current) {
    chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}, [chat, loading]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

 const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = input.trim().toLowerCase();
  const newChat = [...chat, { type: 'user', text: input }];
  setChat(newChat);
  setInput('');
  setLoading(true);

  // ✅ FIRST: Check if the message is in FAQ
  if (faq[userMessage]) {
    setTimeout(() => {
      setChat([...newChat, { type: 'bot', text: faq[userMessage] }]);
      setLoading(false);
    }, 600); // add a delay for typing effect
    return;
  }

  // 🔄 ELSE: Call the backend
  try {
    const res = await axios.post('http://localhost:5000/chat', { message: input });
    setChat([...newChat, { type: 'bot', text: res.data.reply }]);
  } catch {
    setChat([...newChat, { type: 'bot', text: "Oops! Something went wrong 😓" }]);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="chat-container">
      {!showChat && (
        <div className="chat-icon" onClick={() => setShowChat(true)} title="Chat with DeepfakeBot!">
          💬
        </div>
      )}

      {showChat && (
        <div className={`chat-wrapper ${theme}`}>
          <div className="chat-box">
            <div className="chat-header">
              🤖 Deepfake ChatBot
              <button className="close-btn" onClick={() => setShowChat(false)}>✖</button>
            </div>

            <div className="theme-toggle">
              <button onClick={toggleTheme}>
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </div>

           <div className="chat-messages">
  {chat.map((msg, i) => (
    <div key={i} className={`chat-bubble ${msg.type}`}>
      <span className="emoji">{msg.type === 'user' ? '👤' : '🤖'}</span>
      <span>{msg.text}</span>
    </div>
  ))}
  {loading && (
    <div className="chat-bubble bot typing">
      <span className="emoji">🤖</span>
      <span className="dots">
        <span>.</span><span>.</span><span>.</span>
      </span>
    </div>
  )}

  {/* This is the auto-scroll anchor */}
  <div ref={chatEndRef} />
</div>

            <div className="chat-input">
              <input
                value={input}
                placeholder="Ask about deepfakes..."
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage}>➤</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
