import "../../App.css";
import Form from "./Form";
import {} from "../../utils/icons";

import landingImage from "../../utils/landing.jpg";
import React from "react";

export default function Navbar({ isLoggedIn }) {
  return (
    <div className=" h-[100vh] flex flex-col sm:flex-row items-center sm:p-[4%] gap-[10vw] dark:text-white">
      <div className="border-[1px] rounded-md border-black dark:border-[#A9A9A9] w-[75vw] sm:w-[40vw] pl-[2%] h-[90vw] min-[400px]:h-[76vw] min-[430px]:h-[58vw] md:h-[32vw] order-2 sm:order-1">
        <h2 className="text-[7vw]  p-0">Welcome.</h2>
        <h3 className="">Want to enlist a Product?</h3>
        <Form isLoggedIn={isLoggedIn} />
      </div>
      <div className="border-[1px] w-[75vw] border-black dark:border-[#A9A9A9] rounded-md sm:w-[42vw] h-[42vw] flex justify-center items-center order-1 sm:order-2 flex-col sm:mt-0 mt-[6vw]">
        <div className=" relative top-3 right-3 w-[75vw] rounded-md sm:w-[42vw] h-[42vw]">
          <img
            className="w-full h-full rounded-md"
            draggable="false"
            src={landingImage}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

//<img className="w-full h-full" draggable="false" src={landingImage} alt="" />
