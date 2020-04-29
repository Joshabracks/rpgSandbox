

class HexMap {
    constructor(height, width, tileType) {
        this.height = height;
        this.width = width;
        this.world = [];
        this.drawIndex = [];
        for (let i = 1; i <= height; i++) {
            this.world[i] = [];
            for (let j = 1; j <= width; j++) {
                this.world[i][j] = new HexTile(tileType, 0, 0, 200, 1);
                this.drawIndex.push([i, j]);
            }
        }
        // for (let i = 1; i <= this.height; i++) {
        //     this.world[i] = {};
        //     for (let j = 1; j <= this.width; j++) {
        //         this.world[i][j] = {};
        //     }
        // }
        this.angle = 0;
        this.orientation = 1;
        this.orderWorld()
        this.originalWorld = JSON.parse(JSON.stringify(this.world));
        let tx = this.originalWorld[1][1].x;
        let bx = this.originalWorld[2][this.width].x;
        let ty = this.originalWorld[1][1].y;
        let by = this.originalWorld[this.height][1].y;
        this.pivot = { x: Math.mean([tx, bx]), y: Math.mean([ty, by]) };
        this.drawIndex = this.sortDrawOrder(this.drawIndex);
    }
    orderWorld() {
        //assigns x/y coords to tiles
        if (this.orientation == 1) {
            for (let h = 1; h <= this.height; h++) {
                for (let w = 1; w <= this.width; w++) {
                    if (w % 2 != 0) {
                        this.world[h][w].y = (110 * h);
                        this.world[h][w].x = (90 * w);
                    } else {
                        this.world[h][w].y = (110 * h) - 55;
                        this.world[h][w].x = (90 * w);
                    }
                }
            }
        }
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
    rotateWorld() {
        if (this.orientation == 1) {
            this.orderWorld();
        } else {
            let angle = this.orientation * 60;
            for (let h = 1; h <= this.height; h++) {
                for (let w = 1; w <= this.width; w++) {
                    let newCoord = rotate2D(this.pivot, this.world[h][w], angle);
                    this.world[h][w].x = newCoord.x;
                    this.world[h][w].y = newCoord.y;
                }
            }
        }
    }
    draw() {
        for (let i = 0; i < this.drawIndex.length; i++) {
            this.world[this.drawIndex[i][0]][this.drawIndex[i][1]].draw();
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