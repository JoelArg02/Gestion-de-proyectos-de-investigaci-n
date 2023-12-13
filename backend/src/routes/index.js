const express = require('express'); 

const personsRouter = require('./persons.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router); 
  router.use('/persons', personsRouter);
  router.use('/convocatorias', personsRouter);
  router.use('/organismos', personsRouter);
}

module.exports = routerApi;
