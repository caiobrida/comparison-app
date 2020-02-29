const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const routes = require('./routes');
const error = require('./middlewares/error');

require('./database');

const app = express();

app.use(morgan('common'));
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/users/files', express.static(path.resolve(__dirname, '..', 'uploads', 'users')));
app.use('/comparisons/files', express.static(path.resolve(__dirname, '..', 'uploads', 'comparisons')));

app.use(routes);

app.use(error.notFound);
app.use(error.errorHandler);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

module.exports = server;
