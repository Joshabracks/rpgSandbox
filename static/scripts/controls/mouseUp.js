document.addEventListener('mouseup', function (e) {
    if (e.button == 0) {
        console.log("MOUSE UP")
        if (drawing) {
            drawStep = 0;
            rush = true;
            socket.emit("newLine", { line: drawQ[drawQ.length - 1] })
            // drawScreen()
            drawing = false;
        }
        if (erasing) {
            drawStep = 0;
            rush = true;
            // drawScreen()
            erasing = false;
            showEraser = false;
        }
        if (mode == 'activeCharacter') {
            mode = 'draw';
            sortCharacters()
            characterUpdate(activeCharacter)
            // drawScreen()
        }
    }
    if (e.button == 2) {
        mode = "draw"
        erasing = false;
        showEraser = false;
        rush = true;
        // drawScreen()
    }
    if (e.button == 1) {
        drag = false;
    }
})