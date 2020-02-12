const multer = require('multer');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = {
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      const pathToFile = path.resolve(__dirname, '..', '..', 'uploads', 'comparisons', req.body.name);
      if (req.body.event === 'comparisons-create') {
        const made = await mkdirp(pathToFile);
        if (!made) {
          req.error = true;

          const errorDisplay = process.env.NODE_ENV === 'production'
            ? new Error('Error').message
            : new Error('Path already exists');

          cb(errorDisplay);
        }

        req.pathToFile = pathToFile;
        cb(null, pathToFile);
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
