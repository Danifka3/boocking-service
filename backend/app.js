const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { swaggerUi, swaggerDocs } = require('./swagger');

const createRoutes = require('./routes/create');
const readRoutes = require('./routes/read');
const deleteRoutes = require('./routes/delete');

const app = express();
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/block09db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Подключение маршрутов
app.use(createRoutes);
app.use(readRoutes);
app.use(deleteRoutes);

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/api-docs`));
