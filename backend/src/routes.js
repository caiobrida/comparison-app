const express = require('express');
const multer = require('multer');

const auth = require('./middlewares/auth');
const authorizeComp = require('./middlewares/authorizeComp');
const uploadConfig = require('./config/upload');

const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const repoController = require('./controllers/repoController');
const comparisonController = require('./controllers/comparisonController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/me', auth.default, userController.show);
routes.post('/users', upload.single('avatar'), userController.store);
routes.put('/users', [auth.default, upload.single('avatar')], userController.update);

routes.post('/auths', authController.store);

routes.get('/repos', auth.verify, repoController.index);
routes.get('/myrepos', auth.default, repoController.show);
routes.post('/repos', auth.default, repoController.store);
routes.put('/repos/:repo_id', auth.default, repoController.update);
routes.delete('/repos/:repo_id', auth.default, repoController.destroy);

routes.post('/comparisons/:repo_id',
  [auth.default, upload.fields([
    { name: 'img1', maxCount: 1 },
    { name: 'img2', maxCount: 1 },
  ])],
  comparisonController.store);
routes.put('/comparisons/:repo_id/:comp_name',
  [auth.default, authorizeComp, upload.fields([
    { name: 'img1', maxCount: 1 },
    { name: 'img2', maxCount: 1 },
  ])],
  comparisonController.update);
routes.delete('/comparisons/:repo_id/:comp_name',
  [auth.default, authorizeComp], comparisonController.destroy);

module.exports = routes;
