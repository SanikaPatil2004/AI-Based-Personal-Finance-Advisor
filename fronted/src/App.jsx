// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./components/HomePage";
// import Login from "./components/login";
// import Register from "./components/Register";
// import Dashboard from "./components/Dashboard";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </Router>
//     // <Dashboard />
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "./components/Dashboard";
// import Expenses from "./components/Expenses";
// import Incomes from "./components/Incomes";
// import Analysis from "./components/Analysis";
// import Reports from "./components/Reports";
// import Settings from "./components/Settings";

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Dashboard as the parent route */}
//         <Route path="/" element={<Dashboard />}>
//           <Route path="expenses" element={<Expenses />} />
//           <Route path="incomes" element={<Incomes />} />
//           <Route path="analysis" element={<Analysis />} />
//           <Route path="reports" element={<Reports />} />
//           <Route path="settings" element={<Settings />} />
//           {/* Default content when visiting / */}
//           <Route index element={<h1 className="text-2xl font-semibold">Welcome to your finance dashboard!</h1>} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./components/HomePage";
// import Login from "./components/login";
// import Register from "./components/Register";
// import Dashboard from "./components/Dashboard";
// import Expenses from "./components/Expenses";
// import Incomes from "./components/Incomes";
// import Analysis from "./components/Analysis";
// import Reports from "./components/Reports";
// import Settings from "./components/Settings";

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Protected Routes - Dashboard & Children */}
//         <Route path="/dashboard" element={<Dashboard />}>
//           {/* <Route index element={<h1 className="text-2xl font-semibold">Welcome to your finance dashboard!</h1>} /> */}
//           <Route path="expenses" element={<Expenses />} />
//           <Route path="incomes" element={<Incomes />} />
//           <Route path="analysis" element={<Analysis />} />
//           <Route path="reports" element={<Reports />} />
//           <Route path="settings" element={<Settings />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}
