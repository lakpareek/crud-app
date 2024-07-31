import "../App.css";
import React, { useState } from "react";
import config from "../.config";
import axios from "axios";

export default function LoginModal({ setOpenModal, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  async function handleSignIn(event) {
    event.preventDefault();
    try {
      const response = await axios.post(`https://crud-app-xi-ruby.vercel.app/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); 
      setIsLoggedIn(true);
      setOpenModal(false);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function handleSignUp(event) {
    event.preventDefault();
    try {
      const response = await axios.post(`https://crud-app-xi-ruby.vercel.app/signup`, {
        email,
        username,
        password,
      });
      localStorage.setItem("token", response.data.token); 
      setIsLoggedIn(true);
      setOpenModal(false);
      console.log("Signed up successfully:", response.data);
    } catch (error) {
      alert(error.response.data.errorDetail);
    }
  }

  return (
    <div className="fixed inset-0 bg-[rgba(200,200,200,0.8)] flex justify-center items-center z-50">
      <div className="w-[500px] h-[500px] bg-white dark:bg-black rounded-[12px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] flex flex-col p-[25px]">
        <div className="flex justify-end">
          <button
            onClick={() => setOpenModal(false)}
            className="bg-transparent border-none text-[25px] cursor-pointer"
          >
            X
          </button>
        </div>
        <div className="mt-[10px] text-center">
          <h1>Login or Signup to Continue</h1>
        </div>
        <div className="flex-1 flex justify-center items-center text-[1.7rem] text-center">
          <form className="flex flex-col gap-3">
            <div className="flex flex-col justify-start items-start">
              <label className="text-[1rem]" htmlFor="email">
                Email:
              </label>
              <input
                id="email"
                className="text-black"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                value={email}
              />
            </div>
            <div className="flex flex-col justify-start items-start">
              <label className="text-[1rem]" htmlFor="username">
                Username:
              </label>
              <input
                id="username"
                className="text-black"
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                value={username}
              />
            </div>
            <div className="flex flex-col justify-start items-start">
              <label className="text-[1rem]" htmlFor="password">
                Password:
              </label>
              <input
                id="password"
                className="text-black"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                value={password}
              />
            </div>
            <div className="gap-3 flex justify-center items-center mt-3">
              <button
                type="submit"
                onClick={handleSignIn}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Sign In
              </button>
              <button
                type="submit"
                onClick={handleSignUp}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
