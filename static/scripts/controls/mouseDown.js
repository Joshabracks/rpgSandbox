
document.addEventListener('mousedown', function (e) {
    if (e.button == 0) {
        let button = buttonProx(e);
        if (button) {
            // console.log('clicking', button.name)
            button.click()
            drawScreen()
        } else if (activeCharacter) {
            if (!activeCharacter.lock || Date.now() - activeCharacter.lock > 1000) {
                mode = 'activeCharacter';
                originCoord.x1 = clientLoc.x
                originCoord.y1 = clientLoc.y
                originCoord.x2 = parseInt(activeCharacter.x)
                originCoord.y2 = parseInt(activeCharacter.y)
            }
        } else if (mode == 'draw') {
            startDrawing(e)
        } else if (mode == 'erase') {
            startErasing(e)
            showEraser = true;
        }
    }
    if (e.button == 2) {
        if (activeCharacter) {
            activeCharacter.direction++;
            if (activeCharacter.direction > 6) {
                activeCharacter.direction = 1;
            }
            characterUpdate(activeCharacter)
            drawScreen()
        } else {
            mode = "erase";
            erasing = true;
            showEraser = true;
            eraserLine(e)
            rush = true
            drawScreen()
        }
    }
    if (e.button == 1) {
        e.preventDefault()
        drag = true
        originCoord.x1 = clientLoc.x
        originCoord.y1 = clientLoc.y
        originCoord.x2 = parseInt(center.x)
        originCoord.y2 = parseInt(center.y)
    }
})