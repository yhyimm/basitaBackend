const express = require('express');
const serviceController = require('../controllers/serviceController');
const {saveImage, uploadImage} = require('../controllers/imageController');

const router = express.Router();

// don't forget to include the image stuff


router.get('/', serviceController.getServices);
router.get('/:name', serviceController.getServiceByName);

router.get('/ar', serviceController.getServicesAr);
router.get('/ar/:name', serviceController.getServiceByNameAr);

// here you'll define the admin routes

module.exports = router;