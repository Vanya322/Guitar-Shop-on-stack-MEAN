const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
    destination(req, file, done) {
        done(null, 'client/src/app/uploads/');
    },
    filename(req, file, done) {
        const date = moment().format('YYYY-MM-DD-HHmmss');
        done(null, `${date}-${file.originalname}`);
    }
})

const fileFilter = (req, file, done) => {
    if(
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg'
    ) {
        done(null, true);
    }
    else {
        done(null, false);
    }

}

const limits = {
    fileSize: 1024 * 1024 * 5
}

module.exports = multer({ storage, fileFilter, limits })