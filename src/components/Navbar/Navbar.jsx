/* eslint-disable */
import React, { useEffect, useState } from "react";
import style from "./Navbar.module.css";
import navLogo from "../../assets/navLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { SectionId } from "../sectionId/Section";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home"); // Default active link set to "home"
  const navigate = useNavigate();

  // Smooth scroll to sections
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const scrollToY = element.offsetTop;
      window.scrollTo({ top: scrollToY, behavior: "smooth" });
      setActiveLink(sectionId);
    }
    setIsMenuOpen(false); // Close mobile menu
  };

  // Detect active section while scrolling
  const determineActiveSection = () => {
    if (!SectionId || SectionId.length === 0) return;

    let isAnySectionActive = false;

    for (let i = SectionId.length - 1; i >= 0; i--) {
      const section = document.getElementById(SectionId[i]);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveLink(SectionId[i]);
          isAnySectionActive = true;
          break;
        }
      }
    }

    // Fallback to "home" if no other section is detected as active
    if (!isAnySectionActive) {
      setActiveLink("home");
    }
  };

  // Handle page navigation with smooth scrolling
  const handlePageNavigation = (path) => {
    setActiveLink(path.slice(1)); // Update active link
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false); // Close mobile menu
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
      determineActiveSection();
    };

    const debouncedHandleScroll = debounce(handleScroll, 50); // Optimize scroll performance

    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  // Debounce utility
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  return (
    <nav
      className={`${style.navbarTransition} ${
        isScrolled ? style.scrolled : ""
      } fixed w-full z-20 top-0 px-8`}
    >
      <div className="max-w-screen-xl flex items-center justify-between mx-auto">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img className="md:w-16 xsm:w-14" src={navLogo} alt="Nav Logo" />
          <span className="self-center text-lg font-lato font-semibold md:hidden xsm:flex mb-1 whitespace-nowrap text-slate-100">
            Eye of Veritas
          </span>
        </a>

        {/* Login Button */}
        <div className="md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className={`${style.nlogin} lg:px-[3rem] md:px-[1.5rem] text-white xsm:hidden md:flex focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center`}
          >
            <Link to="/login">Login</Link>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${style.glassNavcontainer} ${
            isMenuOpen
              ? "flex absolute top-20 left-0 right-0 rounded"
              : "hidden"
          } md:px-[1rem] lg:px-[3rem] md:py-[0.3rem] lg:py-[0.5rem] md:rounded-full md:space-x-8 rounded-md items-center justify-between md:flex md:w-auto md:order-1`}
          id="navbar-menu"
        >
          <ul className="flex flex-col md:flex-row items-center gap-4 md:gap-8 xsm:w-full md:w-auto md:bg-transparent md:rounded-full p-4 md:p-0 xsm:justify-center">
            <li
              className={`${
                activeLink === "home"
                  ? `relative after:absolute after:w-7 after:h-[0.125rem] after:left-4 after:bg-[#0077ff]`
                  : ""
              }`}
            >
              <button
                onClick={() => handlePageNavigation("/home")}
                className={`block font-lato xl:mx-2 xl:px-2 rounded ${
                  activeLink === "home"
                    ? `text-[#0077ff] font-semibold`
                    : "text-slate-100"
                }`}
              >
                Home
              </button>
            </li>
            {SectionId.map((sectionId, i) => (
              <li
                key={i}
                className={`${
                  activeLink === sectionId
                    ? `relative after:absolute after:w-7 after:h-[0.125rem] after:left-4 after:bg-[#0077ff]`
                    : ""
                }`}
              >
                <button
                  onClick={() => scrollToSection(sectionId)}
                  className={`block font-lato xl:mx-2 xl:px-2 rounded ${
                    activeLink === sectionId
                      ? `text-[#0077ff] font-semibold`
                      : "text-slate-100"
                  }`}
                >
                  {sectionId}
                </button>
              </li>
            ))}
            <li
              className={`${
                activeLink === "archives"
                  ? `relative after:absolute after:w-7 after:h-[0.125rem] after:left-4 after:bg-[#0077ff]`
                  : ""
              }`}
            >
              <button
                onClick={() => handlePageNavigation("/archives")}
                className={`block font-lato xl:mx-2 xl:px-2 rounded ${
                  activeLink === "archives"
                    ? `text-[#0077ff] font-semibold`
                    : "text-slate-100"
                }`}
              >
                Archives
              </button>
            </li>
            <li
              className={`${
                activeLink === "profile"
                  ? `relative after:absolute after:w-7 after:h-[0.125rem] after:left-4 after:bg-[#0077ff]`
                  : ""
              }`}
            >
              <button
                onClick={() => handlePageNavigation("/profile")}
                className={`block font-lato xl:mx-2 xl:px-2 rounded ${
                  activeLink === "profile"
                    ? `text-[#0077ff] font-semibold`
                    : "text-slate-100"
                }`}
              >
                Profile
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-controls="navbar-menu"
          aria-expanded={isMenuOpen}
          type="button"
          className="bg-white inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden cursor-pointer xsm:flex hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
