const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'src/uploads'),
    filename: (req, file, cb) => cb(null, `${req.params.id}.jpeg`),
});

module.exports = {
    storage,
};