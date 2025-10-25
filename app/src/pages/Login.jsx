import React, { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../assets/IMG-20250915-WA0031.jpg";
import img2 from "../assets/IMG-20250915-WA0053.jpg";
import img3 from "../assets/IMG-20250915-WA0045.jpg";

const images = [img1, img2, img3];

export default function Login() {
  const [index, setIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔄 Auto change background images
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 🧠 Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        navigate("/dashboard"); // ✅ redirect after success (change route as per your app)
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to connect to the server");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1b2e] text-white">
      <div className="flex w-[900px] rounded-2xl overflow-hidden shadow-2xl bg-[#2a2545]">
        {/* Left Carousel */}
        <div className="w-1/2 relative h-[600px] overflow-hidden">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`slide-${i}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                i === index ? "opacity-100" : "opacity-0"
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
              <p className="text-lg">Welcome Back,</p>
              <p className="text-lg">Let's Capture New Moments</p>
              <div className="flex gap-1 mt-3">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all ${
                      i === index ? "w-8 bg-white" : "w-3 bg-white/40"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Login Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Log in to your account</h2>
          <p className="text-sm mb-6">
            Don't have an account?{" "}
            <Link to="/" className="text-purple-400 hover:underline">
              Sign up
            </Link>
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 rounded-md bg-[#372f5a] border border-transparent focus:border-purple-400 outline-none"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-3 rounded-md bg-[#372f5a] border border-transparent focus:border-purple-400 outline-none"
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="flex justify-between items-center text-sm mt-1">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-purple-500" />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-purple-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-md font-semibold transition"
            >
              Log in
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-600"></div>
            <p className="mx-4 text-sm text-gray-400">Or continue with</p>
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
