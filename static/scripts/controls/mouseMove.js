
window.addEventListener('mousemove', function (e) {
    function tileHilight() {
        var tempHilightedTileList = [];
        map.drawIndex.forEach((idx) => {
            var tile = map.world[idx[0]][idx[1]];
            if (pointProx([tile.x, tile.y - tile.z], [getX(e), getY(e)]) < 50) {
                tempHilightedTileList.push(tile);
                // hilightedTile = tile;
            }
        })
        var isHilighted = false;
        tempHilightedTileList.forEach((tile) => {
            if (tile == hilightedTile) {
                isHilighted = true;
            }
        })
        hilightedTileList = tempHilightedTileList;
        if (!isHilighted && tempHilightedTileList.length) {
            hilightedTile = hilightedTile = hilightedTileList[0];
        }
        if (painting) {
            if (paintBrush.name == "Tree") {
                let tree = new Tree01(hilightedTile.id, 100 + (Math.random() * 200), (Math.random() * 10) + 10)
                if (hilightedTile.characters[0]) {
                    hilightedTile.characters[0] = tree;
                } else {
                    hilightedTile.characters.push(tree)
                }
            } else if (paintBrush.name == "Delete") {
                hilightedTile.characters.pop();
            } else if (hilightedTile.sprite) {
                hilightedTile.sprite = tiles[paintBrush.name];
                hilightedTile.fitTiles();
            }
        }
    }
    clientLoc.x = e.clientX
    clientLoc.y = e.clientY
    if (drag) {
        center.x = originCoord.x2 + zo(e.clientX - originCoord.x1)
        center.y = originCoord.y2 + zo(e.clientY - originCoord.y1)
        // drawScreen()
    } else if (editMap) {
        if (activeTile) {
            activeTile.z = Math.abs(getY(e) - originCoord.y2);
            if (activeTile.z < 0) {
                activeTile.z = 0;
            }
            activeTile.characters.forEach((char) => {
                char.z = activeTile.z
            })
            // highLightTile.z = activeTile.z;
            activeTile.fitTiles();
        } else {
            tileHilight();
        }
    } else if (distancer) {
        distancer.end.x = getX(e);
        distancer.end.y = getY(e);
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
        if (snap && activeCharacter.class == "Character") {
            activeCharacter.x = ((Math.floor(getX(e) / 173) * 173) + xsize)
            activeCharacter.y = (Math.floor(getY(e) / ysize) * ysize)
            if ((activeCharacter.y) % 100 != 50) {
                activeCharacter.x -= 86.5
            }
        } else if (activeCharacter.class == "Die") {
            activeCharacter.x = getX(e)
            activeCharacter.y = getY(e)
        } else {
            activeCharacter.x = getX(e) - 60
            activeCharacter.y = getY(e) - 55
        }
        if (Date.now() - 30 > updateStep) {
            characterUpdate(activeCharacter)
        }
        // drawScreen()
    } else {
        tileHilight();
        let active = false;
        let tempX = getX(e);
        let tempY = getY(e);

        characters.forEach((character) => {
            if (character.class == "Character") {
                if (pointProx([character.x, character.y], [tempX, tempY]) < 60) {
                    active = true;
                    activeCharacter = character;
                }
            } else if (character.class == "Die") {
                if (pointProx([character.x, character.y], [tempX, tempY]) < 60) {
                    active = true;
                    activeCharacter = character;
                }
            }
        })
        if (!active) {
            activeCharacter = false;
        } else {
            // drawScreen()
        }
    }
})