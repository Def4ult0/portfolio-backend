const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Start server FIRST (important for Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// ✅ MongoDB connection (do NOT block server start)
mongoose.connect("mongodb+srv://sambhav:<sambhav123>@cluster0.csga6dk.mongodb.net/?appName=Cluster0")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB error:", err));

// Model
const Contact = mongoose.model("Contact", {
    name: String,
    email: String,
    message: String
});

// Routes
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

app.post("/contact", async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.json({ status: "saved" });
    } catch (err) {
        res.status(500).json({ error: "Failed to save" });
    }
});