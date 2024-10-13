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
router.put('/add', uploadImage.single('image'), saveImage('assets/project-images/'), projectController.addProject);
router.post('/update/:id', uploadImage.single('image'), saveImage('assets/project-images/'), projectController.updateProject);
router.delete('/delete/:id', projectController.deleteProject);

module.exports = router;



