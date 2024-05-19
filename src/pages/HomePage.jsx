import React from 'react';
import { withAuthInfo } from '@propelauth/react';
import { motion } from "framer-motion";
import AnimatedText from "../Components/AnimatedText.jsx";
import { Link } from 'react-router-dom';
import './HomePage.css';

const floatVariants = {
  floatUp: {
    y: -5,
    opacity: 0.9
  },
  floatDown: {
    y: 5,
    opacity: 1
  }
};

const container = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1, scale: 1,
    transition: { type: "spring", damping: 10, stiffness: 120 },
  },
};

const HomePage = withAuthInfo(() => {
  return (
    <>
      {/* Primary Menu */}
      <div className="topnav">
        <ul>
          <li><a href="/" id='navLogo'><img className="logo" src="/logo_light.png" alt="Logo" /></a></li>
          <li><a href="/challenges" id='challengesNav'>Challenges</a></li>
          <li><a href="/results" id="resultsNav">Results</a></li>
          <li><a href="/leaderboard" id="leaderboardNav">Leaderboard</a></li>
          <li><a href="/login" id="loginNav">Log In</a></li>
        </ul>
      </div>

      <div
        style={{
          backgroundImage: `url('/bg.png')`,
          backgroundSize: 'cover', // Ensures the image covers the entire area
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat', // Prevents the image from repeating
          backgroundAttachment: 'fixed', // Keeps the background fixed during scroll
          height: '100vh',
          width: '100vw',
          margin: '0',
          padding: '0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <motion.h1
          className="text-6xl font-bold text-white mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <AnimatedText
            sentence="Learn Through Losing"
            styling="bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent"
          />
        </motion.h1>

        <motion.div
          variants={floatVariants}
          initial="floatUp"
          animate="floatDown"
          exit="floatUp"
          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", repeatType: 'reverse' }}
          className="mt-4"
        >
          <Link to="/compete">
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
              GET STARTED
            </button>
          </Link>
        </motion.div>

        <motion.div
          className="flex button-container"
          variants={container}
          initial="hidden"
          animate="visible"
        >
        </motion.div>
      </div>
    </>
  );
});

export default HomePage;
