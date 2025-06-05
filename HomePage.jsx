import { useRef, useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  FaCamera,
  FaVideo,
  FaNewspaper,
  FaHistory,
  FaLightbulb,
} from 'react-icons/fa';
import ChatBot from './ChatBot';

import { FaGlobe } from 'react-icons/fa';

const hotNewsData = [
  {
    id: 1,
    title: '🚨 Celebrity Deepfake Alert: Viral Clip Sparks Outrage',
    description:
      'A fabricated video featuring a famous pop singer has taken social media by storm, raising concerns about digital impersonation and its influence on fans. Experts urge the public to verify content before sharing.',
    image: '/images/download.jpg',
  },
  {
    id: 2,
    title: '🗳️ Political Deepfake Scandal Shakes Election Campaign',
    description:
      'A deepfake video showing a prominent politician making controversial remarks has caused public confusion. Authorities are investigating its origin and potential impact on voter perception.',
    image: '/images/news_2020_036_stoa_deepfakes_rdax_1200x900p.jpg',
  },
  {
    id: 3,
    title: '🤖 AI Breakthrough in Deepfake Detection Announced',
    description:
      'Researchers unveil advanced AI tools capable of spotting facial anomalies in deepfakes with higher precision. This marks a crucial step in the fight against synthetic misinformation.',
    image: '/images/Pastry-Baking-YouTube-Thumbnail--7-.png',
  },
  {
    id: 4,
    title: '🏅 Deepfake Disrupts Sports Integrity',
    description:
      'A manipulated video of a renowned athlete allegedly accepting bribes has sparked controversy. Investigations reveal it’s a deepfake, intensifying debates about fairness in sports.',
    image: '/images/Viral-Deepfake-Ad.webp',
  },
  {
    id: 5,
    title: '🎬 Movie Trailer Deepfake Hoax Goes Viral',
    description:
      'An AI-generated trailer featuring classic actors in a modern film has fooled millions online. While fans are impressed, industry insiders warn of the dangers of unauthorized likeness use.',
    image: '/images/hero-image.webp',
  },
  {
    id: 6,
    title: '🔍 Tech Giants Unite to Tackle Deepfake Threats',
    description:
      'Major platforms like Google and Meta announce joint efforts to deploy deepfake detection algorithms and enforce stricter policies on AI-generated content.',
    image: '/images/deepfake.jpg',
  },
  {
    id: 7,
    title: '📚 Educators Launch Campaign on Deepfake Awareness',
    description:
      'A national initiative introduces media literacy programs in schools and colleges to help students identify and respond to manipulated digital content responsibly.',
    image: '/images/deep-20191024092542711.jpg',
  },
];


const quizData = [
 
  {
    id: 1,
    left: '/videos/quiz-01-fake.mp4',
    right: '/videos/quiz-01-real.mp4',
    correct: 'left',
    explanation:
      'Researchers at Stanford University reconstructed and tracked, then transferred, facial expressions from a source video onto a target video.',
  },
  {
    id: 2,
    left: '/videos/quiz-02-real.mp4',
    right: '/videos/quiz-02-fake.mp4',
    correct: 'right',
    explanation:
      'For this video, a type of deepfake known as a “deep video portrait,” researchers at Stanford University transferred not only the facial expression, but also the head rotation, 3D head position, and eye gaze from a source actor to a target video.',
  },
  {
    id: 3,
    left: '/videos/quiz-03-fake.mp4',
    right: '/videos/quiz-03-real.mp4',
    correct: 'left',
    explanation:
      'Using deep learning, researchers at the University of Colorado Denver transferred the face of a source video - the area from the eyebrows to below the mouth - onto a target video.',
  },
  {
    id: 4,
    left: '/videos/quiz-04-real.mp4',
    right: '/videos/quiz-04-fake.mp4',
    correct: 'right',
    explanation:
      'Researchers at the University of Washington took the audio from a speech by former President Barack Obama and then used video from a separate speech Obama gave to generate a realistic, lip-synced, video of Obama giving the first speech.',
  },
];

