module.exports = {
    info: {
        title: '<%= name %>',
        version: '<%= version %>',
        description: '<%= description %>',
    },
    host: 'http://localhost:3000',
    basePath: '/',
    openapi: '3.0.0',
    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    }
};