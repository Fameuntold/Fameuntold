import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

//  REGISTER USER
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, location, message, role } = req.body;

        //  Validate
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }

        //  Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //  Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //  Create user
        const user = await User.create({
            name,
            email,
            phone,
            location,
            message,
            password: hashedPassword,
            role: role || "user",
        });

        //  Generate token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

    //     await sendEmail(
    //         process.env.EMAIL_USER, // your email
    //         "New User Registration",
    //         `
    //     <h2>New Registration</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Role:</strong> ${role}</p>
    //     <p><strong>Phone:</strong> ${phone}</p>
    //     <p><strong>Location:</strong> ${location}</p>
    //     <p><strong>Message:</strong> ${message}</p>
    //   `
    //     );

    //     //  EMAIL TO USER
    //     await sendEmail(
    //         email,
    //         "Welcome to FAMEUNTOLD",
    //         `
    //     <h3>Hello ${name},</h3>
    //     <p>Thank you for registering as a <strong>${role}</strong>.</p>
    //     <p>We will get back to you soon!</p>
    //   `
    //     );

        //  Send response
        res.json({ user, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


// LOGIN USER
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //  Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        //  Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Wrong password" });

        //  Generate token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ user, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};