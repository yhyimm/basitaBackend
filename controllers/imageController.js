const sharp = require('sharp');
const multer = require('multer');
const expressAsyncHandler = require('express-async-handler');

const storage = multer.memoryStorage();
// this is the filter that will only allow images to be uploaded
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(null,false);
    }
}

// here we specify our filter and storage
const uploadImage = multer({ storage: storage, fileFilter: multerFilter });

const saveImage = (directory) => expressAsyncHandler(async (req, res,next) => {

    if(req.file){
        try{
            await sharp(req.file.buffer)
                .resize(600,600)
                .toFile(`${directory}/${req.file.originalname}`);
        }

        catch(err){
            console.log('error saving image', err);
            res.status(500).send('error saving image');
        }
    }

    else{
        console.log('no file uploaded');
        res.status(400).send('no image uploaded');
    }
});

module.exports = {
    uploadImage,
    saveImage
};