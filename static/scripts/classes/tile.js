let tiles = {};
let tilesWheel = []
// let hexTileArt = [[30, -55], [-30, -55], [-60, 0], [-30, 55], [30, 55], [60, 0], [30, -55]];
let hexTileArt = [[50,0],[50,0],[25,25],[-25,25],[-50,0],[-25,-25],[25,-25],[50,0]];
// let hexTileArt = [[28.866, -59.995], [-28.868, -59.995], [-57.736, -9.995], [-28.868, 40.005], [28.866, 40.005], [57.735, -9.995], [28.866, -59.995]];

var side = 0,
    size = 61,
    x = 0,
    y = 0;

// hexTileArt.push([Math.floor(x + size * Math.cos(0)), Math.floor(y + size * Math.sin(0))]);

// for (side; side < 7; side++) {
//     hexTileArt.push([Math.floor(x + size * Math.cos(side * 2 * Math.PI / 6)), Math.floor(y + size * Math.sin(side * 2 * Math.PI / 6))]);
// }

class TileSprite {
    constructor(name, x, y, z, topTile, topColor, topOutline, bottomColor, bottomOutline) {
        this.name = name;
        this.class = "TileSprite";
        this.x = x;
        this.y = y;
        this.z = z;
        this.topTile = topTile;
        this.topColor = topColor;
        this.topOutline = topOutline;
        this.bottomColor = bottomColor;
        this.bottomOutline = bottomOutline;
        this.bottomTile = [[-25, 50], [-50, 2], [-50, 2], [-50, 2], [50, 2], [50, 2], [50, 2], [25, 50]];
        tiles[this.name] = this;
        tilesWheel.push(this.name);
    }
    draw() {
        ctx.fillStyle = this.bottomColor;
        ctx.strokeStyle = this.bottomOutline;
        ctx.lineWidth = z(4);
        ctx.beginPath()
        ctx.moveTo(z(this.bottomTile[0][0] + this.x + center.x), z(this.bottomTile[0][1] + this.y + center.y));
        ctx.lineTo(z(this.bottomTile[1][0] + this.x + center.x), z(this.bottomTile[1][1] + this.y + center.y));
        ctx.lineTo(z(this.bottomTile[2][0] + this.x + center.x), z(this.bottomTile[2][1] + this.y + center.y));
        ctx.lineTo(z(this.bottomTile[3][0] + this.x + center.x), z(this.bottomTile[3][1] + this.y + center.y - this.z));
        ctx.lineTo(z(this.bottomTile[4][0] + this.x + center.x), z(this.bottomTile[4][1] + this.y + center.y - this.z));
        ctx.lineTo(z(this.bottomTile[5][0] + this.x + center.x), z(this.bottomTile[5][1] + this.y + center.y));
        ctx.lineTo(z(this.bottomTile[6][0] + this.x + center.x), z(this.bottomTile[6][1] + this.y + center.y));
        ctx.lineTo(z(this.bottomTile[7][0] + this.x + center.x), z(this.bottomTile[7][1] + this.y + center.y));
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.lineWidth = z(2);
        ctx.strokeRect(z(-30 + center.x + this.x), z(-this.z + center.y + this.y), z(60), z(50 + this.z));
        ctx.beginPath();
        ctx.moveTo(z(this.topTile[0][0] + this.x + center.x), z(this.topTile[0][1] + this.y + center.y - this.z));
        for (let i = 1; i < this.topTile.length; i++) {
            ctx.lineTo(z(this.topTile[i][0] + this.x + center.x), z(this.topTile[i][1] + this.y + center.y - this.z))
        }
        ctx.fillStyle = this.topColor;
        ctx.strokeStyle = this.topOutline;
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
}

class Tile {
    constructor(x, y, z, tile) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.tile = tile;
        this.class = "Tile";
        this.bottomTile = [[-28.868, 55.005], [-57.736, 5.005], [-57.736, -9.995], [-57.736, -9.995], [57.735, -9.995], [57.735, -9.995], [57.735, 5.005], [28.866, 55.005]];
    }
    draw() {
        tiles[this.tile].x = this.x;
        tiles[this.tile].y = this.y;
        tiles[this.tile].z = this.z;
        if (this.highLight) {
            tiles[this.tile].highLight = true;
        } else {
            tiles[this.tile].highLight = false;
        }
        tiles[this.tile].draw();
    }
}



