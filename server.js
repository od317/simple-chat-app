const io = require('socket.io')(3000,{
    cors:{
     origin:'*'
    }
});

let users={}

io.on('connection',socket=>{
    socket.on('chat-message',message=>{

        socket.broadcast.emit('send-chat-message', {message:message,name : users[socket.id]});
   
    })
    socket.on('new-user',name=>{

        users[socket.id]=name;
        socket.broadcast.emit('user-con',name);

    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('user-discon',users[socket.id]);
        delete users[socket.id];
    })
})