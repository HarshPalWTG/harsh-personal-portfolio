"use client";
import { useState } from "react";
import Head from 'next/head';
import Landing from '@/components/Landing';
import Navbar from '../components/Navbar';
import Intro from "@/components/Intro";
import About from '../components/About';
import WorkExperience from '../components/WorkExperience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import {Analytics} from "@vercel/analytics/react";

export default function Home(): JSX.Element {
  const [isLandingVisible, setIsLandingVisible] = useState(true);

  const sections = [
    { component: <Intro />, id: 'intro' },
    { component: <About />, id: 'about' },
    { component: <WorkExperience />, id: 'workExperience' },
    { component: <Projects />, id: 'projects' },
    { component: <Contact />, id: 'contact' },
  ];

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>Harsh Pal&apos;s Portfolio</title>
      </Head>
      {/* Landing Page */}
      {isLandingVisible && <Landing setIsLandingVisible={setIsLandingVisible} />}
      {!isLandingVisible && <Navbar />}

      {/* Main Content */}
      {!isLandingVisible && (
        <main className="p-4">
          <div className="sections-container">
            {sections.map((section, index) => (
              <div key={index} id={section.id} className="section">
                {section.component}
              </div>
            ))}
          </div>
        </main>
      )}
      <Analytics/>
    </div>
  );
}