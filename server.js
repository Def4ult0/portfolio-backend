const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 MongoDB Connection
mongoose.connect("mongoose.connect("mongodb+srv://sambhav:sambhav25!@@cluster0.xxxxx.mongodb.net/portfolio")")
.then(() => {
    console.log("MongoDB connected");

    // ✅ START SERVER ONLY AFTER DB CONNECTS
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch(err => {
    console.error("MongoDB failed:", err);
});