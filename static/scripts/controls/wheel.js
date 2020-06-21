document.addEventListener('wheel', function (e) {
    if (hilightedTileList && hilightedTileList.length > 1) {
        console.log(hilightedTileList);
        for (let i = 0; i < hilightedTileList.length; i++) {
            let tile = hilightedTileList[i];
            if (tile == hilightedTile) {
                if (i < hilightedTileList.length - 1) {
                    hilightedTile = hilightedTileList[i + 1];
                } else {
                    hilightedTile = hilightedTileList[0];
                }
                break;
            }
        }
    } else if (!drag) {
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
                zoom -= .25
                h2 = h1 - zo(canvas.clientHeight)
                w2 = w1 - zo(canvas.clientWidth)
                center.y -= h2 / 2;
                center.x -= w2 / 2;
                reRender = true;
            }
        } else {
            if (zoom < 2) {
                h1 = zo(canvas.clientHeight)
                w1 = zo(canvas.clientWidth)
                zoom += .25;
                h2 = h1 - zo(canvas.clientHeight)
                w2 = w1 - zo(canvas.clientWidth)
                center.y -= h2 / 2;
                center.x -= w2 / 2;
                reRender = true;
            }
        }
    }
})