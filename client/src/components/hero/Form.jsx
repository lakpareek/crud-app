import React, { useState } from "react";
import config from "../../.config";
import "../../App.css";

const initialFormState = {
  productName: "",
  brand: "",
  type: "",
  buyingDate: "",
  warrantyDate: "",
};

export default function Form({ isLoggedIn }) {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      alert("Login to Continue");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://crud-app-xi-ruby.vercel.app/submission`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Submission successful");
        setFormData(initialFormState); // Reset form after successful submission
      } else {
        console.error("Submission failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while submitting. Please try again.");
    }
  };

  return (
    <div>
      <form className="pt-[1%] flex gap-[2vw]" onSubmit={handleSubmit}>
        <div className="flex-col flex gap-[1vw]">
          {["productName", "brand", "type"].map((field) => (
            <input
              key={field}
              className="rounded-md placeholder:text-2xl w-[30vw] sm:w-[20vw] sm:h-[3vw] text-black dark:text-gray-500 border-gray-400 border-[1px] dark:border-none"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          ))}
          <div className="flex gap-[1vw] flex-col sm:flex-row">
            {["buyingDate", "warrantyDate"].map((field) => (
              <div key={field}>
                <p>
                  {field === "buyingDate"
                    ? "Date of Purchase:"
                    : "Warranty valid till:"}
                </p>
                <input
                  className="rounded-md placeholder:text-2xl w-[30vw] sm:w-[9.5vw] sm:h-[3vw] text-[#9BA3AF] border-gray-400 border-[1px] dark:border-none"
                  type="date"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  min={
                    field === "warrantyDate" ? formData.buyingDate : undefined
                  }
                  disabled={field === "warrantyDate" && !formData.buyingDate}
                  required
                />
              </div>
            ))}
          </div>
        </div>
        <div className="dark:text-white flex flex-col justify-center items-center gap-[2vw] w-full">
          <button
            className="h-[6vh] w-[12vh] rounded-lg border-[1px] border-black dark:border-white"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
