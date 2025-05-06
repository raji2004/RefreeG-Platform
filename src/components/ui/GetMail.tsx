"use client";
import { handleSubmit } from "@/lib/formActions";
import { Mail } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const GetMail = () => {
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email");
      return false;
    }
    setEmailError(null);
    return true;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email") as string;

    if (!validateEmail(email)) {
      return;
    }

    try {
      await handleSubmit(formData, toast);
      setMessage({ text: "Subscription successful! ✅", type: "success" });
      form.reset();
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({
        text: "Subscription failed. Please try again.",
        type: "error",
      });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleFormSubmit}
        className="relative size-fit mt-2"
        noValidate
      >
        <div className="relative">
          <input
            type="email"
            name="email"
            className={`bg-white rounded-3xl h-[45px] outline-none border-none placeholder:text-bold placeholder:font-medium 
            placeholder:text-[12px] text-[12px] pl-[50px] pr-[120px] flex items-center w-full
            ${emailError ? "border-red-500 border" : ""}`}
            placeholder="Enter your Email"
            onChange={(e) => {
              if (emailError) validateEmail(e.target.value);
            }}
          />
          <Mail className="text-bold size-4 absolute top-[15px] left-6" />
        </div>

        <button
          type="submit"
          className="bg-bold bg-blue-600 text-white font-medium flex items-center justify-center text-[12px] h-[80%] absolute top-1 right-2 px-5 rounded-3xl cursor-pointer hover:bg-blue-700 transition"
        >
          Subscribe
        </button>
      </form>

      {emailError && (
        <p className="text-red-500 text-xs mt-1 pl-2">{emailError}</p>
      )}
      <MessageDisplay message={message} />
    </div>
  );
};

const MessageDisplay = ({
  message,
}: {
  message: { text: string; type: "success" | "error" } | null;
}) =>
  message && (
    <div
      className={`mt-2 ${
        message.type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white p-2 rounded-md text-sm`}
    >
      {message.text}
    </div>
  );

export default GetMail;
