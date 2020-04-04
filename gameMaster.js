
let characters = {}
let drawQ = {}
let first = true;

module.exports = function (io) {

    io.on('connection', function (socket) {
        socket.emit('greeting', { msg: 'RPG Sandbox: Connected.', id: socket.id });
        socket.on('thankyou', function (data) {
            console.log('handshake complete')
            if (first) {
                socket.emit('gimme', {first: first})
                first = false;
            } else {
                socket.emit('initialUpdate', { characters: characters, drawQ: drawQ })
            }
        });
        socket.on('firstUpdate', function(data) {
            data.characters.forEach((character) => { 
                characters[character.id] = character;
            })
            data.drawQ.forEach((line) => {
                drawQ[line.id] = line;
            })
        })
        socket.on('characterUpdate', function (data) {
            characters[data.character.id] = data.character;
            socket.broadcast.emit('characterUpdate', { character: data.character })
        })
        socket.on('disconnect', function (data) {
            console.log(data)
        });
        socket.on('newLine', function(data){
            drawQ[data.line.id] = data.line;
            socket.broadcast.emit('newLine', {line: data.line})
        });
        socket.on('erase', function(data){
            delete drawQ[data.line.id]
            socket.broadcast.emit('erase', {line: data.line})
        })
    });
}