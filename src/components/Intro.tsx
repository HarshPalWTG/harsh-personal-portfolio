import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { scroller } from "react-scroll";
import { Courgette, Josefin_Slab, Anonymous_Pro, Playpen_Sans } from "next/font/google";
import ThemeContext from '../context/ThemeContext'; // Import ThemeContext
import Image from "next/image";
import { renderCanvas } from "./renderCanvas";
import styles from "./Intro.module.css";

const courgette = Courgette({
  subsets: ["latin"],
  weight: ["400"],
});

const londrinaSketch = Josefin_Slab({
  subsets: ["latin"],
  weight: ["600"],
});

const anonymousPro = Anonymous_Pro({
  subsets: ["latin"],
  weight: ["400"],
});

const playwriteGBS = Playpen_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Intro() {
  const [fadeIn, setFadeIn] = useState(false);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const { theme } = useContext(ThemeContext); // Access the current theme

  const phrases = [
    { text: "Self taught Software Engineer 👨‍💻", font: `${anonymousPro.className}` },
    { text: "School taught Mechanical Engineer 🧑‍🔧", font: `${londrinaSketch.className}` },
  ];

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 250);
  }, []);

  useEffect(() => {
    renderCanvas();
  }, []);

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    const handleTyping = () => {
      const currentPhrase = phrases[loopNum % phrases.length].text;
      const updatedText = isDeleting
        ? currentPhrase.substring(0, text.length - 1)
        : currentPhrase.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }

      setTypingSpeed(isDeleting ? 50 : 150);
    };

    typingTimeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, loopNum, typingSpeed]);

  const handleScrollToContact = () => {
    router.push('/#contacts');
    scroller.scrollTo('contacts', {
      duration: 500,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -80, // Adjust the offset as needed
    });
  };

  const router = useRouter();
  
  return (
    <div id = "intro" className={`${styles.introContainer} ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <div className={styles.introContent}>
        {/* Image next to your name */}
        <div className={styles.imageContainer}>
          <Image
            src="/images/profile.png" // Adjust path according to your image file
            alt="Profile Image"
            width={160} // Adjust the size as needed
            height={160}
            className={styles.profileImage}
          />
          <div className={`${playwriteGBS.className} ${styles.tooltip}`}>Hello!!</div>
        </div>
        <div className={`${playwriteGBS.className} ${styles.greetingText}`}>Hey there I&apos;m,</div>
        <div className={`${courgette.className} ${styles.introText} ${fadeIn ? "w-full" : "w-0"}`}>
          <span className={styles.nameText}>Harsh Pal</span>
        </div>
        <div className={`${styles.jobTitle} ${phrases[loopNum % phrases.length].font}`}>
          {text}<span className={styles.cursor}>|</span>
        </div>
        <div className={`${playwriteGBS.className} ${styles.introButtonContainer}`}>
          <button
            onClick={handleScrollToContact}
            className={`${styles.introButton} hover-button`}
          >
            <span className="button-text">FIND ME ON SOCIAL MEDIA</span>
          </button>
        </div>
      </div>
      <canvas className="bg-skin-base pointer-events-none absolute inset-0" id="canvas" style={{ zIndex: 1 }}></canvas>
    </div>
  );
}