const slides = [
  {
    videoSrc: '/videos/4a.mp4',
    caption: `For 1994 "Forrest Gump", filmmakers digitally inserted Tom Hanks into archival footage—like a scene with JFK—and used VFX to manipulate mouth movements, making it appear the president was speaking to him.`,
  },
  {
    videoSrc: '/videos/4b.mp4',
    caption: ' After Paul Walker died during Furious 7, his brothers were used as body doubles, and CGI was used to recreate his face—especially in the final scene where Brian drives away from Dom as a farewell.',
  },
  {
    videoSrc: '/videos/4c.mp4',
    caption: 'After Oliver Reed died during the filming of Gladiator (2000), filmmakers used CGI and a body double to complete his remaining scenes and respectfully finish his role as Proximo.',
  },
  {
    videoSrc: '/videos/4d.mp4',
    caption: ' In Rogue One (2016), to digitally recreate Peter Cushing as Grand Moff Tarkin, a body double wore motion capture markers on his head, which were then used with CGI to bring the character to life.',
  },
];
  const videos = [
    { src:'/videos/13a.mp4', label: "National Archives" },
    { src: '/videos/13b.mp4', label: "NASA" },
    { src:'/videos/13c.mp4', label: "Getty Images" },
    { src: '/videos/13d.mp4', label: "AP News" },
  ];

