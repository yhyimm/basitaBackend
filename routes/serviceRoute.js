const express = require('express');
const serviceController = require('../controllers/serviceController');
const {saveImage, uploadImage} = require('../controllers/imageController');

const router = express.Router();


router.get('/', serviceController.getServices);
router.get('/:name', serviceController.getServiceByName);

router.get('/ar', serviceController.getServicesAr);
router.get('/ar/:name', serviceController.getServiceByNameAr);

// here you'll define the admin routes
router.put('/add', uploadImage.single('image'),saveImage('assets/service-images/'), serviceController.addService);
router.post('/update/:id', uploadImage.single('image'),saveImage('assets/service-images/'), serviceController.updateService);
router.delete('/delete/:id', serviceController.deleteService);

module.exports = router;