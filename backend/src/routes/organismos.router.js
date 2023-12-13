const express = require('express');
const router = express.Router(); 
const organismosController = require('../controllers/organismos.controller');

router
    .get('/', organismosController.get )
    .get('/:id', organismosController.getById )
    .post('/', organismosController.create )
    .put('/:id', organismosController.update )
    .delete('/:id', organismosController._delete );

module.exports = router;
