const Admin = require('../models/admin');  // Use PascalCase for model names
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// this key will be changed latter and stored in a .env file
const key = 'd2f9c1a6b3e0e7d8f1a4b9c2f5e3b6a0d4c8e2a7f0b1d9c3f4e5a1b7d2c6f9e3';

// Create a new admin
const createAdmin = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, key);

        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        console.log('token authenticated from createAdmin');

        const { username, password } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const newAdmin = new Admin({ username, password });
        await newAdmin.save();
        res.status(201).json({ message: 'Admin created' });
        console.log('Admin created');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Authenticate admin
const authenticateAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('username is: ',username);

        // Find the admin by username
        const admin = await Admin.findOne({ username });

        // Check if admin exists and if the password matches
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create a token
        const token = jwt.sign({ adminId: admin._id }, key, { expiresIn: '1h' });
        res.status(200).json({ token });
        console.log('token is: ',token);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const adminIndex = async (req, res) => {
    try {

        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, key);

        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAdmin = async (req, res) => {
    try {
        // authenticate the token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, key);

        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const { username } = req.body;

        // Check if admin exists
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: 'Admin does not exist' });
        }

        await Admin.deleteOne({ username });
        res.status(200).json({ message: 'Admin deleted' });
        console.log('Admin deleted');
    }

    catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const updateAdminPassword = async (req, res) => {
    try {
        
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, key);

        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const { username, password } = req.body;

        // Check if admin exists
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: 'Admin does not exist' });
        }

        // Update password
        admin.password = password;

        await admin.save();
        res.status(200).json({ message: 'Admin password updated' });
        console.log('Admin password updated');
    }

    catch (error) {
        res.status(500).json({ message: error.message });
    }

}

module.exports = { createAdmin, authenticateAdmin, adminIndex, deleteAdmin, updateAdminPassword };
