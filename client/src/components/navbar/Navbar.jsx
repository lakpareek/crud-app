import "../../App.css";
import {
  LightModeIcon,
  DarkModeIcon,
  ProfileIconLight,
  ProfileIconDark,
} from "../../utils/icons";

import { Link } from "react-router-dom";
import logo from "../../utils/loremlogo.png";
import React, { useState } from "react";

export default function Navbar({ theme, handleThemeSwitch }) {
  return (
    <div className="w-full bg-gray-300 dark:bg-[#282828] h-[10vw] sm:h-[5vw] ">
      <div className="flex items-center float-right h-[10vw] sm:h-[5vw] pr-[4%]">
        <div className="flex gap-[2vw]">
          <Link to="/profile">
            {theme === "light" ? (
              <ProfileIconLight height="30" width="30" />
            ) : (
              <ProfileIconDark height="30" width="30" />
            )}
          </Link>
          <button onClick={handleThemeSwitch}>
            {theme === "light" ? (
              <DarkModeIcon height="30" width="30" />
            ) : (
              <LightModeIcon height="30" width="30" />
            )}
          </button>
        </div>
      </div>
      <div className="pl-[4%]">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-[5vw]" />
        </Link>
      </div>
    </div>
  );
}
