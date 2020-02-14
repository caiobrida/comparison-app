const multer = require('multer');
const path = require('path');

module.exports = {
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      if (req.query.event === 'comparisons') {
        const pathToFolder = path.resolve(__dirname, '..', '..', 'uploads', 'comparisons');
        req.pathToFolder = pathToFolder;
        cb(null, pathToFolder);
      } else {
        cb(null, path.resolve(__dirname, '..', '..', 'uploads', 'users'));
      }
    },
    filename: (req, file, cb) => {
      if (!req.error) {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);

        cb(null, `${name}-${Date.now()}${ext}`);
      }
    },
  }),
};
