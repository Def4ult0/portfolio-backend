const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// ✅ Schema
const Contact = mongoose.model("Contact", {
    name: String,
    email: String,
    message: String
});

// ✅ Route
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

// ✅ START SERVER FIRST (IMPORTANT FOR RENDER)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// ✅ CONNECT MONGODB (AFTER SERVER START)
mongoose.connect("mongodb+srv://sam:sam123>@cluster0.csga6dk.mongodb.net/?appName=Cluster0")
.then(() => console.log("MongoDB connected ✅"))
.catch(err => console.log("MongoDB ERROR ❌:", err));