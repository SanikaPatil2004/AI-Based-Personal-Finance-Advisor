// import { useEffect, useState } from "react";
// import Navbar from "./Navbar"; // Import Navbar
// import Sidebar from "./Sidebar";
// import axios from "axios";
// import Expenses from "./Expenses";
// import Incomes from "./Incomes";
// import { LogOut } from "lucide-react";
// import {
//   PieChart, Pie, Cell, Legend, ResponsiveContainer
// } from "recharts";

// export default function Dashboard() {
//   const [userEmail, setUserEmail] = useState("");
//   const [userData, setUserData] = useState({
//     name: "",
//     totalBalance: 0,
//     monthlyIncome: 0,
//     monthlyExpenses: 0,
//   });
//   const [activeView, setActiveView] = useState("dashboard");
//   const [suggestion, setSuggestion] = useState("");
//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("theme") === "dark"
//   );

//   useEffect(() => {
//     const storedEmail = localStorage.getItem("userEmail");
//     if (!storedEmail) return;

//     setUserEmail(storedEmail);

//     axios.get(`http://localhost:5000/api/user-data?email=${storedEmail}`)
//       .then(response => {
//         console.log("Fetched User Data:", response.data);
//         setUserData(response.data || {});
//       })
//       .catch(error => {
//         console.error("Error fetching user data:", error);
//         setUserData({ 
//           name: "User",
//           totalBalance: 0, 
//           monthlyIncome: 0, 
//           monthlyExpenses: 0,
//         });
//       });

//   }, []);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [darkMode]);

//   // Pie Chart Data (Savings, Income, Expenses)
//   const financialData = [
//     { name: "Savings", value: userData.totalBalance, color: "#4CAF50" },
//     { name: "Income", value: userData.monthlyIncome, color: "#2196F3" },
//     { name: "Expenses", value: userData.monthlyExpenses, color: "#FF5722" },
//   ];

//   // Handle Financial Suggestion
//   const getFinancialSuggestion = () => {
//     if (userData.totalBalance < 0) {
//       setSuggestion("Your savings are negative! Try reducing expenses, budgeting better, or finding extra sources of income.");
//     } else if (userData.totalBalance > 0) {
//       setSuggestion("Great! Consider investing in stocks, mutual funds, or setting up an emergency fund.");
//     } else {
//       setSuggestion("You're breaking even! Make sure to save a portion of your income for future stability.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-[#121826] text-white">

      
//       {/* Navbar at the top */}
//       <Navbar />

//       <div className="flex flex-1">
//         <Sidebar setActiveView={setActiveView} />

//         <div className="flex-1 p-6">
//           <h1 className="text-2xl font-bold mb-4">👋 Welcome, {userData.name || "User"}!</h1>

//           {activeView === "dashboard" && userData && (
//             <div className="grid grid-cols-2 gap-6">
              
//               {/* Overview Section */}
//               <div className="bg-[#1D2231] p-6 rounded-lg shadow-lg col-span-2">
//                 <h2 className="text-lg font-semibold mb-3">Overview</h2>
//                 <div className="grid grid-cols-3 gap-4">
//                   <div className="bg-[#2A3145] p-4 rounded-lg">
//                     <p className="text-sm">Total Balance (Savings)</p>
//                     <p className="text-xl font-bold">${userData.totalBalance ?? 0}</p>
//                   </div>
//                   <div className="bg-[#2A3145] p-4 rounded-lg">
//                     <p className="text-sm">Monthly Income</p>
//                     <p className="text-xl font-bold text-green-400">${userData.monthlyIncome ?? 0}</p>
//                   </div>
//                   <div className="bg-[#2A3145] p-4 rounded-lg">
//                     <p className="text-sm">Monthly Expenses</p>
//                     <p className="text-xl font-bold text-red-400">${userData.monthlyExpenses ?? 0}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Pie Chart & Finance Assistant */}
//               <div className="grid grid-cols-2 gap-6 col-span-2">
//                 <div className="bg-[#1D2231] p-6 rounded-lg shadow-lg">
//                   <h2 className="text-lg font-semibold mb-3">Financial Breakdown</h2>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <PieChart>
//                       <Pie 
//                         data={financialData} 
//                         cx="50%" 
//                         cy="50%" 
//                         innerRadius={60}  
//                         outerRadius={100} 
//                         dataKey="value"
//                         nameKey="name"
//                         label
//                       >
//                         {financialData.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                       </Pie>
//                       <Legend />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>

//                 {/* Finance Assistant Box */}
//                 <div className="bg-[#1D2231] p-6 rounded-lg shadow-lg flex flex-col items-center">
//                   <img 
//                     src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png" 
//                     alt="Finance Assistant" 
//                     className="w-24 h-24 rounded-full mb-3"
//                   />
//                   <h2 className="text-lg font-semibold mb-2">Finance Assistance</h2>
//                   <p className="text-sm text-gray-400 text-center mb-3">
//                     Need help managing finances? Set budgets, track spending, and save more! 💰
//                   </p>
//                   <button 
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
//                     onClick={getFinancialSuggestion}
//                   >
//                     Get Suggestion
//                   </button>
//                   {suggestion && (
//                     <p className="mt-3 text-sm text-gray-300 text-center">{suggestion}</p>
//                   )}
//                 </div>
//               </div>

//             </div>
//           )}

