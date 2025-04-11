import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.post("http://localhost:5000/logout");
        localStorage.removeItem("userEmail"); // Remove stored user data
        navigate("/"); // Redirect to HomePage after logout
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <p className="text-lg font-semibold">Logging out...</p>
    </div>
  );
}
