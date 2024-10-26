import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Headers from './Headers';
import Card from './Card';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { Anonymous_Pro, Playpen_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import { codeforces, iitr, leetcode, uvic, instagram, linkedin, gmail } from '../../public/Links';

const anonymousPro = Anonymous_Pro({
  subsets: ["latin"],
  weight: ["400"],
});

const playpenSans = Playpen_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

const About = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const aboutRef = useRef(null);
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleIntersection = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setFadeIn(true);
      } else {
        setFadeIn(false);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 1.0,
    });

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, [aboutRef]);

  return (
    <section id="about" ref={aboutRef}>
      <Card>
        <section className={`about container section ${fadeIn ? "fadeIn" : ""}`} style={{ padding: "2rem" }}>
          <Headers text="About Me" />
          <div className="about__container grid">
            <div className="about__img-container">
              <Image
                src="/images/about.png"
                alt="About Image"
                width={150}
                height={150}
                className="about__img"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
              {isHovered && (
                <div className="tooltipt" onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
             <span className={`${playpenSans.className} tooltip-message`}>Hii!! Connect with me 👇🏻</span>
             
             <div className="tooltipt-icons">
               <a href={`mailto:${gmail}`} target="_blank" rel="noopener noreferrer">
                 <SiGmail size={20} />
               </a>
               <a href={instagram} target="_blank" rel="noopener noreferrer">
                 <FaInstagram size={20} />
               </a>
               <a href={linkedin} target="_blank" rel="noopener noreferrer">
                 <FaLinkedin size={20} />
               </a>
             </div>
           </div>
              )}
            </div>

            <div className="about__data grid">
              <div className="about__info">
                <p className={`${playpenSans.className} about__description`}>
                  I&apos;m a passionate software developer with a Bachelor of Technology in Mechanical Engineering from the <a
                    onClick={() => {
                      window.open(iitr, "_blank");
                      router.push("/");
                    }}
                    className="hover:underline cursor-pointer transition-all font-semibold text-violet-400"
                  >
                    {" "}
                    Indian Institute of Technology, Roorkee (IITR)
                  </a>. Although my academic background is in mechanical engineering, I have a strong foundation in software development, with a keen focus on problem-solving and writing clean, production-level code. My experience spans both mechanical and software engineering, giving me a unique perspective on tackling diverse challenges.<br /><br />
                  I have also completed a research internship at the <a
                    onClick={() => {
                      window.open(uvic, "_blank");
                      router.push("/");
                    }}
                    className="hover:underline cursor-pointer transition-all font-semibold text-violet-400"
                  >
                    {" "}
                    University of Victoria, BC (UVic)
                  </a>, which ignited my passion for research. In addition to my professional experiences, I actively engage in competitive programming on platforms like {" "}
                  <a
                    onClick={() => {
                      window.open(codeforces, "_blank");
                      router.push("/");
                    }}
                    className="hover:underline cursor-pointer transition-all font-semibold text-violet-400"
                  >
                    Codeforces
                  </a>{" "} and {" "}
                  <a
                    onClick={() => {
                      window.open(leetcode, "_blank");
                      router.push("/");
                    }}
                    className="hover:underline cursor-pointer transition-all font-semibold text-violet-400"
                  >
                    Leetcode
                  </a>, consistently solving problems of varying difficulty to sharpen my problem-solving skills.<br /><br />
                  I love coding and am always eager to explore and solve problems, whether they are related to mechanical or software engineering.<br /><br />
                  Here are a few technologies I have worked on:
                </p>
                <ul className={`${anonymousPro.className} about__list`}>
                  <li>C++</li>
                  <li>C#</li>
                  <li>Java</li>
                  <li>Python</li>
                  <li>Data Structure and Algorithms</li>
                  <li>JavaScript (ES6+)</li>
                  <li>TypeScript</li>
                  <li>React.js</li>
                  <li>Next.js</li>
                  <li>Android Studio</li>
                  <li>Winforms</li>
                  <li>Blazor</li>
                  <li>Unity Game Engine</li>
                </ul>
              </div>

              {/* Uncomment and complete the skills section if needed */}
              {/* <div className="about__skills grid">
                <div className="skills__data">
                  <div className="skills__titles">
                    <h3 className="skills__name">Development</h3>
                    <span className="skills__number">90%</span>
                  </div>
                  <div className="skills__bar">
                    <span className="skills__percentage development"></span>
                  </div>
                </div>
                <div className="skills__data">
                  <div className="skills__titles">
                    <h3 className="skills__name">UI/UX Design</h3>
                    <span className="skills__number">80%</span>
                  </div>
                  <div className="skills__bar">
                    <span className="skills__percentage ui__design"></span>
                  </div>
                </div>
                <div className="skills__data">
                  <div className="skills__titles">
                    <h3 className="skills__name">Photography</h3>
                    <span className="skills__number">60%</span>
                  </div>
                  <div className="skills__bar">
                    <span className="skills__percentage photography"></span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </Card>
    </section>
  );
};

export default About;
