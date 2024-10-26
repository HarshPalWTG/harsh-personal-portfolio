import { useEffect, useRef, useState } from "react";
import { Headland_One } from "next/font/google";

const headlandOne = Headland_One({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Headers({ text }: { text: string }) {
  return (
    <div className={`${headlandOne.className} header-container`}>
      <div className="header-line"></div>
      <div className="header-text">
        {text}
      </div>
      <div className="header-line"></div>
    </div>
  );
}
