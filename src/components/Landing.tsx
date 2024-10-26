"use client";
import { useRef, useState, useEffect, useContext } from "react";
import ThemeContext from '../context/ThemeContext'; // Ensure this is the correct path
import { motion, AnimatePresence } from 'framer-motion';
import {Roboto} from "next/font/google";
import ThemeToggleButton from './ThemeToggleButton'; // Ensure this is the correct path

const languages = [
  'Hello! 👋🏻', // English
  'Hola!!', // Spanish
  'Bonjour!', // French
  'Hallo!', // German
  'नमस्ते |🙏🏻', // Hindi
  'こんにちは', // Japanese
  '안녕하세요', // Korean
  'Привет', // Russian
  'Ciao!', // Italian
  'Olá!', // Portuguese
];

const robot = Roboto({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Landing({ setIsLandingVisible }: { setIsLandingVisible: (a: boolean) => void }) {
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useContext(ThemeContext); // Access the theme and toggleTheme from the context

  useEffect(() => {
    if (index < languages.length - 1) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, 350); // Change language every 0.3 seconds

      return () => clearInterval(interval);
    } else {
      setIsFinished(true); // Set finished when last index is reached
    }
  }, [index]);

  useEffect(() => {
    if (isFinished) {
      const timeout = setTimeout(() => {
        setIsLandingVisible(false); // Hide the landing page after the curtain animation
      }, 1000); // Duration of the curtain animation

      return () => clearTimeout(timeout);
    }
  }, [isFinished, setIsLandingVisible]);

  return (
    <div
      ref={ref}
      className={`custom-landing-page landing-page ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}
    >
      <div className="custom-landing-page landing-container">
        <div className="custom-landing-page navbar-button-container">
          <ThemeToggleButton toggleTheme={toggleTheme} />
        </div>

        <div className={`${robot.className} landing-container`}>
          {!isFinished ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: -90, opacity: 0 }}
                transition={{ duration: 0.15, ease: 'easeInOut' }}
                className="hello-text"
              >
                {languages[index]}
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              className="curtain"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 0, ease: 'easeInOut' }}
              onAnimationComplete={() => setIsLandingVisible(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}