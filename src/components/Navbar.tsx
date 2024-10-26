import React, { useContext, useState } from 'react';
import {Link} from 'react-scroll';
import ThemeToggleButton from "./ThemeToggleButton";
import ResumeButton from "./ResumeButton";
import ThemeContext from '../context/ThemeContext'; // Ensure this is the correct path
import Logo from "./Logo"
import { FaBars } from 'react-icons/fa';
import {Playpen_Sans} from "next/font/google";

const playpenSans = Playpen_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export default function App() {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access the theme and toggleTheme from the context
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = () => {
    setIsOpen(true);
    document.getElementById("mySidebar").style.width = "50vw"; // Open the sidebar for smaller screens
    document.querySelector(".hamburger").style.display = "none"; // Display the close button
  };

  const closeSidebar = () => {
    setIsOpen(false);
    document.getElementById("mySidebar").style.width = "0"; // Close the sidebar
    document.querySelector(".hamburger").style.display = "flex";
  };

  return (
    <>
      <div className={`${playpenSans.className} navbar`}>
        <div className= "nav-containers hamburger" onClick={openSidebar}>
          <FaBars />
        </div>
        <div className="nav-containers brand-section">
          <Link to="intro" smooth={true} duration={500} offset={-80} className="nav-brand"><Logo /></Link>
        </div>
        <div className="nav-containers items-section">
          <Link to="about" smooth={true} duration={500} offset={-80} className="nav-items" activeClass="active">About</Link>
          <Link to="work-experience" smooth={true} duration={500} offset={-80} className="nav-items" activeClass="active">Work Experience</Link>
          <Link to="projects" smooth={true} duration={500} offset={-80}  className="nav-items" activeClass="active">Projects</Link>
        </div>
        <div className="nav-containers button-section">
          {/* <div className="nav-items rsm-btn"> */}
            <ResumeButton />
          {/* </div> */}
          <div className="nav-items">
            <ThemeToggleButton toggleTheme={toggleTheme} />
          </div>
        </div>
      </div>
      {/* Sidebar for smaller screens */}
        <div id="mySidebar" className={`${playpenSans.className} sidebar ${theme}`}>
          <a href="javascript:void(0)" className="closebtn" onClick={closeSidebar}>&times;</a>
          <a href="#about">About</a>
          <a href="#work-experience">Work Experience</a>
          <a href="#projects">Projects</a>
            <ResumeButton />
          <div className="nav-items">
            <ThemeToggleButton toggleTheme={toggleTheme} />
          </div>
        </div>
    </>
  );
}
