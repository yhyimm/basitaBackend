const express = require('express');
const projectController = require('../controllers/projectController');
const {saveImage, uploadImage} = require('../controllers/imageController');


const router = express.Router();

// don't forget to include the image stuff

router.get('/', projectController.getProjects);
router.get('/:name', projectController.getProjectByName);

router.get('/ar', projectController.getProjectsAr);
router.get('/ar/:name', projectController.getprojectByNameAr);

// here you'll define the admin routes

module.exports = router;



