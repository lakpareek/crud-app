import "../App.css";
import React, { useState } from "react";
import LoginModal from "./LoginModal";

export default function LoginButton({ setIsLoggedIn }) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="bg-gray-100 gap-3 dark:bg-[#1A1A1A] text-center dark:text-gray-300 flex justify-center items-center flex-col h-[100vh]">
      <h1>You Need to Log-in/Sign-up to access your Profile and Products</h1>
      <button
        className="h-[10vh] rounded-lg bg-green-400 dark:bg-green-950 w-[20vh] border-black dark:border-white border-[1px] text-[4vh]"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Log-in
      </button>
      {modalOpen && (
        <LoginModal setIsLoggedIn={setIsLoggedIn} setOpenModal={setModalOpen} />
      )}
    </div>
  );
}
