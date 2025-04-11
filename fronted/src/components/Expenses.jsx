// import { useState, useEffect, useRef } from "react";
// import { X, Plus, Calendar, CheckCircle, Download } from "lucide-react";
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import * as XLSX from "xlsx";

// export default function Expenses() {
//   const [showModal, setShowModal] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [title, setTitle] = useState("");
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("");
//   const [date, setDate] = useState("");
//   const [expenses, setExpenses] = useState([]);
//   const modalRef = useRef(null);
//   const dateInputRef = useRef(null);

//   const userEmail = localStorage.getItem("userEmail");

//   const categories = [
//     { name: "Hotel", icon: "🏨" },
//     { name: "Subscription", icon: "📅" },
//     { name: "Bills", icon: "🧾" },
//     { name: "Tickets", icon: "🎟️" },
//     { name: "Fees", icon: "🏫" },
//     { name: "Travelling", icon: "✈️" },
//     { name: "Movie", icon: "🎬" },
//     { name: "Shopping", icon: "🛍️" },
//     { name: "Loan", icon: "💰" },
//     { name: "Electricity Bill", icon: "🔌" },
//   ];

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/expenses?userEmail=${userEmail}`);
//         const data = await response.json();
//         if (response.ok) {
//           setExpenses(data);
//         } else {
//           console.error("Failed to fetch expenses:", data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching expenses:", error);
//       }
//     };

//     if (userEmail) {
//       fetchExpenses();
//     }
//   }, [userEmail]);

//   const recentExpenses = expenses.slice(-10);

//   const expensesByDate = recentExpenses.reduce((acc, expense) => {
//     const dateKey = new Date(expense.date).toISOString().split("T")[0];
//     acc[dateKey] = (acc[dateKey] || 0) + Number(expense.amount);
//     return acc;
//   }, {});

//   const chartData = Object.entries(expensesByDate)
//     .map(([date, amount]) => ({ date, amount }))
//     .sort((a, b) => new Date(a.date) - new Date(b.date));

//   const handleAddExpense = async () => {
//     if (!title || !amount || !category || !date) {
//       alert("Please fill all fields.");
//       return;
//     }

//     if (!userEmail) {
//       alert("User not logged in.");
//       return;
//     }

//     const confirmation = window.confirm("Are you sure you want to add this expense?");
//     if (!confirmation) return;

//     const expenseData = { title, amount: Number(amount), category, date, userEmail };

//     try {
//       const response = await fetch("http://localhost:5000/api/expenses", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(expenseData),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setShowModal(false);
//         setShowSuccess(true);
//         setTimeout(() => setShowSuccess(false), 2000);
//         setTitle("");
//         setAmount("");
//         setCategory("");
//         setDate("");
//         setExpenses([...expenses, expenseData]);
//       } else {
//         alert(data.message || "Failed to add expense");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Error connecting to server");
//     }
//   };

//   const handleDownloadExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(expenses);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
//     XLSX.writeFile(workbook, "Expenses.xlsx");
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (modalRef.current && !modalRef.current.contains(event.target)) {
//         setShowModal(false);
//       }
//     };

//     if (showModal) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showModal]);

//   return (
//     <div className="p-6 relative">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-semibold">Expenses</h1>
//         <button
//           onClick={() => setShowModal(true)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 transition"
//         >
//           <Plus size={20} /> Add Expense
//         </button>
//       </div>

//       {showSuccess && (
//         <div className="fixed top-10 right-10 bg-green-500 text-white p-3 rounded-md flex items-center gap-2">
//           <CheckCircle size={20} />
//           Expense added successfully!
//         </div>
//       )}

//       <div className="mt-6">
//         <h2 className="text-lg font-semibold">Recent Expenses</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
//             <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey="amount" stroke="#FF5733" strokeWidth={2} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       <button
//         onClick={handleDownloadExcel}
//         className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md flex items-center gap-2 hover:bg-green-700 transition"
//       >
//         <Download size={20} /> Download 
//       </button>

//       <div className="mt-6">
//         <h2 className="text-lg font-semibold">All Expenses</h2>
//         <div className="grid grid-cols-2 gap-6 mt-4">
//           {expenses.map((expense, index) => {
//             const categoryObj = categories.find(cat => cat.name === expense.category);
//             return (
//               <div key={index} className="p-4 border rounded-md bg-white shadow flex justify-between">
//                 <p className="text-md font-bold text-black">
//                   {categoryObj?.icon} {expense.category}
//                 </p>
//                 <h3 className="text-lg font-medium text-red-600">₹{expense.amount} 📉</h3>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//           <div ref={modalRef} className="bg-white p-6 rounded-lg w-96 shadow-xl">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-semibold">Add Expense</h2>
//               <X className="cursor-pointer" onClick={() => setShowModal(false)} />
//             </div>

            // <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 mt-3 border rounded-md text-black">
            //   <option value="">Select Category</option>
            //   {categories.map((cat) => (
            //     <option key={cat.name} value={cat.name}>
            //       {cat.icon} {cat.name}
            //     </option>
            //   ))}
            // </select>

//             <button onClick={handleAddExpense} className="w-full mt-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">
//               Add Expense
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect, useRef } from "react";
import { X, Plus, Calendar, CheckCircle, Download } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import * as XLSX from "xlsx";

export default function Expenses() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const modalRef = useRef(null);

  const userEmail = localStorage.getItem("userEmail");

  const categories = [
    { name: "Hotel", icon: "🏨" },
    { name: "Subscription", icon: "📅" },
    { name: "Bills", icon: "🧾" },
    { name: "Tickets", icon: "🎟️" },
    { name: "Fees", icon: "🏫" },
    { name: "Travelling", icon: "✈️" },
    { name: "Movie", icon: "🎬" },
    { name: "Shopping", icon: "🛍️" },
    { name: "Loan", icon: "💰" },
    { name: "Electricity Bill", icon: "🔌" },
    {name:"Grocerry",icon:"🛒"},
  ];

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/expenses?userEmail=${userEmail}`);
        const data = await response.json();
        if (response.ok) {
          const sortedExpenses = data.sort((a, b) => new Date(b.date) - new Date(a.date));
          const latestDates = [...new Set(sortedExpenses.map(exp => new Date(exp.date).toISOString().split("T")[0]))].slice(0, 10);
          setExpenses(sortedExpenses.filter(exp => latestDates.includes(new Date(exp.date).toISOString().split("T")[0])));
        } else {
          console.error("Failed to fetch expenses:", data.message);
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    if (userEmail) {
      fetchExpenses();
    }
  }, [userEmail]);

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

  const expensesByDate = expenses.reduce((acc, expense) => {
    const dateKey = new Date(expense.date).toISOString().split("T")[0];
    acc[dateKey] = (acc[dateKey] || 0) + Number(expense.amount);
    return acc;
  }, {});

  const chartData = Object.entries(expensesByDate)
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleAddExpense = async () => {
    if (!title || !amount || !category || !date) {
      alert("Please fill all fields.");
      return;
    }

    if (!userEmail) {
      alert("User not logged in.");
      return;
    }

    const confirmation = window.confirm("Are you sure you want to add this expense?");
    if (!confirmation) return;

    const expenseData = { title, amount: Number(amount), category, date, userEmail };

    try {
      const response = await fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseData),
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
        setExpenses([...expenses, expenseData]);
      } else {
        alert(data.message || "Failed to add expense");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to server");
    }
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(expenses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "Expenses.xlsx");
  };

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Expenses</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus size={20} /> Add Expense
        </button>
      </div>

      {showSuccess && (
        <div className="fixed top-10 right-10 bg-green-500 text-white p-3 rounded-md flex items-center gap-2">
          <CheckCircle size={20} />
          Expense added successfully!
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Recent Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
            <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#FF5733" strokeWidth={2} />
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
        <h2 className="text-lg font-semibold">All Expenses</h2>
        <div className="grid grid-cols-2 gap-6 mt-4">
          {expenses.map((expense, index) => {
            const categoryObj = categories.find(cat => cat.name === expense.category);
            return (
              <div key={index} className="p-4 border rounded-md bg-white shadow flex justify-between">
                <p className="text-md font-bold text-black">
                  {categoryObj?.icon} {expense.category}
                </p>
                <h3 className="text-lg font-medium text-red-600">₹{expense.amount} 📉</h3>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div ref={modalRef} className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-black">Add Expense</h2>
              <X className="cursor-pointer" onClick={() => setShowModal(false)} />
            </div>

            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 mt-3 border rounded-md text-black" />
            <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" className="w-full p-2 mt-3 border rounded-md text-black" />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 mt-3 border rounded-md text-black" />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 mt-3 border rounded-md text-black">
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
            <button onClick={handleAddExpense} className="w-full mt-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">
              Add Expense
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

