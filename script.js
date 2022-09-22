const PORT=3000;
const socket = io(`http://localhost:3000`)
const form = document.getElementById('send-container');
const messageform= document.getElementById('message-input');
const messageContainer = document.getElementById('message-container')

socket.on('send-chat-message',data=>{
    addmessage(data.name+" : "+data.message);
})


socket.on('user-con',name=>{
    addmessage(`${name} joined`);
})

socket.on('user-discon',name=>{
    addmessage(`${name} left`);
})


const name= window.prompt('enter your name')
addmessage('you joind');
socket.emit('new-user',name);

form.addEventListener('submit',e=>{
    e.preventDefault();
    const message = messageform.value;
    addmessage('You: '+message)
    socket.emit('chat-message',message);
    messageform.value='';
})

function addmessage(message){
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}