import { Playpen_Sans } from "next/font/google";

const playpenSans = Playpen_Sans({
  subsets: ["latin"],
  weight: ["400"],
});
const ResumeButton = () => {
    return (
      <div className={`${playpenSans.className} flex mt-3 hover:animate-bounce`}>
      <a
        href="/Harsh_Pal_CV.pdf"  // Link to your resume file
        download="Harsh_Pal_CV.pdf"
        className="bg-transparent border-2 border-current px-2 py-2 text-pretty rounded-full cursor-pointer transition-all duration-500 ease-in-out font-medium text-center inline-block mr-10 z-2 hover:bg-[var(--hover-background-color)] hover:text-[var(--text-color)] hover:border-[var(--border-color)]"
      >
        Download Resume
      </a>
    </div>
    );
  };
  
  export default ResumeButton;
  