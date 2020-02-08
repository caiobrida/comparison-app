const express = require('express');
const morgan = require('morgan');

const routes = require('./routes');
const error = require('./middlewares/error');

require('./database');

const app = express();

app.use(morgan('common'));
app.use(express.json());
app.use(routes);

app.use(error.notFound);
app.use(error.errorHandler);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