export default function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0); // ✅ This line declares `current`
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const currentQuiz = quizData[currentIndex];
  const isCorrect = selected === currentQuiz?.correct;

  const handleStartAnalyzing = () => {
    setLoading(true);
    setTimeout(() => navigate('/upload'), 1500);
  };

  const handleGuess = (side) => {
    if (!showResult) {
      setSelected(side);
      setShowResult(true);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    setSelected(null);
    setShowResult(false);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((current + 1) % slides.length);
  };
 const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, current]);

  // ✅ NOW WE RETURN JSX INSIDE THE FUNCTION SCOPE
 

  return (
    <div className="homepage-container">
      <div className="fade-in">
        <h1 className="homepage-title">
          Welcome to <span className="highlight">DeepfakeGuard</span>
        </h1>
        <p className="homepage-description">
          <FaCamera /> <FaVideo /> Upload images or videos to detect deepfakes.
        </p>
      </div>

      <div className="homepage-cards">
        <div className="homepage-card slide-in-left">
          <FaCamera size={40} className="icon" />
          <h3>Image Detection</h3>
          <p>Detect manipulated images using advanced ML models.</p>
        </div>
        <div className="homepage-card slide-in-right">
          <FaVideo size={40} className="icon" />
          <h3>Video Detection</h3>
          <p>Analyze video frames to reveal deepfake content.</p>
        </div>
      </div>

      {/* News Section */}
      <div className="news-info-section">
        <div className="news-left">
          <h2 className="animated-news-heading">
            <FaNewspaper className="icon-pulse" />
            Trending News
          </h2>
          <div className="news-scroll-vertical">
            {hotNewsData.map((news) => (
              <div key={news.id} className="news-card-vertical-rect">
                <img src={news.image} alt={news.title} />
                <div className="news-text">
                  <h4>{news.title}</h4>
                  <p>{news.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column Thought */}
        <div className="deepfake-info-box">
          <div className="history-comment-box">
            <h3>
              <FaHistory style={{ color: '#5a5a5a', marginRight: '8px' }} />
              A Thought to Reflect On
            </h3>
            <p>
              For centuries, humans have crafted illusions—whether through painted portraits,
              whispered rumors, or early photography—to shape perception and influence truth.
              Deepfake technology is the latest chapter in this long history. Understanding their
              origins helps us better protect reality and preserve trust in what we see.
            </p>
          </div>
        </div>
      </div>

      {/* Deepfake Explanation */}
      <div className="deepfake-explanation-section">
    <h2 className="section-title">
  <FaLightbulb style={{ marginRight: '10px', color: '#039a77' }} />
  <span style={{ fontSize: '2.6rem' }}>What is </span>
  <span className="deepfake-text">Deepfake</span>
  <span style={{ fontSize: '2.6rem' }}>, Explained</span>
</h2>

        <p className="section-text">
          Deepfakes use artificial intelligence to create hyper-realistic fake videos or images by
          replacing a person's likeness. Understanding how deepfakes work helps us stay vigilant.
        </p>
        <div className="video-wrapper">
          <video controls width="100%" preload="metadata">
            <source src="/videos/what-is-deepfake.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* 🧠 Spot the Deepfake Quiz */}
<div className="quiz-container" style={{ fontSize: '1.9rem', fontWeight: 'bold', textAlign: 'center', margin: '1.5rem 0' }}>
  <h2>
    🧠 Take the quiz: Can you spot the <span className="highlight">deepfake</span>?
  </h2>
  <p style={{ fontSize: '1.2rem' }}>
    Click on the video you believe has been manipulated.
  </p>

<div className="video-row">
  {['left', 'right'].map((side) => (
    <div
      key={side + currentIndex}
      className={`video-box ${
        showResult && selected === side
          ? isCorrect
            ? 'correct'
            : 'wrong'
          : ''
      } ${showResult && currentQuiz.correct === side ? 'highlight-correct' : ''}`}
      onClick={() => handleGuess(side)}
    >
      <video
        key={side + currentIndex}
        src={currentQuiz[side]}
        autoPlay
        muted
        loop
        playsInline
        className="quiz-video"
      />
      
    </div>
  ))}
</div>


  {showResult && (
    <div className="result-box">
      <h3>{isCorrect ? 'Correct!' : 'Incorrect! That video is real'}</h3>
     <p style={{ fontSize: '1.1rem'  }}>{currentQuiz.explanation}</p>

      {currentIndex < quizData.length - 1 ? (
        <button onClick={handleNext}>Try Another One</button>
      ) : (
        <p>🎉 Quiz Complete!</p>
      )}
    </div>
  )}
</div>

   
    
<div className="carousel-section">
  <div className="carousel-content">
    {/* Left Side: Video/Image and Arrows */}
    <div className="media-wrapper">
      {/* Arrows outside */}
      <button className="nav left" onClick={prevSlide}>←</button>

     <div className="video-frame" style={{ position: 'relative', display: 'inline-block' }}>
  <video
    ref={videoRef}
    key={slides[current].videoSrc}
    src={slides[current].videoSrc}
    autoPlay
    loop
    muted={isMuted}
    playsInline
    className="quiz-video"
    style={{ width: '100%', borderRadius: '12px' }}
  />
  
  {/* Sound button */}
  <button
    onClick={toggleMute}
    className="sound-toggle"
    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
    title={isMuted ? 'Unmute video' : 'Mute video'}
    style={{
      position: 'absolute',
      top: '10px',
     
      background: 'rgba(0,0,0,0.6)',
      color: '#fff',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      cursor: 'pointer',
      zIndex: 2,
    }}
  >
    {isMuted ? '🔇' : '🔊'}
  </button>
</div>

      <button className="nav right" onClick={nextSlide}>→</button>

      {/* Caption & Dots */}
      <p className="caption">{slides[current].caption}</p>
      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>

    {/* Right Side: Text */}
    <div className="text-content">
      <h2>
        <span className="manipulated-text">Manipulating video</span>  is <br />
        nothing new — just look at <br />
        <span className="bold">Hollywood</span>
      </h2>
      <p>
        It’s been possible to alter video footage for decades, but doing it
        took time, highly skilled artists, and a lot of money. Deepfake
        technology could change the game. As it develops and proliferates,
        anyone could have the ability to make a convincing fake video,
        including some people who might seek to “weaponize” it for political
        or other malicious purposes.
      </p>
    </div>
  </div>
</div>
 <div className="global-deepfake-warning">
  <div className="overlay">
    <h2>
      <FaGlobe
        style={{
          marginRight: '8px',
          verticalAlign: 'middle',
          background: 'linear-gradient(to right, #00c3ff, #00ff7f)',
        }}
      />
      Now <span className="highlight">global governments</span> are cracking down on deepfakes
    </h2>
    <div className="text-block">
      <p>
        In response to rising <span className="highlight">AI-generated misinformation</span>,
        governments are deploying <span className="highlight">advanced detection</span> tools and partnering
        with <span className="highlight">cybersecurity agencies</span> to flag deepfakes early.
      </p>

      <p>
        New <span className="highlight">laws</span> are requiring platforms to <span className="highlight">label AI content</span>
        and enforce <span className="highlight">transparency</span>. These steps are crucial to protect
        <span className="highlight">democracy</span> and <span className="highlight">truth</span>.
      </p>
      <p>
  This <span className="highlight">proactive stance</span> reflects a <span className="highlight">global shift</span> toward <span className="highlight">digital responsibility</span>.  
  By uniting <span className="highlight">technology and policy</span>, nations are working to <span className="highlight">restore public trust</span>  
  in the age of <span className="highlight">synthetic media</span>.
</p>

    </div>
  </div>
</div>

<section class="how-made-section">
  <h2>
    <span class="part-one">How are they</span> <span class="part-two">made?</span>
  </h2>
  <div class="content-wrapper">
    <div class="video-block">
      <video controls width="460">
        <source src="videos/08-making-a-deepfake.mp4" type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
      </video>
    </div>
  </div>
</section>

   <section className="historical-section">
      <div className="container">
        <h2 className="title">
          What happens if we can <span className="highlight">no longer trust</span> our eyes
          <br className="break" /> or our ears?
        </h2>
        <p className="subtitle">
          For more than a century, audio and video have functioned as a bedrock of truth.
          Not only have sound and images recorded our history, they have also informed
          and shaped our perception of reality.
        </p>
        <div className="video-grid-two-cols">
          {videos.map((video, index) => (
            <div key={index} className="video-item">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="video-element"
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="video-label">{video.label}</p>
            </div>
          ))}
        </div>
        <p className="subtitle mt-12">
          Some people already question the facts around events that unquestionably happened, like the Holocaust, the moon landing and 9/11, despite video proof. If deepfakes make people believe they can’t trust video, the problems of misinformation and conspiracy theories could get worse. While experts told CNN that deepfake technology is not yet sophisticated enough to fake large-scale historical events or conflicts, they worry that the doubt sown by a single convincing deepfake could alter our trust in audio and video for good.
        </p>
      </div>
    </section>
<section>
  {/* Separate Detection Section */}
  <div className="container" style={{  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
    <h2 className="title" style={{ fontSize: '3.3rem',fontFamily: "''Segoe UI', Tahoma, Geneva, Verdana, sans-serif"  }}>
      <span style={{ color: 'black' }}>How are they </span>
      <span style={{ color: 'teal' }}>detected?</span>
    </h2>

    <p className="subtitle" style={{ color: '#e7baba',fontFamily: "''Segoe UI', Tahoma, Geneva, Verdana, sans-serif",fontSize: '1.3rem'  }}>
      By feeding computers examples of real videos as well as deepfake videos, these researchers are training computers to detect deepfake videos.
    </p>

    <div className="single-video">
      <video autoPlay loop muted playsInline className="video-element">
        <source src='/videos/10-detecting.mp4' type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="video-label">Detection Lab Footage</p>
    </div>
  </div>
</section>


<div className="deepfake-container">
<p className="deepfake-tagline">
  🛡️ <strong style={{ color: '#04192f', fontSize: '2.4rem' }}>DeepfakeGuard</strong> — Illuminates hidden fabrications in videos, unveiling truth with AI-powered clarity before falsehood spreads.
</p>



  <p className="deepfake-steps">
    🎥 Upload your clip → 🤖 Our smart AI deciphers every pixel → ✔️ Real or fake? You know in seconds.
  </p>

<p className="deepfake-invite">
  When pixels deceive and truth warps, our AI guardian cuts through the noise — revealing hidden signs with precise clarity, so you can trust every frame.
</p>


  {!loading ? (
  <button className="deepfake-cta-button" onClick={handleStartAnalyzing}>
  Analyze Your Video
</button>

  ) : (
    <div className="dots-loader"></div>
  )}










</div>
<div className="separator-line"></div>

  <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          Protecting truth with <strong className="footer-logo">DeepfakeGuard</strong> — Your guardian in the digital age.
        </p>
        <div className="social-icons">
          <a href="https://www.facebook.com" aria-label="Facebook" className="social-icon" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
<a href="https://twitter.com" aria-label="Twitter" className="social-icon" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
<a href="https://www.linkedin.com" aria-label="LinkedIn" className="social-icon" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
<a href="https://github.com" aria-label="GitHub" className="social-icon" target="_blank" rel="noopener noreferrer"><FaGithub /></a>

        </div>
      </div>
      <small className="footer-copy">&copy; 2025 DeepfakeGuard. All rights reserved.</small>
    </footer>
  


        <ChatBot />
      </div>
   
  );
}
