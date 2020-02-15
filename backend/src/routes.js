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

routes.get('/api/me', auth.default, userController.show);
routes.post('/api/users', upload.single('avatar'), userController.store);
routes.put('/api/users', [auth.default, upload.single('avatar')], userController.update);

routes.post('/api/auths', authController.store);

routes.get('/api/repos', auth.verify, repoController.index);
routes.get('/api/myrepos', auth.default, repoController.show);
routes.post('/api/repos', auth.default, repoController.store);
routes.put('/api/repos/:repo_id', auth.default, repoController.update);
routes.delete('/api/repos/:repo_id', auth.default, repoController.destroy);

routes.get('/api/comparisons/:repo_id', comparisonController.index);
routes.get('/api/comparisons/show/:comp_id', comparisonController.show);
routes.post('/api/comparisons/:repo_id',
  [auth.default, upload.fields([
    { name: 'img1', maxCount: 1 },
    { name: 'img2', maxCount: 1 },
  ])],
  comparisonController.store);
routes.put('/api/comparisons/:repo_id/:comp_name',
  [auth.default, authorizeComp, upload.fields([
    { name: 'img1', maxCount: 1 },
    { name: 'img2', maxCount: 1 },
  ])],
  comparisonController.update);
routes.delete('/api/comparisons/:repo_id/:comp_name',
  [auth.default, authorizeComp], comparisonController.destroy);

module.exports = routes;
