import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Import the Navbar component

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:5000/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      // ✅ Store user email in localStorage
      localStorage.setItem("userEmail", data.user.email);

      // ✅ Redirect to dashboard
      navigate("/dashboard"); 

    } catch (error) {
      console.error("Login Error:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#121826] text-white">
          
          {/* Navbar at the top */}
          <Navbar />
    
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        {error && (
          <div className="bg-red-500 text-white p-2 rounded mb-3 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-3 bg-gray-700 text-white placeholder-gray-400 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-3 bg-gray-700 text-white placeholder-gray-400 rounded"
            required
          />
          <button type="submit" className="w-full px-4 py-2 bg-purple-600 rounded-lg">
            Login
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}
