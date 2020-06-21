function select(e) {
    let button = buttonProx(e);
    if (button) {
        button.click()
    } else if (editMap) {
        map.drawIndex.forEach((idx) => {
            let tile = map.world[idx[0]][idx[1]];
            if (tile.class == "Tile" && pointProx([tile.x, tile.y], [getX(e), getY(e)]) < 50) {
                activeTile = tile;
                originCoord.x1 = zo(clientLoc.x)
                originCoord.y1 = zo(clientLoc.y)
                originCoord.z = tile.z
                originCoord.x2 = tile.x
                originCoord.y2 = tile.y
            }
        })
    } else if (distancer) {
        distancer.center.x = zo(e.clientX);
        distancer.center.y = zo(e.clientY);
    } else if (roll) {
        dice.push(new D10(getX(e), getY(e)))
    } else if (activeCharacter) {
        if (!activeCharacter.lock || Date.now() - activeCharacter.lock > 1000) {
            mode = 'activeCharacter';
            originCoord.x1 = zo(clientLoc.x)
            originCoord.y1 = zo(clientLoc.y)
            originCoord.x2 = activeCharacter.x
            originCoord.y2 = activeCharacter.y
        }
    } else if (mode == 'draw') {
        startDrawing(e)
    } else if (mode == 'erase') {
        startErasing(e)
        showEraser = true;
    }
}

function option(e) {
    if (editMap) {
        painting = true;
        if (paintBrush.class != "TileSprite") {
            let tree = new Tree01(hilightedTile.id, 300 + (Math.random() * 300), (Math.random() * 20) + 20)
            if (hilightedTile.characters[0]) {
                hilightedTile.characters[0] = tree;
            } else {
                hilightedTile.characters.push(tree)
            }
        } else {
            console.log("NOT TREEEEEE")
            hilightedTile.sprite = tiles[paintBrush.name];
            hilightedTile.fitTiles();
        }
    } else if (roll) {
        dice = [];
    } else if (activeCharacter) {
        activeCharacter.direction++;
        if (activeCharacter.direction > 6) {
            activeCharacter.direction = 1;
        }
        characterUpdate(activeCharacter)
    } else {
        mode = "erase";
        erasing = true;
        showEraser = true;
        eraserLine(e)
        rush = true
    }
}

function zoom(e) {
    if (e.deltaY > 0) {
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

function pan(e, stop) {
    if (!drag) {
        drag = true
        originCoord.x1 = clientLoc.x
        originCoord.y1 = clientLoc.y
        originCoord.x2 = center.x
        originCoord.y2 = center.y
    } else if (stop) {
        drag = false;
    } else {
        center.x = originCoord.x2 + zo(e.clientX - originCoord.x1)
        center.y = originCoord.y2 + zo(e.clientY - originCoord.y1)
    }
}

function scroll(x, y) {
    center.x += x;
    center.y += y;
}

function rotate(direction) {
    let idx = centerTile();
    map.orientation += direction;
    if (map.orientation < 0) {
        map.orientation = 5;
    }
    if (map.orientation > 5) {
        map.orientation = 0;
    }
    map.orderWorld();
    center.x = map.world[idx[0]][idx[1]].x - (width / 2);
    center.y = map.world[idx[0]][idx[1]].y - (height / 2);
}