const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

// Configuración de CORS para permitir solicitudes desde tu aplicación React
app.use(cors({
  origin: 'http://localhost:3000'
}));

const organismoRoutes = require('./routes/organismoRoutes');

app.use(express.json());

app.use('/organismos', organismoRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Algo salió mal');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
