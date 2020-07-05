const socket = io();
socket.on('greeting', function (data) {
    // console.log(data.msg);
    id = data.id;
    socket.emit('thankyou', { msg: 'Thank you for connecting me! -Client', id: id });
});
socket.on('gimme', function (data) {
    // console.log('sending first')
    if (data.first) {
        socket.emit('firstUpdate', { characters: characters, drawQ: drawQ })
    }
})
socket.on('initialUpdate', function (data) {
    // console.log('First Update')
    for (var character in data.characters) {
        characters.forEach((cha) => {
            if (cha.id == character) {
                cha.x = data.characters[character].x;
                cha.y = data.characters[character].y;
                cha.direction = data.characters[character].direction
            }
        })
    }
    for (var line in data.drawQ) {
        let polyLine = new Polyline(data.drawQ[line].points, data.drawQ[line].x, data.drawQ[line].y, data.drawQ[line].color, data.drawQ[line].width)
        polyLine.id = data.drawQ[line].id
        drawQ.push(polyLine)
    }
    // drawScreen()
})
socket.on('characterUpdate', function (data) {
    characters.forEach((character) => {
        if (character.id == data.character.id) {
            let lock = false;
            if (character.x != data.character.x) {
                character.x = data.character.x;
                lock = true;
            }
            if (character.y != data.character.y) {
                character.y = data.character.y;
                lock = true;
            }
            if (character.direction != data.character.direction) {
                character.direction = data.character.direction
                lock = true;
            }
            if (lock) {
                character.lock = Date.now()
            }
        }
    })
    // drawScreen()
})
socket.on('newLine', function (data) {
    let thisLine = new Polyline(data.line.points, data.line.x, data.line.y, data.line.color, data.line.width)
    thisLine.id = data.line.id
    drawQ.push(thisLine)
    // drawScreen()
})
socket.on('erase', function (data) {
    let len = JSON.parse(JSON.stringify(drawQ.length));
    let temp = []
    for (let j = 0; j < len; j++) {
        if (data.line.id != drawQ[j].id) {
            temp.push(drawQ[j])
        }
    }
    drawQ = temp;
    // drawScreen()
})
socket.on('newCharacter', function(data){
    characters.push(data.character)
})

function characterUpdate(character) {
    character.timestamp = Date.now()
    socket.emit("characterUpdate", { character: character })
}

// let mapper = JSON.parse(JSON.stringify(map))

// let packetTest = 0;
// let packetTimer = Date.now();
// let timeOuter = setTimeout(function(){
//     console.log('packet start')
//     socket.emit('packet', map)
// },5000)
// socket.on('packit', function(data){
//     console.log('packet')
//     packetTest = Date.now() - packetTimer;
//     packetTimer = Date.now();
//     socket.emit('packet', map)
// })