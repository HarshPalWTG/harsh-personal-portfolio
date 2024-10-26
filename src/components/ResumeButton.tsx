const ResumeButton = () => {
    return (
      <div className="resumebtn-container">
        <a
          href="/Harsh_Pal_CV.pdf"  // Link to your resume file
          download="Harsh_Pal_CV.pdf"
          className="resume-btn"
        >
          Resume
        </a>
      </div>
    );
  };
  
  export default ResumeButton;
  