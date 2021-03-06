

const Hapi = require('@hapi/hapi');
const Ejs = require('ejs');
const Vision = require('@hapi/vision');
const todomodel=require('./models/todo')
const mongoose = require("mongoose");
const cors =require('cors')

const server = Hapi.server({
    port: 8000,
    host: '0.0.0.0/0',
    routes: {
        "cors": {
            "origin": ["http://0.0.0.0/0"],
            "headers": ["Accept", "Content-Type"],
            "additionalHeaders": ["X-Requested-With"]
        }
      
    }

});
server.register(
    {cors:cors()}
)
mongoose.connect("mongodb+srv://walley:walley@vclust.sjqey.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });

// mongoose.connect("mongodb://localhost/tododb", { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
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
      console.log(request.payload)
        // const nTodo=JSON.parse(request.payload);
        const pLoad=request.payload
        // console.log("payload here ", nTodo)
        // console.log(nTodo.subject)
        // for vue project
        const vueTodo={
            todo:pLoad.todo,
            completed:pLoad.completed
        }
        // for react projec÷t
        // const newTodo={
        //     todo:nTodo.todo,
        //     completed:nTodo.completed
           
        // }
        var todomode=  await todomodel.create(vueTodo)

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
    method: 'PUT', 
    path:'/newtodoedit',
    handler: async (request, h)=> {
      
        const nTodo=JSON.parse(request.payload);
    //    console.log("put outcome ",nTodo)
        const updTodo={
            todo:nTodo.todo,
           
        }
        var todomode=  await todomodel.findByIdAndUpdate(nTodo.tId,updTodo)

        return request.payload;

    }
    

 })
 server.route({
    method: 'DELETE', 
    path:'/newtododel',
    handler: async (request, h)=> {
      
        // const nTodo=JSON.parse(request.payload);
        const pLoad=request.payload
        var todomode=  await todomodel.findByIdAndDelete(pLoad.tId)
        return request.payload;

    }
    

 })
server.route({ 
        method: 'GET', 
    path: '/user', options: user });
    
    await server.start();
    console.log('Server running at:', server.info.uri);
};

init();

