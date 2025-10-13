import React from "react";
import { FaGoogle, FaApple } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/IMG-20250915-WA0031.jpg";
import img2 from "../assets/IMG-20250915-WA0053.jpg";
import img3 from "../assets/IMG-20250915-WA0045.jpg";

const images = [img1, img2, img3];


export default function Signup() {
  const [index, setIndex] = useState(0);

  // auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1b2e] text-white">
      <div className="flex w-[900px] rounded-2xl overflow-hidden shadow-2xl bg-[#2a2545]">
        {/* Left side image */}
        <div className="w-1/2 relative h-[600px] overflow-hidden">
        {images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt={`slide-${i}`}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"
                                }`}
                        />
                    ))}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-6">
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold">JoyJunction</h1>
              <button className="bg-white bg-opacity-20 hover:bg-opacity-40 text-sm px-3 py-1 rounded-full transition">
                Back to website →
              </button>
            </div>
            <div className="pb-10">
              <p className="text-lg">Creating Memories</p>
              {/* Dots indicator */}
              <div className="flex gap-1 mt-3">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all ${i === index ? "w-8 bg-white" : "w-3 bg-white/40"
                      }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Create an account</h2>
          <p className="text-sm mb-6">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 hover:underline">
              Log in
            </Link>
          </p>


          <form className="flex flex-col gap-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="First name"
                className="w-1/2 p-3 rounded-md bg-[#372f5a] border border-transparent focus:border-purple-400 outline-none"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-1/2 p-3 rounded-md bg-[#372f5a] border border-transparent focus:border-purple-400 outline-none"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded-md bg-[#372f5a] border border-transparent focus:border-purple-400 outline-none"
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="p-3 rounded-md bg-[#372f5a] border border-transparent focus:border-purple-400 outline-none"
            />

            <div className="flex items-center gap-2 text-sm">
              <input type="checkbox" id="terms" className="accent-purple-500" />
              <label htmlFor="terms">
                I agree to the{" "}
                <a href="#" className="text-purple-400 hover:underline">
                  Terms & Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="mt-2 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-md font-semibold transition"
            >
              Create account
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-600"></div>
            <p className="mx-4 text-sm text-gray-400">Or register with</p>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center justify-center gap-2 border border-gray-500 hover:border-white rounded-md py-2 w-full transition">
              <FaGoogle /> Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
