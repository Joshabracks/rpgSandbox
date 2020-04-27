

class HexMap {
    constructor(height, width, tileType) {
        this.height = height;
        this.width = width;
        this.world = {};
        for (let i = 1; i <= height; i++) {
            this.world[i] = {};
            for (let j = 1; j <= width; j++) {
                this.world[i][j] = new HexTile(tileType, 0, 0, 0, 1);
            }
        }
        // for (let i = 1; i <= this.height; i++) {
        //     this.world[i] = {};
        //     for (let j = 1; j <= this.width; j++) {
        //         this.world[i][j] = {};
        //     }
        // }
        this.orientation = 1;
        this.orderWorld()
        this.originalWorld = JSON.parse(JSON.stringify(this.world));
        let tx = this.originalWorld[1][1].x;
        let bx = this.originalWorld[2][this.width].x;
        let ty = this.originalWorld[1][1].y;
        let by = this.originalWorld[this.height][1].y;
        this.pivot = { x: Math.mean([tx, bx]), y: Math.mean([ty, by]) };
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
        if (this.orientation == 1) {
            for (let h = 1; h <= this.height; h++) {
                for (let w = 1; w <= this.width; w++) {
                    let tile = this.world[h][w];
                    // if (tile.x > zo(-180)  && tile.x < zo(canvas.width + center.x + 180)  && tile.y > zo(-110)  && tile.y < zo(canvas.height + 110 + center.y) ) {
                        tile.draw();
                    // }
                }
            }
        } else if (this.orientation == 2) {
            for (let w = this.width; w >= 1; w--) {
                for (let h = 1; h <= this.height; h++) {
                    this.world[h][w].draw();
                }
            }
        } else if (this.orientation == 3) {
            for (let w = this.width; w >= 1; w--) {
                for (let h = this.height; h >= 1; h--) {
                    this.world[h][w].draw();
                }
            }
        } else if (this.orientation == 4) {
            for (let h = this.height; h >= 1; h--) {
                for (let w = this.width; w >= 1; w--) {
                    this.world[h][w].draw();
                }
            }
        } else if (this.orientation == 5) {
            for (let h = 1; h <= this.height; h++) {
                for (let w = this.width; w >= 1; w++) {
                    this.world[h][w].draw();
                }
            }
        } else if (this.orientation == 6) {
            for (let w = 1; w <= this.width; w++) {
                for (let h = 1; h <= this.height; h++) {
                    this.world[h][w].draw();
                }
            }
        }
    }
}