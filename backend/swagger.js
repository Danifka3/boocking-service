const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Unified API',
            version: '1.0.0',
            description: 'API for working with MongoDB and NodeJS',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Unified server',
            },
        ],
    },
    apis: ['./routes/*.js'], // Указываем пути ко всем маршрутам
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
