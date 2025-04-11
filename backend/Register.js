import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration Successful!");
        setFormData({ fullName: "", mobile: "", email: "", password: "", confirmPassword: "" });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" name="fullName"
            placeholder="Full Name"
            value={formData.fullName} onChange={handleChange}
            className="w-full px-4 py-2 mb-3 bg-gray-700 text-white placeholder-gray-400 rounded" required 
          />
          <input 
            type="text" name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile} onChange={handleChange}
            className="w-full px-4 py-2 mb-3 bg-gray-700 text-white placeholder-gray-400 rounded" required 
          />
          <input 
            type="email" name="email"
            placeholder="Email"
            value={formData.email} onChange={handleChange}
            className="w-full px-4 py-2 mb-3 bg-gray-700 text-white placeholder-gray-400 rounded" required 
          />
          <input 
            type="password" name="password"
            placeholder="Password"
            value={formData.password} onChange={handleChange}
            className="w-full px-4 py-2 mb-3 bg-gray-700 text-white placeholder-gray-400 rounded" required 
          />
          <input 
            type="password" name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword} onChange={handleChange}
            className="w-full px-4 py-2 mb-3 bg-gray-700 text-white placeholder-gray-400 rounded" required 
          />
          <button type="submit" className="w-full px-4 py-2 bg-purple-600 rounded-lg">Register</button>
        </form>
        <p className="mt-4 text-sm">
          Already have an account? <Link to="/login" className="text-blue-400 underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
