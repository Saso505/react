/* eslint-disable */

import React, { useEffect, useState } from 'react';
import style from './Navbar.module.css';
import navLogo from '../../assets/navLogo.png'
import { Link, NavLink } from 'react-router-dom';


export default function Navbar() {
    // Example state initialization (if needed)
    const [isMenuOpen, setisMenuOpen] = useState(false);

    useEffect(() => {
        // Example logic (if needed)
        console.log('Component mounted');
    }, []);

    return <>
<nav className=  "fixed w-full z-20 top-0   start-0  px-8">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
  <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img className="lg:w-24  xsm:w-14  sm:w-20 " src={navLogo} alt="Navlogo" /> 
        <span className="self-center text-lg font-lato font-semibold sm:hidden xsm:flex mb-1 whitespace-nowrap dark:text-white">Eye  of  Veritas</span>
  </a>
  <div class="md:order-2 space-x-3 md:space-x-0  rtl:space-x-reverse">
  <button
  type="button"
  className={`${style.nlogin} lg:px-[3rem] md:px-[1.5rem] text-white xsm:hidden md:flex focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:focus:ring-blue-800`}
>
  <NavLink to="/login">Login</NavLink> 
</button>

    
  </div>
  <div className={`${style.glassNavcontainer} md:px-[2rem]  lg:px-[3rem]  py-[0.5rem] rounded-full  items-center justify-between hidden w-full  md:flex md:w-auto  md:order-1 `} id="navbar-sticky">
    <ul className="flex flex-col  xl:mx-2 px-3 md:p-0 mt-4 font-medium border border-gray-100 rounded- bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-transparent ">
      <li>
        <NavLink to="/" className="block font-lato  xl:mx-2 xl:px-3 text-white  rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</NavLink>
      </li>
      
      <li>
        <NavLink to="" className="block font-lato  xl:mx-2 xl:px-3 text-gray-900 rounded  md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</NavLink>
      </li>
      <li>
        <NavLink to="#" className="block font-lato  xl:mx-2 xl:px-3 text-gray-900 rounded  md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Featue</NavLink>
      </li>
      <li>
        <NavLink to="#" className="block font-lato  xl:mx-2 xl:px-3 text-gray-900 rounded  md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Team</NavLink>
      </li>
      <li>
        <NavLink to="#" className="block font-lato  xl:mx-2 xl:px-3 text-gray-900 rounded  md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</NavLink>
      </li>
      <li>
        <NavLink to="/archives" className="block font-lato  xl:mx-2 xl:px-3 text-gray-900 rounded  md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Archives</NavLink>
      </li>
      
    </ul>
   
  </div>
  <button onClick={()=> setisMenuOpen(!isMenuOpen) }data-collapse-toggle="navbar-sticky" type="button" className=" bg-white inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden  cursor-pointer xsm:flex hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">

<svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
</svg>

</button>
<div className={`abalute top-36 md:hidden left-0 w-full py-3 ${style.glassNavcontainer} flex flex-col items-center gap-7 text-lg transform transition-transform ${isMenuOpen ? "opacity-100":"opacity-0"} `}
style={{transition : "transform 0.3s ease ,opacity 0.3s ease"}}
>

      <li className='list-none'>
        <NavLink to="#" className=" transition-all cursor-pointer py-3   w-full font-lato  xl:mx-2 xl:px-3 
          hover:border-slate-300 rounded md:bg-transparent " aria-current="page">Home</NavLink>
      </li>
      
      <li className='list-none'>
        <NavLink to="#" className=" transition-all cursor-pointer py-3  w-full font-lato  xl:mx-2 xl:px-3  rounded    md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white ">Services</NavLink>
      </li>
      <li className='list-none'>
        <NavLink to="#" className=" transition-all cursor-pointer py-3  w-full font-lato  xl:mx-2 xl:px-3 rounded   md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white ">Feature</NavLink>
      </li>
      <li className='list-none'>
        <NavLink to="#" className=" transition-all cursor-pointer py-3 list-none w-full font-lato  xl:mx-2 xl:px-3 rounded   hover:border-b  hover:border-slate-300md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white ">Team</NavLink>
      </li>
      <li className='list-none'>
        <NavLink to="#" className=" transition-all cursor-pointer py-3 list-none w-full font-lato  xl:mx-2 xl:px-3 rounded     hover:border-b   md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white ">Contact</NavLink>
      </li>
      <li className='list-none'>
        <NavLink to="#" className=" transition-all cursor-pointer py-2 list-none w-full font-lato  xl:mx-2 xl:px-3 rounded    md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white e">Archives</NavLink>
      </li>
      </div>

  </div>
</nav>


    </>
    
}