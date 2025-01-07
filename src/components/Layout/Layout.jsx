/* eslint-disable */

import React, { useEffect, useState } from "react";
import style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";

export default function Layout() {
  // Example state initialization (if needed)
  const [first, setFirst] = useState("");

  useEffect(() => {
    // Example logic (if needed)
    console.log("Component mounted");
  }, []);

  return (
    <div className={style.container}>
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}