//           {activeView === "expenses" && <Expenses />}
//           {activeView === "incomes" && <Incomes />}
//           {activeView === "logout" && <LogOut />}
//         </div>
//       </div>
//     </div>
//   );  
// }
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import Expenses from "./Expenses";
import Incomes from "./Incomes";
import { LogOut } from "lucide-react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
  });
  const [activeView, setActiveView] = useState("dashboard");
  const [suggestion, setSuggestion] = useState("");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [chatboxOpen, setChatboxOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]); // Store chat messages
  const [chatInput, setChatInput] = useState(""); // Store user input

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (!storedEmail) return;

    setUserEmail(storedEmail);

    axios.get(`http://localhost:5000/api/user-data?email=${storedEmail}`)
      .then(response => {
        setUserData(response.data || {});
      })
      .catch(() => {
        setUserData({ 
          name: "User",
          totalBalance: 0, 
          monthlyIncome: 0, 
          monthlyExpenses: 0,
        });
      });

  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const financialData = [
    { name: "Savings", value: userData.totalBalance, color: "#4CAF50" },
    { name: "Income", value: userData.monthlyIncome, color: "#2196F3" },
    { name: "Expenses", value: userData.monthlyExpenses, color: "#FF5722" },
  ];

  const getFinancialSuggestion = () => {
    if (userData.totalBalance < 0) {
      setSuggestion("Your savings are negative! Try reducing expenses, budgeting better, or finding extra sources of income.");
    } else if (userData.totalBalance > 0) {
      setSuggestion("Great! Consider investing in stocks, mutual funds, or setting up an emergency fund.");
    } else {
      setSuggestion("You're breaking even! Make sure to save a portion of your income for future stability.");
    }
  };

  // Handle user message send
  const sendMessage = async () => {
    if (!chatInput.trim()) return;

    // Add user message to state
    const userMessage = { name: "User", message: chatInput };
    setChatMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      
      const response = await fetch("http://localhost:5001/predict", {
      // fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: JSON.stringify({ message: chatInput }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      const botMessage = { name: "Bot", message: data.answer };

      setChatMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
    }

    setChatInput(""); // Clear input field
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121826] text-white">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        <Sidebar setActiveView={setActiveView} />

        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">👋 Welcome, {userData.name || "User"}!</h1>

          {activeView === "dashboard" && userData && (
            <div className="grid grid-cols-2 gap-6">
              
              {/* Overview Section */}
              <div className="bg-[#1D2231] p-6 rounded-lg shadow-lg col-span-2">
                <h2 className="text-lg font-semibold mb-3">Overview</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#2A3145] p-4 rounded-lg">
                    <p className="text-sm">Total Balance (Savings)</p>
                    <p className="text-xl font-bold">${userData.totalBalance ?? 0}</p>
                  </div>
                  <div className="bg-[#2A3145] p-4 rounded-lg">
                    <p className="text-sm">Monthly Income</p>
                    <p className="text-xl font-bold text-green-400">${userData.monthlyIncome ?? 0}</p>
                  </div>
                  <div className="bg-[#2A3145] p-4 rounded-lg">
                    <p className="text-sm">Monthly Expenses</p>
                    <p className="text-xl font-bold text-red-400">${userData.monthlyExpenses ?? 0}</p>
                  </div>
                </div>
              </div>

              {/* Pie Chart & Finance Assistant */}
              <div className="grid grid-cols-2 gap-6 col-span-2">
                <div className="bg-[#1D2231] p-6 rounded-lg shadow-lg">
                  <h2 className="text-lg font-semibold mb-3">Financial Breakdown</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie 
                        data={financialData} 
                        cx="50%" 
                        cy="50%" 
                        innerRadius={60}  
                        outerRadius={100} 
                        dataKey="value"
                        nameKey="name"
                        label
                      >
                        {financialData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Finance Assistant Box */}
                <div className="bg-[#1D2231] p-6 rounded-lg shadow-lg flex flex-col items-center">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png" 
                    alt="Finance Assistant" 
                    className="w-24 h-24 rounded-full mb-3"
                  />
                  <h2 className="text-lg font-semibold mb-2">Finance Assistance</h2>
                  <p className="text-sm text-gray-400 text-center mb-3">
                    Need help managing finances? Set budgets, track spending, and save more! 💰
                  </p>
                  <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                    onClick={getFinancialSuggestion}
                  >
                    Get Suggestion
                  </button>
                  {suggestion && (
                    <p className="mt-3 text-sm text-gray-300 text-center">{suggestion}</p>
                  )}
                </div>
              </div>

            </div>
          )}

          {activeView === "expenses" && <Expenses />}
          {activeView === "incomes" && <Incomes />}
          {activeView === "logout" && <LogOut />}
        </div>
      </div>
    

      <div className="fixed bottom-4 right-4">
        <button 
          className="bg-blue-500 p-3 rounded-full shadow-lg" 
          onClick={() => setChatboxOpen(!chatboxOpen)}
        >
          💬
        </button>
      </div>

      Chatbox
      {chatboxOpen && (
        <div className="fixed bottom-16 right-4 bg-white text-black w-80 p-4 shadow-lg rounded-lg">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-bold">Chat Support</h4>
            <button onClick={() => setChatboxOpen(false)} className="text-red-500 font-bold">X</button>
          </div>
          <div className="h-40 overflow-y-auto border my-2 p-2">
            {chatMessages.map((msg, index) => (
              <p key={index} className={`p-2 my-1 rounded ${msg.name === "User" ? "bg-blue-200" : "bg-gray-200"}`}>
                <strong>{msg.name}:</strong> {msg.message}
              </p>
            ))}
          </div>
          <input 
            type="text" 
            placeholder="Write a message..." 
            className="w-full p-2 border rounded"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="w-full bg-blue-500 text-white p-2 mt-2 rounded" onClick={sendMessage}>
            Send
          </button>
        </div>
      )}
    </div>
  );
}

