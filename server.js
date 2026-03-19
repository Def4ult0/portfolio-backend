const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

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
        console.log("SAVE ERROR:", err);
        res.status(500).json({ error: err.message });
    }
});

// 🔥 CONNECT DB FIRST, THEN START SERVER
mongoose.connect("mongodb+srv://sambhav:sambhav123>@cluster0.csga6dk.mongodb.net/?appName=Cluster0")
.then(() => {
    console.log("MongoDB connected ✅");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch(err => {
    console.log("MongoDB connection error ❌", err);
});