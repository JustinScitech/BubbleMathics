import React from 'react';
import { withAuthInfo, useRedirectFunctions, useLogoutFunction } from '@propelauth/react';
import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedText from "../Components/AnimatedText.jsx";
import { Link } from 'react-router-dom';

const HomePage = withAuthInfo((props) => {
  const logoutFunction = useLogoutFunction();
  const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } = useRedirectFunctions();

  const container = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", damping: 10, stiffness: 120 },
    },
  };

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

  return (
    <>
      <main className="flex flex-col items-center gap-10 justify-center p-24">
        <div className="text-content">
          <div className="relative flex place-items-center flex-col z-[-1] before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
            <h1 className="mb-3 text-6xl font-bold">
              <AnimatedText
                sentence="Create  Your  Next  Game  With"
                styling="bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent"
              />
            </h1>
            <h1 className="mb-3 text-6xl font-bold">
              <AnimatedText
                sentence="GameSculptAI"
                styling="text-"
              />
            </h1>
          </div>
        </div>
        <div>
          <motion.div
            variants={floatVariants}
            initial="floatUp"
            animate="floatDown"
            exit="floatUp"
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", repeatType: 'reverse' }}
            className="mt-4">
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

        {props.isLoggedIn ? (
          <div>
            <p>You are logged in as {props.user.email}</p>
            <button onClick={() => redirectToAccountPage()}>Account</button>
            <button onClick={() => logoutFunction(true)}>Logout</button>
          </div>
        ) : (
          <div>
            <p>You are not logged in</p>
            <button onClick={() => redirectToLoginPage()}>Login</button>
            <button onClick={() => redirectToSignupPage()}>Signup</button>
          </div>
        )}

        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
          <motion.div
            className="flex z-10"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <a
              href="/galleries"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              target=""
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Galleries Page{" "}
                <span className="inline-block transition-transform group-hover:translate-x-2 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                See what game packages others have made using GameSculpt!
              </p>
            </a>
          </motion.div>
          <motion.div
            className="flex z-10"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <a
              href="/instructions"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              target=""
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Getting Started{" "}
                <span className="inline-block transition-transform group-hover:translate-x-2 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Instructions on everything related to GameSculptAI, including an
                FAQ and upcoming API documentation.
              </p>
            </a>
          </motion.div>
          <motion.div
            className="flex z-10"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <a
              href="/team"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              target=""
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Our Team{" "}
                <span className="inline-block transition-transform group-hover:translate-x-2 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Learn more about the team behind GameSculptAI and how you can contribute!
              </p>
            </a>
          </motion.div>
        </div>
      </main>
    </>
  );
});

export default HomePage;
