const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar compresión GZIP/Brotli para todos las respuestas HTTP
app.use(compression());

// Servir archivos estáticos con políticas de caché (Cache-Control)
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1y', // Cache por 1 año
    setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
            // No cachear HTML para que siempre reciban las últimas versiones
            res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        } else if (path.endsWith('.m4v') || path.endsWith('.mp3') || path.endsWith('.webp')) {
            // Archivos multimedia cacheados largo tiempo, el móvil no los volverá a pedir
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
    }
}));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🎉 Servidor corriendo en el puerto ${PORT}`);
});
