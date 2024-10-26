import { ReactNode } from "react";
import { useState, useEffect } from "react";
export default function Card({children}:{children:ReactNode}){
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(()=>{
        setFadeIn(true);
    },[])
    return <div className={`lg:px-0 pb-5 px-2 h-screen flex flex-col items-center duration-4000 ease-in-out ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}>
      <div className={`w-full lg:w-3/4 2xl:w-2/4 h-4/5 pt-24 flex flex-col justify-center`}>
        <div className={`flex flex-col-reverse lg:flex-row lg:items-start justify-center w-full transition-transform`}>
          {children}
        </div>
      </div>
    </div>
}