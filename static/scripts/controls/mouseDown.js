
document.addEventListener('mousedown', function (e) {
    if (e.button == 0) {
        let button = buttonProx(e);
        if (button) {
            button.click()
        } else if (editMap) {
            // map.drawIndex.forEach((idx) => {
            //     let tile = map.world[idx[0]][idx[1]];
            //     if (tile.class == "Tile" && pointProx([tile.x, tile.y], [getX(e), getY(e)]) < 50) {
            if (hilightedTile) {
                activeTile = hilightedTile;
                originCoord.x1 = zo(clientLoc.x)
                originCoord.y1 = zo(clientLoc.y)
                originCoord.z = hilightedTile.z
                originCoord.x2 = hilightedTile.x
                originCoord.y2 = hilightedTile.y
            }
            //     }
            // })
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
    if (e.button == 2) {
        if (editMap) {
            painting = true;
            if (paintBrush.class != "TileSprite") {
                if (paintBrush.name == "Tree") {
                    let tree = new Tree01(hilightedTile.id, 100 + (Math.random() * 200), (Math.random() * 10) + 10)
                    // console.log(tree)
                    // console.log(hilightedTile)
                    if (hilightedTile.characters[0]) {
                        hilightedTile.characters[0] = tree;
                    } else {
                        hilightedTile.characters.push(tree)
                    }
                } else if (paintBrush.name == "Delete") {
                    hilightedTile.characters.pop();
                }
            } else if (hilightedTile.sprite) {
                console.log("HIT")
                hilightedTile.sprite = tiles[paintBrush.name];
                hilightedTile.fitTiles();
            }
            // characters.forEach((tile) => {
            //     if (tile.class == "Tile" && pointProx([tile.x, tile.y], [getX(e), getY(e)]) < 50) {
            //         activeTile = tile;
            //     }
            // })
            // let changed = false;
            // for (let i = 0; i < tilesWheel.length; i++) {
            //     if (!changed) {
            //         if (activeTile.tile == tilesWheel[i]) {
            //             console.log(activeTile.tile)
            //             let nextTile = i + 1;
            //             if (nextTile < tilesWheel.length) {
            //                 activeTile.tile = tilesWheel[nextTile]
            //                 changed = true;
            //             } else {
            //                 activeTile.tile = tilesWheel[0]
            //                 changed = true;
            //             }
            //         }
            //     }
            // }
            // activeTile = false;
        } else if (roll) {
            dice = [];
            // let temp = []
            // dice.forEach((character) => {
            //     if (character.class != "Die") {
            //         temp.push(character);
            //     }
            //     dice = temp;
            // })
        } else if (activeCharacter) {
            activeCharacter.direction++;
            if (activeCharacter.direction > 6) {
                activeCharacter.direction = 1;
            }
            characterUpdate(activeCharacter)
            // drawScreen()
        } else {
            mode = "erase";
            erasing = true;
            showEraser = true;
            eraserLine(e)
            rush = true
            // drawScreen()
        }
    }
    if (e.button == 1) {
        e.preventDefault()
        drag = true
        originCoord.x1 = clientLoc.x
        originCoord.y1 = clientLoc.y
        originCoord.x2 = center.x
        originCoord.y2 = center.y
    }
})