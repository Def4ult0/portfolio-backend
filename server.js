const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ CORRECT MongoDB connection
mongoose.connect("mongodb+srv://sambhav:sambhav123@cluster0.xxxxx.mongodb.net/portfolio")
.then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch(err => {
    console.error("MongoDB failed:", err);
});