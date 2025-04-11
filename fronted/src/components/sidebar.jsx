import { useState, useEffect } from "react";
import { Sun, Moon, Layout, DollarSign, BarChart2, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ setActiveView }) {
  const [darkMode, setDarkMode] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  return (
    <div className={`h-screen p-5 w-64 flex flex-col ${darkMode ? "bg-gray-900 text-white" : "bg-[#1D1B41] text-gray-200"}`}>
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <img src="https://via.placeholder.com/80" alt="Profile" className="w-20 h-20 rounded-full border-2 border-gray-400" />
        <h2 className="mt-3 text-sm font-medium">{userEmail || "User Email"}</h2>
      </div>

      {/* Menu Items */}
      <nav className="flex-1">
        <button className="flex items-center gap-3 p-3 my-2 w-full text-left rounded-md hover:bg-[#2A285A]"
          onClick={() => setActiveView("dashboard")}>
          <Layout size={20} />
          <span>Dashboard</span>
        </button>

        <button className="flex items-center gap-3 p-3 my-2 w-full text-left rounded-md hover:bg-[#2A285A]"
          onClick={() => setActiveView("expenses")}>
          <DollarSign size={20} />
          <span>Expenses</span>
        </button>

        <button className="flex items-center gap-3 p-3 my-2 w-full text-left rounded-md hover:bg-[#2A285A]"
          onClick={() => setActiveView("incomes")}>
          <DollarSign size={20} />
          <span>Incomes</span>
        </button>

        {/* <button className="flex items-center gap-3 p-3 my-2 w-full text-left rounded-md hover:bg-[#2A285A]"
          onClick={() => setActiveView("settings")}>
          <Settings size={20} />
          <span>Settings</span>
        </button> */}

        {/* Logout Button with Correct Icon */}
        <button 
          className="flex items-center gap-3 p-3 my-2 w-full text-left rounded-md hover:bg-red-600"
          onClick={() => navigate("/logout")}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>

      {/* Toggle Mode */}
      <button onClick={() => setDarkMode(!darkMode)}
        className="flex items-center gap-3 p-3 mt-4 rounded-md cursor-pointer hover:bg-[#2A285A] transition">
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        <span>Toggle Mode</span>
      </button>
    </div>
  );
}
