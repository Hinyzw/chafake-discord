const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Rota para a página inicial
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

// Evento para quando o cliente se conecta ao servidor via Socket.io
io.on('connection', (socket) => {
  console.log('Usuário conectado');

  // Evento para quando o cliente envia uma mensagem via Socket.io
  socket.on('chat message', (data) => io.emit('chat message', data));

  // Evento para quando o cliente se desconecta do servidor via Socket.io
  socket.on('disconnect', () => console.log('Usuário desconectado'));
});

// Inicia o servidor na porta 3000
http.listen(3000, () => {
  console.log(`Servidor rodando na porta 3000 - Link http://localhost:3000`);
});
