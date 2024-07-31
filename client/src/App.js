import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import config from "./.config";
import "./App.css";


function App() {
  const [theme, setTheme] = useState("light");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    console.log("Theme changed");
  };


  useEffect(()=>{
    checkLoginStatus();
  },[])


  // Function to check if user is logged in
  const checkLoginStatus = async () => {
    const token = localStorage.getItem("token"); // Get token from local storage
    console.log("Login func runnins");
    if (!token) {
      setIsLoggedIn(false);
      console.log(isLoggedIn);
      return;
    }

    try {
      const response = await fetch(`https://crud-app-xi-ruby.vercel.app/isLoggedIn`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        //console.log(token)
        console.log("YOU ARE LOGGED IN2");
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
      }
    } catch (error) {
      console.error("Error fetching login status:", error);
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="App bg-gray-100 dark:bg-[#1A1A1A]">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setIsLoggedIn={setIsLoggedIn}
                theme={theme}
                handleThemeSwitch={handleThemeSwitch}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                setIsLoggedIn={setIsLoggedIn}
                theme={theme}
                handleThemeSwitch={handleThemeSwitch}
                isLoggedIn={isLoggedIn}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
