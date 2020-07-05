
document.onkeydown = function (e) {
    if (e.keyCode == 69) {
        console.log("DIST")
        if (!distancer) {
            distancer = { center: {}, end: {} }
        }
    }
    if (e.code == "Space") {
        drag = true
        originCoord.x1 = clientLoc.x
        originCoord.y1 = clientLoc.y
        originCoord.x2 = center.x
        originCoord.y2 = center.y
    }
    if (e.key == "Shift") {
        if (activeCharacter) {
            let char = new Character(activeCharacter.name, activeCharacter.x, activeCharacter.y, activeCharacter.images, activeCharacter.primaryColor, activeCharacter.secondaryColor, activeCharacter.size)
            char.id = Date.now()
            characters.push(char)
            characterUpdate(char)
        }
    }
    if (e.keyCode == 82) {
        roll = true;
    }
    if (e.key == "ArrowRight") {
        let idx = centerTile();
        console.log(idx)
        map.orientation++;
        if (map.orientation > 5) {
            map.orientation = 0;
        }
        map.orderWorld();
        center.x = map.world[idx[0]][idx[1]].x - (width / 2);
        center.y = map.world[idx[0]][idx[1]].y - (height / 2);
    }
    if (e.key == "ArrowLeft") {
        let idx = centerTile();
        console.log(idx)
        map.orientation--;
        if (map.orientation < 0) {
            map.orientation = 5;
        }
        map.orderWorld();
        center.x = map.world[idx[0]][idx[1]].x - (width / 2);
        center.y = map.world[idx[0]][idx[1]].y - (height / 2);
    }
    // if (e.key = "Delete") {
    //     let ts = activeCharacter.id
    //     let temp = []
    //     for (let i = 0; i < characters.length; i++) {
    //         if (characters[i].id != ts) {
    //             temp.push(characters[i])
    //         }
    //     }
    //     characters = temp;
    // }
}

function centerTile() {
    for (let i = 0; i < map.drawIndex.length; i++) {
        var idx = map.drawIndex[i]
        var tile = map.world[idx[0]][idx[1]];
        var pp = pointProx([tile.x, tile.y], [getX({ clientX: width / 2 }), getY({ clientY: height / 2 })]);
        if (pp < 50) {
            console.log(idx)
            return JSON.parse(JSON.stringify(idx));
        }
    }
}