const { UPLOAD_DIRECTORY } = require('../config/constants/settings');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_DIRECTORY),
    filename: (req, file, cb) => cb(null, `${req.params.id}.jpeg`),
});

module.exports = {
    storage,
};