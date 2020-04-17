document.onkeydown = function (e) {
    if (e.code == "Space") {
        drag = true
        originCoord.x1 = clientLoc.x
        originCoord.y1 = clientLoc.y
        originCoord.x2 = center.x
        originCoord.y2 = center.y
        die.r1++;
    }
    if (e.key == "Shift") {
        if (activeCharacter) {
            let char = new Character(activeCharacter.name, activeCharacter.x, activeCharacter.y, activeCharacter.images, activeCharacter.primaryColor, activeCharacter.secondaryColor, activeCharacter.size)
            char.id = Date.now()
            characters.push(char)
            characterUpdate(char)
        }
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