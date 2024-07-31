const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const app = express();
require("dotenv").config();

app.use(cors({
  origin: 'http://localhost:3000', // replace with your client URL
  credentials: true,
}));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An internal server error occurred" });
});
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

const initializeDB = async () => {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          username VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL
        );
      `);
  
      await pool.query(`
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          product_name VARCHAR(255) NOT NULL,
          brand VARCHAR(255) NOT NULL,
          type VARCHAR(255) NOT NULL,
          buying_date DATE NOT NULL,
          warranty_date DATE NOT NULL,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
        );
      `);
  
      app.listen(8080, () => {
        console.log('Server listening on port 8080');
      });
    } catch (err) {
      console.error('Error initializing database:', err);
      process.exit(1);
    }
  };
  
  initializeDB();
  

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
});

const productSchema = Joi.object({
  productName: Joi.string().required(),
  brand: Joi.string().required(),
  type: Joi.string().required(),
  buyingDate: Joi.date().required(),
  warrantyDate: Joi.date().required(),
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 
  console.log(token);
  if (!token) console.log("Token issue");

  jwt.verify(token, "your_jwt_secret", (err, user) => {
    if (err) return console.log("Token issue");

    req.user = user; 
    next();
  });
};

app.get("/userData", authenticateToken, async (req, res) => {
  try {
    const userInfoResult = await pool.query(
      "SELECT username FROM users WHERE id = $1",
      [req.user.id]
    );
    if (userInfoResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const username = userInfoResult.rows[0].username;

    const userProductsResult = await pool.query(
      "SELECT * FROM products WHERE user_id = $1",
      [req.user.id]
    );

    res.json({
      username,
      products: userProductsResult.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving user profile" });
  }
});

app.post("/signup", async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).json({ errorDetail: error.details[0].message });
  }
  const { email, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *",
      [email, username, hashedPassword]
    );

    const token = jwt.sign({ id: result.rows[0].id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err.detail);
    res.status(400).json({
      message: "Error creating user",
      errorDetail: err.detail || "An unknown error occurred",
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error Logging in",
      errorDetail: err.detail || "An unknown error occurred",
    });
  }
});

app.get("/isLoggedIn", authenticateToken, (req, res) => {
  res.json({ isLoggedIn: true });
  //console.log("Server approved bruh")
});

app.post("/submission", authenticateToken, async (req, res) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { productName, brand, type, buyingDate, warrantyDate } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO products (product_name, brand, type, buying_date, warranty_date, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [productName, brand, type, buyingDate, warrantyDate, req.user.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving product" });
  }
});

app.get("/", (req, res) => {
  res.json("Hello Wortld");
});



