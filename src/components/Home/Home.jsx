
/* eslint-disable */
import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import homebg from "../../assets/eyevideo.mp4";
import splitStringUsingRegex from "../../utality/spling";
import Contact from "../Contact/Contact";
import Feature from "../Feature/Feature";


export default function Home() {
  // State initialization (you can uncomment it if required for future functionality)
  const heading = "Trust with AI-powered";
  const text = `the power of artificial intelligence to detect deception with unparalleled accuracy. 
    Our AI-powered Lie Detector provides real-time analysis, giving you the confidence.`;

  // You can use the utility function if you want to split the text
  const headingChars = splitStringUsingRegex(heading);
  const textChars = splitStringUsingRegex(text);

  useEffect(() => {}, []);

  return (
    <>
    <div className="home bg  h-auto w-full  bg-black ">
      
      <div className="landing w-full h-screen     relative">
        {/* Video Background */}
        <div className=" inset-0 w-full h-full relative bg-[#040108] xsm:hidden  md:flex justify-center items-center ">
          <video
            className="  absolute top-24 w-[80%] h-[80%]  object-cover sm:hidden  md:flex    "
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={homebg} type="video/mp4" />
       
          </video>
        </div>

        <div className="content absolute inset-0 w-full flex justify-center items-center flex-col text-center px-4 md:hidden sm:flex">
          <h1 className="text-white font-Abril font-bold text-3xl sm:text-4xl text-center">
            {heading}
          </h1>
          <p className="py-5 text-slate-300 text-lg">{text}</p>
        </div>
      </div>

<Feature/>

      <Contact />

      
      </div>
    </>
  );
}
