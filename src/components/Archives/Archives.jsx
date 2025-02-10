/* eslint-disable */

import React, { useEffect, useState } from "react";
import style from "./Archives.module.css";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import test from '../../assets/team/test.jpg'

export default function Archives() {
  function ArchiveDetails() {
    const navigate = useNavigate();
  
    return () => navigate("/archived"); // Return a function for onClick
  }
  
  return (
    <>
      <div className="archives bg  py-20">
        <div className="container  mx-auto">
          <div className="head">
            <h1 className="font-Abril text-slate-100 md:text-5xl text-2xl py-10 text-center relative">Archives</h1>
            {/* <div className="line w-52 h-1 bg-white absolute  rounded-lg left-52"></div> */}
          </div>

          <div className="header  flex items-center justify-between   py-5">
            <div className="search-name sm:w-1/3 w-1/2   ">
              <form className=" w-full ">
                <div className="flex w-full">
                  <div className="relative w-full ">
                    <input
                      type="search"

                      id="location-search"
                      className="block p-2.5  w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                      placeholder="Search by name"
                      required
                    />
                    <button
                      type="submit"
                      className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-[#262463] rounded-e-lg border border-blue-300 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                      <span className="sr-only">Search</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* <div className="search-id">
        <form className="max-w-md mx-auto">
          <div className="flex">
            <div className="relative w-full">
              <input
                type="search"
                id="id-search"
                className="block p-2.5 px-10 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="Search by ID"
                required
              />
              <button
                type="submit"
                className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-[#262463] rounded-e-lg border border-blue-300 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
      </div> */}

            <div className="btn " >
              <button
                type="button"
                className={`${style.videoGlassB} font-Abril font-medium rounded-lg text-white sm:px-6 px-3  py-2 cursor-pointer text-sm md:text-xl capitalize shadow-whiteShado `}
              >
                New Video
              </button>
            </div>
          </div>

          <div className="content mt-10  flex items-center justify-between py-5  ">

            <div className="card flex md:gap-10 gap-5" >

              <div className="video  cursor-pointer">
               <img className=" md:w-56 w-40 rounded-lg" src={test} alt="test" />
              </div>
              <div className="card-body flex justify-center flex-col">
                <h3 className="card-title capitalize py-3 text-white text-lg font-Abril"> name: </h3>
                <p className="card-text text-white text-lg font-Abril">11am</p>
     
              </div>
            </div>

            <div className="info" onClick={ArchiveDetails()}>
              <button
                type="button"
                className={` bg-[#99BBFE] font-Abril font-medium rounded-lg text-white sm:px-6 px-3 py-2 cursor-pointer md:text-xl text-sm capitalize shadow-whiteShado `}
              >
                Info Video
              </button>

            </div>

          </div>
          <div className="line w-full h-[2px] mt-5    bg-[#99BBFE]   rounded-lg"></div>
          <div className="content mt-10  flex items-center justify-between py-5" >
            <div className="card flex  md:gap-10 gap-5 ">
              <div className="video cursor-pointer ">
              <div className="video  cursor-pointer">
               <img className=" md:w-56 w-40 rounded-lg" src={test} alt="test" />
              </div>
              </div>
              <div className="card-body flex justify-center flex-col">
                <h3 className="card-title capitalize py-3 text-white text-lg font-Abril"> name: </h3>
                <p className="card-text text-white text-lg font-Abril">11am</p>
              </div>
            </div>
            <div className="info"  onClick={ArchiveDetails()}>
              <button
                type="button"
                className={` bg-[#99BBFE] font-Abril font-medium rounded-lg text-white sm:px-6 px-3 py-2 cursor-pointer md:text-xl text-sm capitalize shadow-whiteShado `}
              >
                Info Video
              </button>
            </div>

          </div>

          <div className="line w-full h-[2px] mt-5   bg-[#99BBFE]   rounded-lg"></div>
        </div>
      </div>


    </>
  );
}
