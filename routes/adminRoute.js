const express = require('express');
const adminController = require('../controllers/adminController.js')
const router = express.Router();



router.get('/', adminController.getAdmins);
// here you'll define the admin routes
router.post('/add', adminController.createAdmin);
router.post('/authenticate', adminController.authenticateAdmin);
router.delete('/delete', adminController.deleteAdmin);
router.put('/update', adminController.updateAdminPassword);



module.exports = router;