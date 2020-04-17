document.addEventListener('mousemove', function (e) {
    die.pitch = e.clientX * 0.0001;
    die.roll = e.clientY * 0.0001;
    clientLoc.x = e.clientX
    clientLoc.y = e.clientY
    if (drag) {
        center.x = originCoord.x2 + zo(e.clientX - originCoord.x1)
        center.y = originCoord.y2 + zo(e.clientY - originCoord.y1)
        // drawScreen()
    } else if (drawing) {
        let tempX = getX(e)
        let tempY = getY(e)
        if (Math.abs(tempX - drawQ[drawing - 1].points[drawQ[drawing - 1].points.length - 1][0]) > minStep || Math.abs(tempY - drawQ[drawing - 1].points[drawQ[drawing - 1].points.length - 1][1]) > minStep) {
            drawQ[drawing - 1].points.push([tempX, tempY])
        }
        // drawScreen();
    } else if (erasing) {
        eraserLine(e)
        // drawScreen()
    } else if (mode == 'activeCharacter') {
        if (snap) {
            activeCharacter.x = (Math.floor((getX(e) - zo(60)) / 173) * 173) + xsize
            activeCharacter.y = Math.floor(getY(e) / ysize) * ysize
            if (activeCharacter.y % 100 != 50) {
                activeCharacter.x -= 86.5
            }
        } else {
            activeCharacter.x = getX(e) - 60
            activeCharacter.y = getY(e) - 55
        }
        if (Date.now() - 30 > updateStep) {
            characterUpdate(activeCharacter)
        }
        // drawScreen()
    } else {
        let active = false;
        let tempX = getX(e);
        let tempY = getY(e);
        characters.forEach((character) => {
            if (pointProx([character.x + 60, character.y + 55], [tempX, tempY]) < 60) {
                active = true;
                activeCharacter = character;
            }
        })
        if (!active) {
            activeCharacter = false;
        } else {
            // drawScreen()
        }
    }
})