import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//  REGISTER USER
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, location, message, role } = req.body;

        //  BASIC VALIDATION
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill all required fields",
            });
        }

        //  PASSWORD VALIDATION RULE
        const passwordRegex = /^[A-Z][A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{7,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    "Password must be at least 8 characters, start with a capital letter, and include a number and special character",
            });
        }

        //  EXTRA CHECKS (for better clarity)
        if (!/[0-9]/.test(password)) {
            return res.status(400).json({
                message: "Password must include at least one number",
            });
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return res.status(400).json({
                message: "Password must include at least one special character",
            });
        }

        //  CHECK IF USER EXISTS
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //  HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        //  CREATE USER
        const user = await User.create({
            name,
            email,
            phone,
            location,
            message,
            password: hashedPassword,
            role: role || "user",
        });

        //  GENERATE TOKEN
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        //  REMOVE PASSWORD FROM RESPONSE
        const { password: _, ...safeUser } = user._doc;

        res.json({ user: safeUser, token });

    } catch (error) {
        console.error("REGISTER ERROR:", error.message); // ✅ LOG ERROR
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

        const { password: _, ...safeUser } = user._doc;

        res.json({ user: safeUser, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


export const uploadProfileImage = async (req, res) => {
    try {
        const userId = req.user.id;

        //  No file uploaded
        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        //  Store relative path (important!)
        const imageUrl = `/uploads/${req.file.filename}`;

        const user = await User.findByIdAndUpdate(
            userId,
            { profileImage: imageUrl },
            { new: true }
        );

        //  Remove password
        const { password: _, ...safeUser } = user._doc;

        res.json({
            message: "Profile image updated",
            imageUrl,
            user: safeUser
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};




//  UPDATE PROFILE

export const updateProfile = async (req, res) => {
  try {
    const { name, currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // UPDATE NAME
    if (name) user.name = name;

    // CHANGE PASSWORD ONLY IF PROVIDED
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: "Enter current password" });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect current password" });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};