document.addEventListener('mousemove', function (e) {
    clientLoc.x = e.clientX
    clientLoc.y = e.clientY
    if (drag) {
        center.x = originCoord.x2 + (e.clientX - originCoord.x1)
        center.y = originCoord.y2 + (e.clientY - originCoord.y1)
        drawScreen()
    } else if (drawing) {
        let tempX = getX(e)
        let tempY = getY(e)
        if (Math.abs(tempX - drawQ[drawing - 1].points[drawQ[drawing - 1].points.length - 1][0]) > minStep || Math.abs(tempY - drawQ[drawing - 1].points[drawQ[drawing - 1].points.length - 1][1]) > minStep) {
            drawQ[drawing - 1].points.push([tempX, tempY])
        }
        drawScreen();
    } else if (erasing) {
        eraserLine(e)
        drawScreen()
    } else if (mode == 'activeCharacter') {
        if (snap) {
            activeCharacter.x = (Math.floor((originCoord.x2 + (e.clientX - originCoord.x1)) / 173) * 173) + xsize
            activeCharacter.y = Math.floor((originCoord.y2 + (e.clientY - originCoord.y1)) / ysize) * ysize
            if (activeCharacter.y % 100 != 50) {
                activeCharacter.x -= 86.5
            }
        } else {
            activeCharacter.x = originCoord.x2 + (e.clientX - originCoord.x1)
            activeCharacter.y = originCoord.y2 + (e.clientY - originCoord.y1)
        }
        if (Date.now() - 30 > updateStep) {
            characterUpdate(activeCharacter)
        }
        drawScreen()
    } else {
        let active = false;
        characters.forEach((character) => {
            if (pointProx([character.x + center.x + 60, character.y + center.y + 55], [e.clientX, e.clientY]) < 60) {
                active = true;
                activeCharacter = character;
            }
        })
        if (!active) {
            activeCharacter = false;
        } else {
            drawScreen()
        }
    }
})