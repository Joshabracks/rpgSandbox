document.addEventListener('wheel', function (e) {
    if (!drag) {
        if (activeCharacter) {
            if (e.deltaY > 0) {
                activeCharacter.z++
            } else {
                activeCharacter.z--
            }
        } else if (e.deltaY > 0) {
            if (zoom > 0.25) {
                h1 = zo(canvas.clientHeight)
                w1 = zo(canvas.clientWidth)
                zoom *= .95
                h2 = h1 - zo(canvas.clientHeight)
                w2 = w1 - zo(canvas.clientWidth)
                center.y -= h2 / 2;
                center.x -= w2 / 2;
            }
        } else {
            if (zoom < 2) {
                h1 = zo(canvas.clientHeight)
                w1 = zo(canvas.clientWidth)
                zoom *= 1.05;
                h2 = h1 - zo(canvas.clientHeight)
                w2 = w1 - zo(canvas.clientWidth)
                center.y -= h2 / 2;
                center.x -= w2 / 2;
            }
        }
    }
})