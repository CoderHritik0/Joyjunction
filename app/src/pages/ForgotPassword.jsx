import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {

 

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1b2e] text-white">
      <div className="flex w-[500px] rounded-2xl overflow-hidden shadow-2xl bg-[#2a2545]">
       
        {/* Right side form */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Reset your password</h2>
          <p className="text-sm mb-6 text-gray-300">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-md bg-[#372f5a] border border-transparent focus:border-purple-400 outline-none"
            />

            <button
              type="submit"
              className="mt-2 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-md font-semibold transition"
            >
              Send reset link
            </button>
          </form>

          <div className="text-sm mt-6 text-center">
            <Link to="/login" className="text-purple-400 hover:underline">
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
