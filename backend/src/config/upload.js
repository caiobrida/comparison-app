const multer = require('multer');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = {
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      const pathToFolder = path.resolve(__dirname, '..', '..', 'uploads', 'repositories', req.params.repo_id, req.body.name);
      if (req.body.event === 'comparisons-create') {
        const made = await mkdirp(pathToFolder);
        if (!made) {
          req.error = true;

          const errorDisplay = process.env.NODE_ENV === 'production'
            ? new Error('Error').message
            : new Error('Path already exists');

          cb(errorDisplay);
        }

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
