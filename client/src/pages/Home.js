import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import React, { useEffect, useState } from "react";
import "../App.css";

export function Home({ theme, handleThemeSwitch, setIsLoggedIn, isLoggedIn }) {
  return (
    <div className="">
      <div className="">
        <Navbar
          theme={theme}
          handleThemeSwitch={handleThemeSwitch}
        />
        <Hero
          isLoggedIn={isLoggedIn}
        />
      </div>
    </div>
  );
}
