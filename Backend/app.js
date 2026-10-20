const express = require('express');
const cors = require('cors');
const rutas = require('./routes/rutas');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', rutas);

app.use((req, res) => {
    res.status(404).json({ status: 'error', message: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});
