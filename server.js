import express from 'express'
import http from 'http'
import createGame from './public/create-game.js'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const game = createGame()

game.addPlayer({playerId: 'player1', playerX: 0, playerY: 0})
game.addPlayer({playerId: 'player2', playerX: 1, playerY: 3})
game.addPlayer({playerId: 'player3', playerX: 4, playerY: 4})
game.addFruit({fruitId: 'fruit1', fruitX: 6, fruitY: 4})
game.addFruit({fruitId: 'fruit2', fruitX: 4, fruitY: 8})

sockets.on('connection', (socket) =>{
  const playerId = socket.id
})


server.listen(3000, () => {
  console.log(`Rodando na porta 3000`)
})