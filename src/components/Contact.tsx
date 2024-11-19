import React, { useState, useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Playpen_Sans, Playfair_Display } from "next/font/google";
import emailjs from "@emailjs/browser";
import "react-toastify/dist/ReactToastify.css";
import ThemeContext from "../context/ThemeContext";
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
    <section id="contacts" className={`relative ${fadeIn ? "fadeIn" : ""} p-8 relative h-screen`}>
      <Headers text="Get in Touch" />

      <div className={`${playpenSans.className} grid md:w-3/5 mx-auto md:grid-cols-2 gap-8 p-8 animate-fadeIn`}>
        <div className="text-center md:text-left">
          <h3 className="text-sm md:text-2xl mb-2">Let&apos;s talk about everything!</h3>
          <p className="text-sm md:text-lg mb-4">
            Don&apos;t like forms? Send me an email. 👋
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-5 md:space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative mb-6 h-8 md:h-16">
              <input
                type="text"
                className="absolute top-0 left-0 w-full h-full custom-shadow bg-[color:var(--container-color)] border-none outline-none rounded-[1.875rem] p-4"
                placeholder="Insert your name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="relative mb-6 h-16">
              <input
                type="email"
                className="absolute top-0 left-0 w-full h-full custom-shadow bg-[color:var(--container-color)] border-none outline-none rounded-[1.875rem] p-4"
                placeholder="Insert your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="relative mb-6 h-16">
            <input
              type="text"
              className="absolute top-0 left-0 w-full h-full custom-shadow bg-[color:var(--container-color)] border-none outline-none rounded-[1.875rem] p-4"
              placeholder="Insert your subject"
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="relative mb-6 h-40">
            <textarea
              name=""
              id=""
              cols={30}
              rows={10}
              className="absolute top-0 left-0 w-full h-full custom-shadow bg-[color:var(--container-color)] border-none outline-none rounded-[1.875rem] p-4 resize-none"
              placeholder="Write your message"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className={`${playpenSans.className} bg-transparent border-[color:var(--border-color)] text-base cursor-pointer transition-all duration-[0.5s] ease-[ease-in-out] font-medium text-center inline-block mr-5 p-2 rounded-full border-2 border-solid hover:bg-[color:var(--hover-background-color)] hover:text-[color:var(--text-color)] hover:border-[color:var(--border-color)]`}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
        <ToastContainer position="bottom-right" theme={theme} />
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <a href={`mailto:${gmail}`} target="_blank" rel="noopener noreferrer" className="text-current transition-colors duration-300 ease-in-out hover:scale-110 hover:text-gray-400">
          <SiGmail size={20} />
        </a>
        <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-current transition-colors duration-300 ease-in-out hover:scale-110 hover:text-gray-400">
          <FaInstagram size={20} />
        </a>
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-current transition-colors duration-300 ease-in-out hover:scale-110 hover:text-gray-400">
          <FaLinkedin size={20} />
        </a>
        <a href={leetcode} target="_blank" rel="noopener noreferrer" className="text-current transition-colors duration-300 ease-in-out hover:scale-110 hover:text-gray-400">
          <SiLeetcode size={20} />
        </a>
        <a href={github} target="_blank" rel="noopener noreferrer" className="text-current transition-colors duration-300 ease-in-out hover:scale-110 hover:text-gray-400">
          <FaGithub size={20} />
        </a>
      </div>

      <footer className={`${playfairDisplay.className} text-center mt-8 text-gray-600`} style={{ fontSize: "15px", marginBottom: "10px" }}>
        Made with ❤️<br /> by Harsh Pal
      </footer>
    </section>
  );
};

export default Contact;
