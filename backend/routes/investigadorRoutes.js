const express = require('express');
const router = express.Router();
const db = require('../src/db');

// Obtener todos los investigadores
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM investigador');
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Crear un nuevo investigador
router.post('/', async (req, res) => {
  const { nombre, area_conocimiento, id_departamento_investigador } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO investigador (nombre, area_conocimiento, id_departamento_investigador) VALUES ($1, $2, $3) RETURNING *',
      [nombre, area_conocimiento, id_departamento_investigador]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//  rutas y operaciones CRUD para investigador
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, area_conocimiento, id_departamento_investigador } = req.body;
    try {
        const { rows } = await db.query(
        'UPDATE investigador SET nombre = $1, area_conocimiento = $2, id_departamento_investigador = $3 WHERE id_investigador = $4 RETURNING *',
        [nombre, area_conocimiento, id_departamento_investigador, id]
        );
        res.json(rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await db.query('DELETE FROM investigador WHERE id_investigador = $1', [id]);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
