const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Schema
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String
});

const Contact = mongoose.model("Contact", ContactSchema);

// API Endpoint to add contact
app.post("/api/addContact", async (req, res) => {
    try {
        const { name, phone } = req.body;
        const newContact = new Contact({ name, phone });
        await newContact.save();
        res.json({ message: "Contact saved successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error saving contact" });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
