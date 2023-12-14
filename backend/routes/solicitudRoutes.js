const express = require('express');
const router = express.Router();
const db = require('../src/db');

// Obtener todas las solicitudes
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM solicitud');
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Obtener una solicitud por su ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const { rows } = await db.query('SELECT * FROM solicitud WHERE id_solicitud = $1', [id]);
    if (rows.length === 0) {
      res.status(404).send('Solicitud no encontrada');
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Crear una nueva solicitud
router.post('/', async (req, res) => {
  const {
    id_convocatoria_solicitud,
    id_investigador_solicitud,
    id_grupo_solicitud,
    fecha_presentacion,
    TituloProyecto,
    FechaResolucion,
    EstadoAprobacion,
    importe_solicitado,
    inicio_proyecto,
    fin_proyecto,
    duracion_meses,
    numero_entrada_registro
  } = req.body;

  try {
    const { rows } = await db.query(
      'INSERT INTO solicitud (id_convocatoria_solicitud, id_investigador_solicitud, id_grupo_solicitud, fecha_presentacion, TituloProyecto, FechaResolucion, EstadoAprobacion, importe_solicitado, inicio_proyecto, fin_proyecto, duracion_meses, numero_entrada_registro) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [
        id_convocatoria_solicitud,
        id_investigador_solicitud,
        id_grupo_solicitud,
        fecha_presentacion,
        TituloProyecto,
        FechaResolucion,
        EstadoAprobacion,
        importe_solicitado,
        inicio_proyecto,
        fin_proyecto,
        duracion_meses,
        numero_entrada_registro
      ]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Actualizar una solicitud por su ID
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const {
    id_convocatoria_solicitud,
    id_investigador_solicitud,
    id_grupo_solicitud,
    fecha_presentacion,
    TituloProyecto,
    FechaResolucion,
    EstadoAprobacion,
    importe_solicitado,
    inicio_proyecto,
    fin_proyecto,
    duracion_meses,
    numero_entrada_registro
  } = req.body;

  try {
    const { rows } = await db.query(
      'UPDATE solicitud SET id_convocatoria_solicitud = $1, id_investigador_solicitud = $2, id_grupo_solicitud = $3, fecha_presentacion = $4, TituloProyecto = $5, FechaResolucion = $6, EstadoAprobacion = $7, importe_solicitado = $8, inicio_proyecto = $9, fin_proyecto = $10, duracion_meses = $11, numero_entrada_registro = $12 WHERE id_solicitud = $13 RETURNING *',
      [
        id_convocatoria_solicitud,
        id_investigador_solicitud,
        id_grupo_solicitud,
        fecha_presentacion,
        TituloProyecto,
        FechaResolucion,
        EstadoAprobacion,
        importe_solicitado,
        inicio_proyecto,
        fin_proyecto,
        duracion_meses,
        numero_entrada_registro,
        id
      ]
    );

    if (rows.length === 0) {
      res.status(404).send('Solicitud no encontrada');
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Eliminar una solicitud por su ID
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await db.query('DELETE FROM solicitud WHERE id_solicitud = $1', [id]);
    res.status(204).send('Solicitud eliminada');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
