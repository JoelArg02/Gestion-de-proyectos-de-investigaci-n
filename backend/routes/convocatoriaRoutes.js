const express = require('express');
const router = express.Router();
const db = require('../src/db');

// Obtener todas las convocatorias
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM convocatoria');
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Crear una nueva convocatoria
router.post('/', async (req, res) => {
  const {
    fecha_publicacion,
    programa,
    fecha_limite_solicitudes,
    numero_convocatoria,
    web,
    boe_dogb,
    fecha_resolucion,
    id_organismo_convocatoria,
  } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO convocatoria (fecha_publicacion, programa, fecha_limite_solicitudes, numero_convocatoria, web, boe_dogb, fecha_resolucion, id_organismo_convocatoria) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        fecha_publicacion,
        programa,
        fecha_limite_solicitudes,
        numero_convocatoria,
        web,
        boe_dogb,
        fecha_resolucion,
        id_organismo_convocatoria,
      ]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const {
        fecha_publicacion,
        programa,
        fecha_limite_solicitudes,
        numero_convocatoria,
        web,
        boe_dogb,
        fecha_resolucion,
        id_organismo_convocatoria,
    } = req.body;
    try {
        const { rows } = await db.query(
        'UPDATE convocatoria SET fecha_publicacion = $1, programa = $2, fecha_limite_solicitudes = $3, numero_convocatoria = $4, web = $5, boe_dogb = $6, fecha_resolucion = $7, id_organismo_convocatoria = $8 WHERE id_convocatoria = $9 RETURNING *',
        [
            fecha_publicacion,
            programa,
            fecha_limite_solicitudes,
            numero_convocatoria,
            web,
            boe_dogb,
            fecha_resolucion,
            id_organismo_convocatoria,
            id,
        ]
        );
        res.json(rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
    });
// Eliminar una convocatoria
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await db.query('DELETE FROM convocatoria WHERE id_convocatoria = $1', [id]);
    res.status(204).send('Convocatoria eliminada');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
