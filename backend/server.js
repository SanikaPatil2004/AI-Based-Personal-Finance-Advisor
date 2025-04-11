const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();

const app = express();

// ✅ Session Configuration
app.use(
  session({
    secret:
      process.env.SESSION_SECRET ||
      "44de3f491d36b768d3fb147bf541e5eca5eab633a3eb5cee78ede21124f641b83162fa69218015fec253d95a5e9b1e00406c11b2239bae53043e0525725dd6d7",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, sameSite: "lax" },
  })
);

// ✅ CORS Configuration
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(bodyParser.json());

// ✅ Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/finai_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Define User Schema & Model
const UserSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true, required: true },
  password: String, // No hashing as per your request
});

const User = mongoose.model("User", UserSchema);

// ✅ Register Route
app.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ fullName, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    req.session.user = { id: user._id, email: user.email };
    res.status(200).json({ message: "Login successful", user: req.session.user });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Logout Route
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
});

// ✅ Check Authentication Status
app.get("/auth-status", (req, res) => {
  if (req.session.user) {
    res.json({ authenticated: true, user: req.session.user });
  } else {
    res.json({ authenticated: false });
  }
});

// // ✅ Expense Schema
// const expenseSchema = new mongoose.Schema({
//   title: String,
//   amount: Number,
//   category: String,
//   date: String,
//   userEmail: String,
// });

// const Expense = mongoose.model("Expense", expenseSchema);

// // ✅ Add Expense
// app.post("/api/expenses", async (req, res) => {
//   try {
//     const { title, amount, category, date, userEmail } = req.body;

//     if (!title || !amount || !category || !date || !userEmail) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const newExpense = new Expense({ title, amount, category, date, userEmail });
//     await newExpense.save();

//     res.status(201).json({ message: "Expense added successfully!" });
//   } catch (error) {
//     console.error("❌ Error adding expense:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // ✅ Fetch Expenses for User
// app.get("/api/expenses", async (req, res) => {
//   const { email } = req.query;
//   const expenses = await Expense.find({ userEmail: email });
//   res.json(expenses);
// });

// Expense Schema
const ExpenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  category: String,
  date: String, // Stored as "YYYY-MM-DD"
  userEmail: String,
});

const Expense = mongoose.model("Expense", ExpenseSchema);

// ✅ Add Expense API
app.post("/api/expenses", async (req, res) => {
  try {
    const { title, amount, category, date, userEmail } = req.body;

    if (!title || !amount || !category || !date || !userEmail) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Expense({ title, amount, category, date, userEmail });
    await newExpense.save();

    res.status(201).json({ message: "Expense added successfully!" });
  } catch (error) {
    console.error("❌ Error adding expense:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Fetch Expenses API
app.get("/api/expenses", async (req, res) => {
  const { userEmail } = req.query; // ✅ Fix: Using `userEmail` correctly
  if (!userEmail) return res.status(400).json({ message: "User email is required" });

  try {
    const expenses = await Expense.find({ userEmail });
    res.json(expenses);
  } catch (error) {
    console.error("❌ Error fetching expenses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Income Schema
const IncomeSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  category: String,
  date: String,
  email: String,
});

const Income = mongoose.model("Income", IncomeSchema);

// ✅ Add Income
app.post("/api/incomes", async (req, res) => {
  try {
    const { title, amount, category, date, email } = req.body;

    if (!title || !amount || !category || !date || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIncome = new Income({ title, amount, category, date, email });
    await newIncome.save();

    res.status(201).json({ message: "Income added successfully!" });
  } catch (error) {
    console.error("❌ Error adding income:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Fetch Incomes for User
app.get("/api/incomes", async (req, res) => {
  const { email } = req.query;
  const incomes = await Income.find({ email });
  res.json(incomes);
});

// ✅ Dashboard Analytics Route
app.get("/api/user-data", async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const expenses = await Expense.find({ userEmail: email });
    const incomes = await Income.find({ email });

    const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const balance = totalIncome - totalExpenses;

    const expenseCategories = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});
    
    const spendingCategories = Object.entries(expenseCategories).map(([category, value]) => ({
      category,
      transactions: expenses.filter(exp => exp.category === category).length,
      amount: value
    }));
    
    app.get("/api/user-data", async (req, res) => {
      const userEmail = req.query.email;
      if (!userEmail) return res.status(400).json({ error: "Missing email" });
    
      try {
        const expenses = await Expense.find({ userEmail });
        const incomes = await Income.find({ userEmail });
    
        // Calculate total income & expenses
        const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
        const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
        const totalBalance = totalIncome - totalExpenses;
    
        // Format data for graphs
        const incomeExpenseData = [
          { month: "April", income: totalIncome, expenses: totalExpenses }
        ];
    
        const expenseBreakdown = expenses.reduce((acc, expense) => {
          const existing = acc.find(e => e.category === expense.category);
          if (existing) {
            existing.value += expense.amount;
          } else {
            acc.push({ category: expense.category, value: expense.amount });
          }
          return acc;
        }, []);
    
        res.json({
          totalBalance,
          monthlyIncome: totalIncome,
          monthlyExpenses: totalExpenses,
          incomeExpenseData,
          expenseBreakdown
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Server error" });
      }
    });

    res.json({
      totalBalance: balance,
      monthlyIncome: totalIncome,
      monthlyExpenses: totalExpenses,
      spendingCategories,
    });
  } catch (error) {
    console.error("❌ Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.use((err, req, res, next) => {
  console.error("🔥 Unhandled Error:", err);
  res.status(500).json({ error: "Something went wrong", details: err.message });
});


// ✅ Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
