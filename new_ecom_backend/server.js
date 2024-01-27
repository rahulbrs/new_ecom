const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt =require("jsonwebtoken");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

//  MongoDB Connection
mongoose.connect("mongodb://localhost:27017/ecomDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// UserSchema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
  });


  //ProductSchema
  const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
  });
  
  const User = mongoose.model("User", userSchema);
  const Product = mongoose.model("Product", productSchema);

  //JWT Secret Key
  const secretKey = "rahul";

  //verify JWT token
    const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization");
  
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

  //User Register
  app.post("/register", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
  
    try {
      const newUser = new User({ email, password });
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.error("Error registering user", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


  //User Login
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const accessToken = jwt.sign({ email: user.email }, secretKey);
      res.json({ accessToken });
    } catch (error) {
      console.error("Error logging in", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  //Admin Login
  app.post("/admin/login", async (req, res) => {
    const { email, password } = req.body;
  
    if (email === "admin@123" && password === "admin@123") {
      const accessToken = jwt.sign({ email }, secretKey);
      res.json({ accessToken });
    } else {
      res.status(401).json({ message: "Invalid admin credentials" });
    }
  });

  //Fetch Products
    app.get("/products", authenticateToken, (req, res) => {
    const products = [
      { id: 1, name: "Product 1", price: 150 },
      { id: 2, name: "Product 2", price: 725 },
      { id: 3, name: "Product 3", price: 10 },
    ];
  
    res.json({ products });
  });

  app.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "Protected route accessed successfully" });
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
