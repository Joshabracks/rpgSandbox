
let rotor = 30;

class HexMap {
    constructor(size) {
        // this.size = size;
        let jMoob = 100;
        this.world = [[new HexTile("grassTile", 0, 0, jMoob, 1)]];
        this.drawIndex = [[0, 0]];
        let tree = false;
        this.fullRender = false;
        for (let i = 1; i < size; i++) {
            this.world[i] = [];
            for (let j = 0; j < i * 6; j++) {
                let tiler = "grassTile";
                // if (jMoob < 0) {
                //     jMoob = 0;
                // }
                // jMoob = Math.random() * (i * 20) + (i * 15);
                // if (jMoob < 50) {
                //     jMoob = 50;
                //     tiler = "waterTile"
                // } else if (jMoob < 75) {
                //     tiler = "sandTile";
                // } else if (Math.random() * 10 > 9) {
                //     tiler = "dirtTile";
                //     if (jMoob > 100) {
                //         jMoob = 100 + (Math.random() * 10)
                //     }
                // } else if (Math.random() * 10 > 9) {
                //     tiler = "stoneTile";
                //     jMoob = (Math.random() * 25) + 100
                // } else if (Math.random() * 20 > 19) {
                //     tree = true;
                // }
                // if (tiler == "grassTile" && jMoob > 100) {
                //     jMoob = 100 + (Math.random() * 10)
                // }
                let tile = new HexTile(tiler, 0, 0, jMoob, 1);
                tile.id = [i, j]
                if (tree) {
                    tile.characters.push(new Tree01([i, j], 100 + (Math.random() * 200), (Math.random() * 10) + 10))
                }
                tree = false;
                this.world[i].push(tile);
                this.drawIndex.push([i, j]);
            }
        }
        this.fullRender = true;
        this.angle = 0;
        this.orientation = 0;
        this.orderWorld()
        this.world[0][0].characters[0] = new Character("images/temp/woman01", this.world[0][0].x, this.world[0][0].y, this.world[0][0].z)
        // this.originalWorld = JSON.parse(JSON.stringify(this.world));
        // let tx = this.originalWorld[1][1].x;
        // let bx = this.originalWorld[2][this.width].x;
        // let ty = this.originalWorld[1][1].y;
        // let by = this.originalWorld[this.height][1].y;
        // this.pivot = { x: Math.mean([tx, bx]), y: Math.mean([ty, by]) };
        // this.drawIndex = this.sortDrawOrder(this.drawIndex);
        // for (this.angle = )
    }
    orderWorld() {
        //assigns x/y coords to tiles
        let drawQ = {}
        this.world[0][0].characters.forEach((character) => {
            character.orientation = this.orientation + character.orientation;
            if (character.orientation > 5) {
                character.orientation = character.orientation - 5;
            }
            console.log(character)
        })
        for (let ring = 1; ring < this.world.length; ring++) {
            let y = ring * 50;
            let x = 0;
            let iPos = ((this.orientation) * ring);
            let rCount = 0;
            let rDir = 0;
            for (let i = 0; i < ring * 6; i++) {
                if (iPos >= ring * 6) {
                    iPos = 0;
                }
                if (rCount >= ring) {
                    rCount = 0;
                    rDir++;
                    if (rDir > 5) {
                        rDir = 0;
                    }
                }
                if (rDir == 0) {
                    x += 75;
                    y -= 25;
                }
                if (rDir == 1) {
                    y -= 50;
                }
                if (rDir == 2) {
                    x -= 75;
                    y -= 25;
                }
                if (rDir == 3) {
                    x -= 75;
                    y += 25;
                }
                if (rDir == 4) {
                    y += 50;
                }
                if (rDir == 5) {
                    x += 75;
                    y += 25;
                }
                this.world[ring][iPos].y = y;
                this.world[ring][iPos].x = x;
                this.world[ring][iPos].characters.forEach((character) => {

                    character.orientation = this.orientation + character.orientation;
                    if (character.orientation > 5) {
                        character.orientation = character.orientation - 5;
                    }

                })

                iPos++;
                rCount++;
                if (!drawQ[y]) {
                    drawQ[y] = [];
                }
                // drawQ[y].push(this.world[ring][iPos])
            }
        }
        // console.log(Object.keys(drawQ).length)
        this.drawIndex = this.sortDrawOrder(this.drawIndex);
        // if (this.orientation == 1) {
        // for (let h = 1; h <= this.height; h++) {
        //     for (let w = 1; w <= this.width; w++) {
        //         if (w % 2 != 0) {
        //             this.world[h][w].y = (100 * h);
        //             this.world[h][w].x = (100 * w);
        //         } else {
        //             this.world[h][w].y = (100 * h) - 50;
        //             this.world[h][w].x = (100 * w);
        //         }
        //     }
        // }
    }
    sortDrawOrder(arr) {
        if (arr.length < 2) {
            return arr;
        }
        let mid = Math.floor(arr.length / 2)
        let pivot = arr[mid];
        let lower = [];
        let higher = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] != pivot) {
                if (this.world[arr[i][0]][arr[i][1]].y > this.world[pivot[0]][pivot[1]].y || (this.world[arr[i][0]][arr[i][1]].y == pivot.y)) {
                    higher.push(arr[i])
                } else {
                    lower.push(arr[i])
                }
            }
        }
        return this.sortDrawOrder(lower).concat([pivot]).concat(this.sortDrawOrder(higher))
    }
    // rotateWorld() {
    //     if (this.orientation == 1) {
    //         this.orderWorld();
    //     } else {
    //         let angle = this.orientation * 60;
    //         for (let h = 1; h <= this.height; h++) {
    //             for (let w = 1; w <= this.width; w++) {
    //                 let newCoord = rotate2D(this.pivot, this.world[h][w], angle);
    //                 this.world[h][w].x = newCoord.x;
    //                 this.world[h][w].y = newCoord.y;
    //             }
    //         }
    //     }
    // }
    // rotate() {
    //     let angle = this.orientation * 60;
    //     let row = rotor * Math.PI / 180;

    //     this.drawIndex.forEach((idx) => {
    //         let originalPoint = this.originalWorld[idx[0]][idx[1]]
    //         let newPoint = rotate2D(this.pivot, originalPoint, angle);
    //         if (this.orientation == 0 || this.orientation == 3) {
    //             newPoint = {x: newPoint.x * .75, y: newPoint.y * .5}
    //         } else {
    //             newPoint = {x: newPoint.x * .78, y: newPoint.y * .48}
    //         }
    //         this.world[idx[0]][idx[1]].x = newPoint.x;
    //         this.world[idx[0]][idx[1]].y = newPoint.y;
    //     })
    //     this.drawIndex = this.sortDrawOrder(this.drawIndex);
    //     center = rotate2D(this.pivot, {x: center.x + (width / 2), y: center.y + (height / 2)}, angle)
    // }
    draw() {
        for (let i = 0; i < this.drawIndex.length; i++) {
            let tile = this.world[this.drawIndex[i][0]][this.drawIndex[i][1]];
            if (reRender) {
                tile.fitTiles();
            }
            if (z(tile.x + center.x) > -1000 && z(tile.y + center.y) > -1000 && z(tile.x + center.x) < width + 1000 && z(tile.y + center.y - tile.z) < height + 1000) {
                tile.draw();
            }
        }
        // if (this.orientation == 1) {
        //     for (let h = 1; h <= this.height; h++) {
        //         for (let w = 1; w <= this.width; w++) {
        //             let tile = this.world[h][w];
        //             // if (tile.x > zo(-180)  && tile.x < zo(canvas.width + center.x + 180)  && tile.y > zo(-110)  && tile.y < zo(canvas.height + 110 + center.y) ) {
        //                 tile.draw();
        //             // }
        //         }
        //     }
        // } else if (this.orientation == 2) {
        //     for (let w = this.width; w >= 1; w--) {
        //         for (let h = 1; h <= this.height; h++) {
        //             this.world[h][w].draw();
        //         }
        //     }
        // } else if (this.orientation == 3) {
        //     for (let w = this.width; w >= 1; w--) {
        //         for (let h = this.height; h >= 1; h--) {
        //             this.world[h][w].draw();
        //         }
        //     }
        // } else if (this.orientation == 4) {
        //     for (let h = this.height; h >= 1; h--) {
        //         for (let w = this.width; w >= 1; w--) {
        //             this.world[h][w].draw();
        //         }
        //     }
        // } else if (this.orientation == 5) {
        //     for (let h = 1; h <= this.height; h++) {
        //         for (let w = this.width; w >= 1; w++) {
        //             this.world[h][w].draw();
        //         }
        //     }
        // } else if (this.orientation == 6) {
        //     for (let w = 1; w <= this.width; w++) {
        //         for (let h = 1; h <= this.height; h++) {
        //             this.world[h][w].draw();
        //         }
        //     }
        // }
    }
}

// GENERATE MAP default OPTIONS EXAMPLE

function getNeighbors(tileIdx, width) {
    let result = [tileIdx];
    let ring = tileIdx[0];
    let idx = tileIdx[1];
    if (map.world[ring].length == idx) {

    }
}