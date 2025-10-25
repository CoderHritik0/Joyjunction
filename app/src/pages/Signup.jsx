import React, { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../assets/IMG-20250915-WA0031.jpg";
import img2 from "../assets/IMG-20250915-WA0053.jpg";
import img3 from "../assets/IMG-20250915-WA0045.jpg";

const images = [img1, img2, img3];

export default function Signup() {
  const [index, setIndex] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          // optional: include password if your backend handles it
          password: password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to register");

      alert("User registered successfully!");
      navigate("/login"); // redirect to login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
              <p className="text-lg">Creating Memories</p>
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

        {/* Right side form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Create an account</h2>
          <p className="text-sm mb-6">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 hover:underline">
              Log in
            </Link>
          </p>

          {error && <p className="text-red-400 mb-2">{error}</p>}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-1/2 p-3 rounded-md bg-[#372f5a] border border-transparent focus:border-purple-400 outline-none"
              />
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-1/2 p-3 rounded-md bg-[#372f5a] border border-transparent focus:border-purple-400 outline-none"
              />
            </div>
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

            <div className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                id="terms"
                className="accent-purple-500"
                required
              />
              <label htmlFor="terms">
                I agree to the{" "}
                <a href="#" className="text-purple-400 hover:underline">
                  Terms & Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-md font-semibold transition"
            >
              {loading ? "Creating..." : "Create account"}
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
