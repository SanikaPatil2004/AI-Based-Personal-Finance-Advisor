import { useState, useRef, useEffect } from "react";
import { X, Plus, Calendar, CheckCircle, Download } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import * as XLSX from "xlsx";

export default function Income() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [incomes, setIncomes] = useState([]);
  const modalRef = useRef(null);

  const email = localStorage.getItem("userEmail");

  const categories = [
    { name: "Salary", icon: "💰" },
    { name: "Rent", icon: "🏠" },
    { name: "Interest from Savings", icon: "🏦" },
    { name: "Stock Market", icon: "📈" },
    { name: "YouTube Revenue", icon: "🎥" },
    { name: "Freelancing", icon: "💼" },
  ];

  const fetchIncomes = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/incomes?email=${email}&limit=10&sort=-date`);
      const data = await response.json();
      if (response.ok) {
        setIncomes(data);
      } else {
        alert(data.message || "Failed to fetch incomes");
      }
    } catch (error) {
      console.error("Error fetching incomes:", error);
      alert("Error connecting to server");
    }
  };

  const handleAddIncome = async () => {
    if (!title || !amount || !category || !date) {
      alert("Please fill all fields.");
      return;
    }

    const incomeData = { title, amount: Number(amount), category, date, email };

    try {
      const response = await fetch("http://localhost:5000/api/incomes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(incomeData),
      });

      const data = await response.json();
      if (response.ok) {
        setShowModal(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
        setTitle("");
        setAmount("");
        setCategory("");
        setDate("");
        fetchIncomes();
      } else {
        alert(data.message || "Failed to add income");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to server");
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(incomes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Income");
    XLSX.writeFile(workbook, "Income.xlsx");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Income</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus size={20} /> Add Income
        </button>
      </div>

      {showSuccess && (
        <div className="fixed top-10 right-10 bg-green-500 text-white p-3 rounded-md flex items-center gap-2">
          <CheckCircle size={20} />
          Income added successfully!
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Income Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={incomes} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
            <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#28a745" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <button
        onClick={handleDownloadExcel}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md flex items-center gap-2 hover:bg-green-700 transition"
      >
        <Download size={20} /> Download 
      </button>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Income Sources</h2>
        <div className="grid grid-cols-2 gap-6 mt-4">
          {incomes.map((income, index) => {
            const categoryObj = categories.find(cat => cat.name === income.category);
            return (
              <div key={index} className="p-4 border rounded-md bg-white shadow flex justify-between">
                <p className="text-md font-bold text-black">
                  {categoryObj?.icon} {income.category}
                </p>
                <h3 className="text-lg font-medium text-green-600">₹{income.amount} 📈</h3>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div ref={modalRef} className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Add Income</h2>
              <X className="cursor-pointer" onClick={() => setShowModal(false)} />
            </div>

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mt-3 border rounded-md text-black"
            />

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 mt-3 border rounded-md text-black"
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 mt-3 border rounded-md text-black"
            />

            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 mt-3 border rounded-md text-black">
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>

            <button onClick={handleAddIncome} className="w-full mt-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">
              Add Income
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


