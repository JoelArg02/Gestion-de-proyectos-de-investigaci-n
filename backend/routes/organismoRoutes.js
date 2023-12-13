const express = require('express');
const router = express.Router();
const db = require('../src/db');

// Obtener todos los organismos
router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM organismo');
        res.json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/', async (req, res) => {
    const { nombre, direccion, poblacion, codigo_postal, telefono } = req.body;
    try {
        const { rows } = await db.query(
            'INSERT INTO organismo (nombre, direccion, poblacion, codigo_postal, telefono) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nombre, direccion, poblacion, codigo_postal, telefono]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, direccion, poblacion, codigo_postal, telefono } = req.body;
    try {
        const { rows } = await db.query(
            'UPDATE organismo SET nombre = $1, direccion = $2, poblacion = $3, codigo_postal = $4, telefono = $5 WHERE id_organismo = $6 RETURNING *',
            [nombre, direccion, poblacion, codigo_postal, telefono, id]
        );
        res.json(rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await db.query('DELETE FROM organismo WHERE id_organismo = $1', [id]);
        res.status(204).send('Organismo eliminado');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