class HexTile {
    constructor(TileSprite, x, y, z, orientation) {
        this.class = "Tile";
        this.sprite = tiles[TileSprite];
        this.x = x;
        this.y = y;
        this.z = z;
        this.orientation = orientation;
        this.characters = [];
    }
    draw() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.z = this.z;
        this.sprite.draw();
        this.characters.forEach((character => {
            character.draw()
        }))
    }
    give(characterIdx, tile) {
        if (tile.class != "HexTile") {
            return false;
        }
        let temp = [];
        for (let i = 0; i < this.characters.length; i++) {
            if (i == characterIdx) {
                tile.get(this.characters.shift());
            } else {
                temp.push(this.characters.shift());
            }
        }
        this.characters = temp;
    }
    get(character) {
        this.characters.push(character);
        this.sortCharacters();
    }
    sortCharacters() {
        function quickSort() {
            if (arr.length < 2) {
                return arr;
            }
            let mid = Math.floor(arr.length / 2)
            let pivot = arr[mid];
            let lower = [];
            let higher = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] != pivot) {
                    if (arr[i].y > pivot.y || (arr[i].y == pivot.y)) {
                        higher.push(arr[i])
                    } else {
                        lower.push(arr[i])
                    }
                }
            }
            return quickSort(lower).concat([pivot]).concat(quickSort(higher))
        }
        this.characters = this.quickSort(this.characters);
    }
}



let grassTile = new TileSprite("grassTile", 0, 0, 0, hexTileArt, "#24A520", "#1A7715", "#725F11", "#3F3516");
let dirtTile = new TileSprite("dirtTile", 0, 0, 0, hexTileArt, "#725F11", "#3F3516", "#725F11", "#3F3516");
let waterTile = new TileSprite("waterTile", 0, 0, 0, hexTileArt, "#2162A3", "#5353F9", "#2162A3", "#5353F9");
let sandTile = new TileSprite("sandTile", 0, 0, 0, hexTileArt, "#C1B385", "#DDDACA", "#968C60", "#7F7044");
let stoneTile = new TileSprite("stoneTile", 0, 0, 0, hexTileArt, "#6D6C68", "#4C4B49", "#606060", "#3F3F3F");
let lavaTile = new TileSprite("lavaTile", 0, 0, 0, hexTileArt, "#D83D00", "#F99900", "#D33C00", "#FFAA00");

class HighLightTile {
    constructor() {
        // this.topTile = [[28.866, -59.995], [-28.868, -59.995], [-57.736, -9.995], [-28.868, 40.005], [28.866, 40.005], [57.735, -9.995], [28.866, -59.995]];
        // this.bottomTile = [[-28.868, 55.005], [-57.736, 5.005], [-57.736, -9.995], [-57.736, -9.995], [57.735, -9.995], [57.735, -9.995], [57.735, 5.005], [28.866, 55.005]];
        this.tile = tiles["stoneTile"];
        this.y = 0;
        this.x = 0;
        this.z = 0;
    }
    draw() {
        if (hilightedTile) {
            this.tile.x = hilightedTile.x;
            this.tile.y = hilightedTile.y;
            this.tile.z = hilightedTile.z;
            ctx.globalAlpha = 0.5;
            this.tile.draw();
            ctx.globalAlpha = 1;
        }
        // ctx.globalAlpha = 0.5;
        // ctx.fillStyle = "white";
        // ctx.strokeStyle = "black";
        // ctx.lineWidth = z(7);
        // ctx.beginPath();
        // ctx.moveTo(z(this.topTile[0][0] + this.x + center.x), z(this.topTile[0][1] + this.y + center.y - this.z));
        // for (let i = 1; i < this.topTile.length; i++) {
        //     ctx.lineTo(z(this.topTile[i][0] + this.x + center.x), z(this.topTile[i][1] + this.y + center.y - this.z))
        // }
        // ctx.fillStyle = "black";
        // ctx.strokeStyle = "white";
        // ctx.stroke();
        // ctx.fill();
        // ctx.closePath();
        // ctx.globalAlpha = 1;
    }
}
let highLightTile = new HighLightTile();

