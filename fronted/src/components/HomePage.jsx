// export default function HomePage() {
//     return (
//       <div className="bg-gradient-to-r from-purple-900 to-blue-900 min-h-screen text-white">
//         {/* Navbar */}
//         <nav className="flex justify-between items-center px-10 py-4 bg-black bg-opacity-40">
//           <h1 className="text-2xl font-bold">FinAI Advisor</h1>
//           <div>
//             <a href="#" className="px-4 py-2 text-white">Home</a>
//             <a href="#" className="px-4 py-2 text-white">Features</a>
//             <a href="#" className="px-4 py-2 text-white">How It Works</a>
//             <button className="ml-4 px-4 py-2 bg-blue-500 rounded-lg">Login</button>
//             <button className="ml-2 px-4 py-2 bg-purple-600 rounded-lg">Register</button>
//           </div>
//         </nav>
        
//         {/* Hero Section */}
//         <div className="flex flex-col lg:flex-row items-center justify-between px-10 py-20">
//           <div className="max-w-xl">
//             <h2 className="text-4xl font-bold leading-tight">
//               Optimize Your <span className="text-yellow-400">Finances</span> with AI-Driven Insights
//             </h2>
//             <p className="mt-4 text-gray-300">
//               Our AI-powered platform helps you track expenses, analyze spending habits, and make smarter financial decisions.
//             </p>
//             <div className="mt-6">
//               <button className="px-6 py-3 bg-blue-600 rounded-lg mr-4">Get Started</button>
//               <button className="px-6 py-3 bg-gray-800 border border-gray-500 rounded-lg">Learn More</button>
//             </div>
//             <div className="mt-6 flex items-center space-x-3 text-sm text-gray-400">
//               <span>🔒 Secure & Private Data</span>
//               <span>✅ Trusted by Users</span>
//             </div>
//           </div>
//           <div className="mt-10 lg:mt-0">
//           <img src="/assets/logo.png" alt="Finance Dashboard" width={500} height={300} className="rounded-lg shadow-lg" />
//           </div>
//         </div>
//       </div>
//     );
//   }
  
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-r from-purple-900 to-blue-900 min-h-screen text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 bg-black bg-opacity-40">
        <h1 className="text-2xl font-bold">FinAI Advisor</h1>
        <div>
          <a href="#" className="px-4 py-2 text-white">Home</a>
          <a href="#" className="px-4 py-2 text-white">Features</a>
          <a href="#" className="px-4 py-2 text-white">About us</a>
          <Link to="/login" className="ml-4 px-4 py-2 bg-blue-500 rounded-lg">
            Login
          </Link>
          <Link to="/register" className="ml-2 px-4 py-2 bg-purple-600 rounded-lg">
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-10 py-20">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold leading-tight">
            Optimize Your <span className="text-yellow-400">Finances</span> with AI-Driven Insights
          </h2>
          <p className="mt-4 text-gray-300">
            Our AI-powered platform helps you track expenses, analyze spending habits, and make smarter financial decisions.
          </p>
          <div className="mt-6">
            <button className="px-6 py-3 bg-blue-600 rounded-lg mr-4">Get Started</button>
            <button className="px-6 py-3 bg-gray-800 border border-gray-500 rounded-lg">Learn More</button>
          </div>
          <div className="mt-6 flex items-center space-x-3 text-sm text-gray-400">
            <span>🔒 Secure & Private Data</span>
            <span>✅ Trusted by Users</span>
          </div>
        </div>
        <div className="mt-10 lg:mt-0">
          <img src="/assets/logo.png" alt="Finance Dashboard" width={500} height={300} className="rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
}
