import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// Register new user
export const registerUser = async (req, res) => {
    const { username, name, age, email, password, role } = req.body;

    try {
        // Validate email format using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Validate password strength (example: at least 6 characters)
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            name,
            age,
            email,
            password: hashedPassword,
            role: role || 'user', // Default to 'user' if no role is provided
        });

        await newUser.save();

        // Exclude password in response
        const { password: _, ...userWithoutPassword } = newUser.toObject();

        res.status(201).json({ success: true, data: userWithoutPassword });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.ACCESS_TOKEN,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                name: user.name,
                age: user.age,
            },
        });
    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body; // Capture all fields to be updated

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid user ID' });
    }
    // Remove sensitive or restricted fields from updates if provided
    delete updates.password; // Password shouldn't be updated here
    delete updates._id; // Prevent changing the document's ID

    try {
         // Validate email format using regex
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailRegex.test(updates?.email)) {
             return res.status(400).json({ success: false, message: 'Invalid email format' });
         }
        const updatedUser = await User.findByIdAndUpdate(
            id,
            updates,
            {
                new: true, // Return the updated document
                runValidators: true, // Ensure updates adhere to schema validation rules
                select: '-password', // Exclude password from the response
            }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: updatedUser, message:"User updated successfully" });
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


// Delete user
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid user ID' });
    }

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'User deleted' });
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
