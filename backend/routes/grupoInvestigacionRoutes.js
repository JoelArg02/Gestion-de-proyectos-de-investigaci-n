const express = require('express');
const router = express.Router();
const db = require('../src/db');

// Obtener todos los grupos de investigación
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM grupo_investigacion');
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Crear un nuevo grupo de investigación
router.post('/', async (req, res) => {
  const { nombre_grupo, id_investigador, departamento_grupo } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO grupo_investigacion (nombre_grupo, id_investigador, departamento_grupo) VALUES ($1, $2, $3) RETURNING *',
      [nombre_grupo, id_investigador, departamento_grupo]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//  rutas y operaciones CRUD para grupo de investigación
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre_grupo, id_investigador, departamento_grupo } = req.body;
    try {
        const { rows } = await db.query(
        'UPDATE grupo_investigacion SET nombre_grupo = $1, id_investigador = $2, departamento_grupo = $3 WHERE id_grupo_investigacion = $4 RETURNING *',
        [nombre_grupo, id_investigador, departamento_grupo, id]
        );
        res.json(rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await db.query('DELETE FROM grupo_investigacion WHERE id_grupo_investigacion = $1', [id]);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
