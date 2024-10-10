const express = require('express');

const adminController = require('../controllers/adminController.js')

const router = express.Router();

// don't forget to include the image stuff


router.get('/', adminController.getAdmins);
// here you'll define the admin routes


module.exports = router;