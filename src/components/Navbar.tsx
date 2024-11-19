import React, { useContext, useState } from 'react';
import "./Navbar.css";
import { Link } from "react-scroll";
import ThemeToggleButton from "./ThemeToggleButton";
import ThemeContext from '../context/ThemeContext';
import Logo from "./Logo"
import { RiHome2Line, RiUser3Line, RiBriefcase2Line, RiDraftLine, RiChat3Line, RiMenu2Line, RiProjectorFill} from "react-icons/ri";


const Navbar = () => {
    const {toggleTheme } = useContext(ThemeContext);
    const [toggle, showMenu] = useState(false);

    return (
        <>
            <aside className={toggle ? 'aside show-menu' : 'aside'}>
                <a href="#intro" className="nav__item">
                    <Logo />
                </a>

                <nav className="nav">
                    <div className="nav__menu">
                        <ul className="nav__list">
                            <li className="nav__item">
                                <Link to="intro" smooth={true} duration={500} className="nav__link cursor-pointer">
                                    <RiHome2Line />
                                </Link>
                            </li>

                            <li className="nav__item">
                                <Link to="about" smooth={true} duration={500} className="nav__link cursor-pointer">
                                    <RiUser3Line />
                                </Link>
                            </li>

                            <li className="nav__item">
                                <Link to="work-experience" smooth={true} duration={500} className="nav__link cursor-pointer">
                                    <RiBriefcase2Line />
                                </Link>
                            </li>

                            <li className="nav__item">
                                <Link to="projects" smooth={true} duration={500} className="nav__link cursor-pointer">
                                    <RiProjectorFill />
                                </Link>
                            </li>

                            <li className="nav__item">
                                <Link to="contact" smooth={true} duration={500} className="nav__link cursor-pointer">
                                    <RiChat3Line />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="nav__footer">
                    <ThemeToggleButton toggleTheme={toggleTheme} />
                    <a href="/Harsh_Pal_CV.pdf" className="nav__link cursor-pointer" download>
                         <RiDraftLine />
                    </a>
                </div>
            </aside>

            <div className={toggle ? 'nav__toggle nav__toggle-open' : 'nav__toggle'} onClick={() => showMenu(!toggle)}>
                <RiMenu2Line />
            </div>
        </>
    );
};

export default Navbar;