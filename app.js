

const Hapi = require('@hapi/hapi');
const Ejs = require('ejs');
const Vision = require('@hapi/vision');

const server = Hapi.server({
    port: 8000,
    host: 'localhost'
});
const rootHandler = (request, h) => {

return h.view('index', {
        title: 'views | Hapi ' + request.server.version,
        message: 'Hello Ejs!'
    });
};
const init = async () => {
   
    await server.register(Vision);
    server.views({
        engines: { ejs: Ejs },
        relativeTo: __dirname,
        path: 'views'
    });

     server.route({ method: 'GET', path: '/', handler: rootHandler });

    const user = {
        cache: { expiresIn: 5000 },
        handler: function (request, h) {
    
            return { name: 'John' };
        }
    };
    
    server.route({ method: 'GET', path: '/user', options: user });
    
    await server.start();
    console.log('Server running at:', server.info.uri);
};

init();
