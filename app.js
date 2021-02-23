

const Hapi = require('@hapi/hapi');
const Ejs = require('ejs');
const Vision = require('@hapi/vision');
const todomodel=require('./models/todo')
const mongoose = require("mongoose");
const server = Hapi.server({
    port: 8000,
    host: 'localhost',
    routes: {
        cors: true
    }
});
mongoose.connect("mongodb://localhost/tododb", { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log('Connection with database succeeded.');
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
    server.route({  method: 'POST', 
    path: '/newtodo',
    handler: async (request, h)=> {
        const subject = "walley";
        const todo="things i wnat to do"
        const nTodo=JSON.parse(request.payload);
        
        // console.log("payload here ", nTodo)
        // console.log(nTodo.subject)
        const newTodo={
            todo:nTodo.todo,
           
        }
        var todomode=  await todomodel.create(newTodo)

        return request.payload;

    }
 })
 server.route({
    method: 'GET', 
    path:'/newtodo',
    handler:async (request, h)=> {

      var todomode = await todomodel.find({},(err,todos)=>{
            if (err) {
                console.log(err)
            } 
        //  console.log(todos.todo)
            
        })
       return todomode;
    }
 })
    server.route({ 
        method: 'GET', 
    path: '/user', options: user });
    
    await server.start();
    console.log('Server running at:', server.info.uri);
};

init();
