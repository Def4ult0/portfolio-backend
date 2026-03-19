const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// 🔥 Replace later with MongoDB Atlas URL
mongoose.connect("mongodb://127.0.0.1:27017/portfolio");

// Schema
const Contact = mongoose.model("Contact", {
    name: String,
    email: String,
    message: String
});
// test route
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
// API route
app.post("/contact", async (req, res) => {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.json({ status: "saved" });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});