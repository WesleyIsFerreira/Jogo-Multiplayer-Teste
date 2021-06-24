import express from 'express'
import http from 'http'
import createGame from './public/create-game.js'
//import socketio from 'socket.io'
import {Server} from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = new Server(server);

app.use(express.static('public'))

const game = createGame()
game.start()

game.subscribe((command) => {
      console.log('Observer - ' + command.type)
      sockets.emit(command.type, command)
})

sockets.on('connection', (socket) =>{
  const playerId = socket.id
  console.log('>Jogador Conectado no server com o ID: ' + playerId)

  game.addPlayer({playerId: playerId})

  socket.emit('setup', game.state)

  socket.on('disconnect', () => {
    game.removePlayer({playerId: playerId})
    console.log('Jogador desconectado ID: ' + playerId)
  })

  socket.on('move-player', (command) => {
    command.playerId = playerId
    command.type = 'move-player'

    game.movePlayer(command)
  })

})


server.listen(3000, () => {
  console.log(`Rodando na porta 3000`)
})