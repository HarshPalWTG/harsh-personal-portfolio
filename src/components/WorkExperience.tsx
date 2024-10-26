import Headers from "./Headers";
import Card from "./Card";
import React from "react";
import Image from "next/image";
import { wisetech } from "../../public/Links";
import { useRouter } from "next/navigation";
import { Anonymous_Pro, Playpen_Sans } from "next/font/google";

const anonymousPro = Anonymous_Pro({
  subsets: ["latin"],
  weight: ["400"],
});

const playpenSans = Playpen_Sans({
  subsets: ["latin"],
  weight: ["400"],
});


const WorkExperience = () => {
  const router = useRouter();
  const workExperienceData = [
    {
      role: "Associate Software Engineer",
      company: "WiseTech Global, IN",
      date: "July 2024 - Present",
    },
  ];
    return (
      <section id="work-experience">
      <Card >
      <section  style={{ padding: '2rem' }}>
        <Headers text="Work Experience" />
        <div className="experience-container">
          <div className="timeline">
            {workExperienceData.map((work, index) => (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}>
                <a onClick={() => {
                  window.open(wisetech, "_blank");
                  router.push("/");
                  }}>
                  <div className="icon">
                    <Image src="/images/WiseTech.png" alt="WiseTech" width={50} height={50} style={{ borderRadius: "9999px" }} />
                  </div>
                </a>
                <div className="content">
                  <h3 className={anonymousPro.className}>{work.role}</h3>
                  <p className={playpenSans.className}>{work.company}</p>
                  <span className={playpenSans.className}>{work.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </Card>
      </section>
    );
  };
  
  export default WorkExperience;

