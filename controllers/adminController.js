const Admin = require('../models/admin');  // Use PascalCase for model names
const bcrypt = require('bcrypt');

// Create a new admin
const createAdmin = async (req, res) => {
    try {
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

        res.status(200).json({ message: 'Admin authenticated' });
        console.log('Admin authenticated');
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const adminIndex = async (req, res) => {
    try {
        // get all admins from the database and the plain text password
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const { username } = req.body;

        // Check if admin exists
        const admin = await Admin.findOne
        ({ username });
        if (!admin) {
            return res.status(400).json({ message: 'Admin does not exist' });
        }
        await Admin.deleteOne({ username});
        res.status(200).json({ message: 'Admin deleted' });
        console.log('Admin deleted');
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAdmins = async (req, res) => {
   try {
      const admins = await Admin.find();
      res.status(200).json(admins);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}


module.exports = { createAdmin,getAdmins, authenticateAdmin, adminIndex, deleteAdmin };  // Export the functions

