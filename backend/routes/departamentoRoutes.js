const express = require('express');
const router = express.Router();
const db = require('../src/db');

// Obtener todos los departamentos
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM departamento');
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Crear un nuevo departamento
router.post('/', async (req, res) => {
  const { nombre, director } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO departamento (nombre, director) VALUES ($1, $2) RETURNING *',
      [nombre, director]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Otras rutas y operaciones CRUD para departamento

module.exports = router;
