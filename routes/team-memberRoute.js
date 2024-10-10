const express = require('express');
const teamController = require('../controllers/teamMemberController');
const {saveImage, uploadImage} = require('../controllers/imageController');

const router = express.Router();

router.get('/', teamController.getMembers);

module.exports = router;