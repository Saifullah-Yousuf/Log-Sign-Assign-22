import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import { User } from "./models/user.models.js";

const app = express();

app.use(cors());

const mongoDb = "mongodb+srv://Assignments:assignmentbd@assignmentsdb.e4et2.mongodb.net/AssignmentsDB";

mongoose.connect(mongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(error => console.log("MongoDB connection error:", error));

mongoose.connection.on('connected', () => {
    console.log("MongoDB connected");
});

mongoose.connection.on('error', (error) => {
    console.error("MongoDB connection error:", error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/signup', async (req, res) => {
    const { name, email, password, number } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, number });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error saving user:", error);
        if (error.code === 11000) {
            res.status(400).json({ message: "Email or number already exists." });
        } else {
            res.status(500).json({ message: "An error occurred during registration." });
        }
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password." });
        }
        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "An error occurred during login." });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
