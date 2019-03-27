const
    express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    PORT = 3010

app.use(express.static(__dirname + '/templates'))

io.on('connection', socket => {
    console.log('a loser connected')

    socket.on('match_update', function (data) {
        io.emit('match_update', data)
    })

    socket.on('disconnect', function () {
        console.log('user disconnected')
    })
})

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`)
})
