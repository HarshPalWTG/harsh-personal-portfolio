"use client";

import { useRef, useState, useEffect, useContext } from "react";
import ThemeContext from '../context/ThemeContext'; // Ensure this is the correct path
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggleButton from './ThemeToggleButton'; // Ensure this is the correct path

const languages = [
  'Hello', // English
  'Hola', // Spanish
  'Bonjour', // French
  'Hallo', // German
  'नमस्ते', // Hindi
  'こんにちは', // Japanese
  '안녕하세요', // Korean
  'Привет', // Russian
  'Ciao', // Italian
  'Olá', // Portuguese
];

export default function Landing({ setIsLandingVisible }: { setIsLandingVisible: (a: boolean) => void }) {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [isTyping1, setIsTyping1] = useState(false); // Initially false
  const [isTyping2, setIsTyping2] = useState(false);
  const [isDeleting2, setIsDeleting2] = useState(false); // Track deletion of fullText2
  const [showImage, setShowImage] = useState(false);
  const [imageKey, setImageKey] = useState(0); // Define the imageKey state
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useContext(ThemeContext); // Access the theme and toggleTheme from the context

  const fullText1 = "Hey there I'm Harsh,";
  const fullText2 = "A Software Developer.";

  useEffect(() => {
    setShowImage(true);

    const typingStartTimeout = setTimeout(() => {
      setIsTyping1(true);
    }, 1000);

    return () => clearTimeout(typingStartTimeout);
  }, []);

  useEffect(() => {
    if (index1 < fullText1.length && isTyping1) {
      const timeout = setTimeout(() => {
        setText1((prev) => prev + fullText1[index1]);
        setIndex1((prev) => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    } else if (index1 === fullText1.length && isTyping1) {
      setIsTyping1(false);
      setIsTyping2(true);
    }
  }, [index1, isTyping1, fullText1]);

  useEffect(() => {
    if (index2 < fullText2.length && isTyping2) {
      const timeout = setTimeout(() => {
        setText2((prev) => prev + fullText2[index2]);
        setIndex2((prev) => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    } else if (index2 === fullText2.length && isTyping2) {
      setIsTyping2(false);
      setIsDeleting2(true);
    }
  }, [index2, isTyping2, fullText2]);

  useEffect(() => {
    if (isDeleting2 && index2 > 0) {
      const timeout = setTimeout(() => {
        setText2((prev) => prev.slice(0, -1));
        setIndex2((prev) => prev - 1);
      }, 150);

      return () => clearTimeout(timeout);
    } else if (isDeleting2 && index2 === 0) {
      setIsDeleting2(false);
      setTimeout(() => {
        ref.current?.classList.add('fade-out');
        setTimeout(() => {
          setIsLandingVisible(false);
        }, 1000);
      }, 500);
    }
  }, [isDeleting2, index2, setIsLandingVisible]);

  useEffect(() => {
    setImageKey((prevKey) => prevKey + 1);
  }, [theme]);

//   useEffect(() => {
//     if (index < languages.length - 1) {
//       const interval = setInterval(() => {
//         setIndex((prevIndex) => prevIndex + 1);
//       }, 500); // Change language every 3 seconds

//       return () => clearInterval(interval);
//     } else {
//       setIsFinished(true); // Set finished when last index is reached
//     }
//   }, [index]);


  return (
    <div
      ref={ref}
      className={`custom-landing-page landing-page ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}
    >
      {/* // landing-content */}
      <div className="custom-landing-page landing-container"> 
        {showImage && (
          <div className="custom-landing-page memoji-container mt-6 lg:mt-12 pop-up">
            <img
              key={imageKey}
              src={theme === 'dark' ? "/images/Landing_Night.webp" : "/images/Landing_Day.webp"}
              alt="Hi From Harsh Pal"
              className="custom-landing-page memojiImage popUp" // Use global CSS class names
            />
          </div>
        )} 
        <div className="custom-landing-page navbar-button-container">
          <ThemeToggleButton toggleTheme={toggleTheme} />
        </div>
        <div className="custom-landing-page landing-text text-4xl md:text-6xl lg:text-8xl">
          <span>{text1}</span>
          {isTyping1 && <span className="custom-landing-page cursor">_</span>}
        </div>
        <div className="custom-landing-page landing-text text-4xl md:text-6xl lg:text-8xl mt-6 lg:mt-12 gap">
          <span>{text2}</span>
          {(isTyping2 || isDeleting2) && <span className="custom-landing-page cursor">_</span>}
        </div> 
      </div>
    </div>
  );
}