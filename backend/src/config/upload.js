const multer = require('multer');
const path = require('path');
const fs = require('fs');

module.exports = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (req.body.event === 'comparisons') {
        if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'uploads', 'comparisons', req.body.name))) {
          fs.mkdirSync(path.resolve(__dirname, '..', '..', 'uploads', 'comparisons', req.body.name));
        }
        cb(null, path.resolve(__dirname, '..', '..', 'uploads', 'comparisons', req.body.name));
      } else {
        cb(null, path.resolve(__dirname, '..', '..', 'uploads', 'users'));
      }
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);

      cb(null, `${name}-${Date.now()}${ext}`);
    },
  }),
};
