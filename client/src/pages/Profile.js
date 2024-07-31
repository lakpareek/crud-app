import Navbar from "../components/navbar/Navbar";
import React, { useEffect, useState } from "react";
import LoginButton from "../components/LoginButton";
import ProfilePage from "../components/ProfilePage";
import "../App.css";

export function Profile({
  theme,
  handleThemeSwitch,
  setIsLoggedIn,
  isLoggedIn,
}) {
  useEffect(() => {
    console.log(isLoggedIn);
  });
  return (
    <div className="">
      <Navbar theme={theme} handleThemeSwitch={handleThemeSwitch} />
      {isLoggedIn ? (
        <ProfilePage/>
      ) : (
        <LoginButton
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </div>
  );
}
