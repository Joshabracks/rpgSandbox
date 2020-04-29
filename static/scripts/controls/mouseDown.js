
document.addEventListener('mousedown', function (e) {
    if (e.button == 0) {
        let button = buttonProx(e);
        if (button) {
            // console.log('clicking', button.name)
            button.click()
            // drawScreen()
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
    if (e.button == 2) {
        if (editMap) {
            painting = true;
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