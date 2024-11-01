import React, { useState, useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Playpen_Sans, Playfair_Display } from "next/font/google";
import emailjs from "@emailjs/browser";
import "react-toastify/dist/ReactToastify.css";
import ThemeContext from "../context/ThemeContext"; // Ensure this is the correct path
import Headers from "./Headers";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiLeetcode, SiGmail } from "react-icons/si";
import { instagram, github, linkedin, leetcode, gmail } from "../../public/Links";


const playpenSans = Playpen_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400'],
});

interface ContactProps {
  theme?: string;
}

const Contact: React.FC<ContactProps> = () => {
  const { theme } = useContext(ThemeContext);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 250);
  }, []);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      return toast.error("Please complete the form above");
    }

    setLoading(true);

    const data = {
      name,
      email,
      subject,
      message,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        data,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_API!
      )
      .then(
        () => {
          setLoading(false);
          toast.success(`Successfully sent email.`);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          toast.error(error.text);
        }
      );
  };

  return (
    <section id = "contacts" className={`contact container section" ${fadeIn ? "fadeIn" : ""}`} style = {{padding : "2rem", height: "100vh", width: "100vw"}}>
    <Headers text = "Get in Touch" />

      <div className={`${playpenSans.className} contact__container grid justify-center align-center`}>
        <div className="contact__info">
          <h3 className="contact__title">Let&apos;s talk about everything!</h3>
          <p className="contact__details">
            Don&apos;t like forms? Send me an email. 👋
          </p>
        </div>

        <form onSubmit={submitHandler} className="contact__form">
          <div className="contact__form-group">
            <div className="contact__form-div">
              <input
                type="text"
                className="contact__form-input"
                placeholder="Insert your name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="contact__form-div">
              <input
                type="email"
                className="contact__form-input"
                placeholder="Insert your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="contact__form-div">
            <input
              type="text"
              className="contact__form-input"
              placeholder="Insert your subject"
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="contact__form-div contact__form-area">
            <textarea
              name=""
              id=""
              cols={30}
              rows={10}
              className="contact__form-input"
              placeholder="Write your message"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className={ `${playpenSans.className} btn`}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
        <ToastContainer position="bottom-right" theme={theme} />
      </div>
        <div className="social-media-buttons">
          <a href={`mailto:${gmail}`} target="_blank" rel="noopener noreferrer">
            <SiGmail size={20} />
          </a>
          <a href={instagram} target="_blank" rel="noopener noreferrer">
            <FaInstagram size={20} />
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={20} />
          </a>
          <a href={leetcode} target="_blank" rel="noopener noreferrer">
            <SiLeetcode size={20} />
          </a>
          <a href={github} target="_blank" rel="noopener noreferrer">
            <FaGithub size={20} />
          </a>
        </div>

          <footer className={`${playfairDisplay.className} footer`} style={{fontSize: "15px", marginBottom: "10px"}}>
            Made with ❤️<br /> by Harsh Pal
          </footer>
    </section>
  );
};

export default Contact;


