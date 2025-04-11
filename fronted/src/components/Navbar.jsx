import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-black bg-opacity-40 text-white">
      {/* Left Side - Brand Name (Navigates to HomePage) */}
      <Link to="/" className="text-2xl font-bold">FinAI Advisor</Link>

      {/* Right Side - Menu */}
      <div className="space-x-6">
        <Link to="/" className="px-4 py-2">Home</Link>
        <Link to="/about" className="px-4 py-2">About Us</Link>
        <Link to="/features" className="px-4 py-2">Features</Link>
        {/* <Link to="/login" className="px-4 py-2 bg-blue-500 rounded-lg">Login</Link>
        <Link to="/register" className="px-4 py-2 bg-purple-600 rounded-lg">Register</Link> */}
      </div>
    </nav>
  );
}
