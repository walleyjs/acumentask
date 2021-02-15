

const Hapi = require('@hapi/hapi');

const init = async () => {


    const server = Hapi.server({
        port: 8000,
        host: 'localhost'
    });

    const user = {
        cache: { expiresIn: 5000 },
        handler: function (request, h) {
    
            return { name: 'John' };
        }
    };
    
    server.route({ method: 'GET', path: '/user', options: user });
    
    await server.start();
    console.log('Server running on port 8000');
};

init();
