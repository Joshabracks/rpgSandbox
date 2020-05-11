let tiles = {};
let tilesWheel = []
// let hexTileArt = [[30, -55], [-30, -55], [-60, 0], [-30, 55], [30, 55], [60, 0], [30, -55]];
let hexTileArt = [[100, 25], [75, 50], [25, 50], [0, 25], [25, 0], [75, 0]];
// let hexTileArtBottom = [[25, 75], [0, 25], [0, 25], [0, 25], [0, 25], [100, 25], [100, 25], [75, 75]];
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
    constructor(name, x, y, z, topColor, topOutline, bottomColor, bottomOutline) {
        this.name = name;
        this.class = "TileSprite";
        this.x = x;
        this.y = y;
        this.z = z;
        this.topColor = topColor;
        this.topOutline = topOutline;
        this.bottomColor = bottomColor;
        this.bottomOutline = bottomOutline;

        tiles[this.name] = this;
        tilesWheel.push(this.name);
        this.TT = document.createElement('canvas');
        renderContainer.appendChild(this.TT);
        this.TT.id = this.name + "TT";
        this.TTContext = this.TT.getContext("2d");
        this.fitTiles();
    }
    fitTiles() {
        this.TT.width = z(102);
        this.TT.height = z(52);
        //top
        this.TTContext.lineWidth = z(2);
        this.TTContext.beginPath();
        this.TTContext.moveTo(z(hexTileArt[0][0] + 1), z(hexTileArt[0][1]) + 1);
        for (let i = 1; i < hexTileArt.length; i++) {
            this.TTContext.lineTo(z(hexTileArt[i][0] + 1), z(hexTileArt[i][1] + 1))
        }
        this.TTContext.fillStyle = this.topColor;
        this.TTContext.strokeStyle = this.topOutline;
        this.TTContext.closePath();
        this.TTContext.stroke();
        this.TTContext.fill();
    }
    draw() {
        ctx.drawImage(this.TT, z(this.x + center.x - 1) - (this.TT.width / 2), z(this.y + center.y - this.z - 1) - (this.TT.height / 2))
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
        this.TT = document.createElement('canvas');
        renderContainer.appendChild(this.TT);
        this.TTContext = this.TT.getContext("2d");
        this.fitTiles();
    }
    fitTiles() {
        //bottom
        this.TT.width = z(102);
        this.TT.height = z(52 + this.z);
        this.TTContext.fillStyle = this.sprite.bottomColor;
        this.TTContext.strokeStyle = this.sprite.bottomOutline;
        this.TTContext.lineWidth = z(2);
        this.TTContext.beginPath()
        this.TTContext.moveTo(z(hexTileArt[0][0]) + 1, z(hexTileArt[0][1] + 1));
        this.TTContext.lineTo(z(hexTileArt[0][0]) + 1, z(hexTileArt[0][1] + 1 + this.z));
        this.TTContext.lineTo(z(hexTileArt[1][0]) + 1, z(hexTileArt[1][1] + 1 + this.z));
        this.TTContext.lineTo(z(hexTileArt[2][0]) + 1, z(hexTileArt[2][1] + 1 + this.z));
        this.TTContext.lineTo(z(hexTileArt[3][0]) + 1, z(hexTileArt[3][1] + 1 + this.z));
        this.TTContext.lineTo(z(hexTileArt[3][0]) + 1, z(hexTileArt[3][1] + 1));
        this.TTContext.closePath();
        this.TTContext.stroke();
        this.TTContext.fill();
        this.TTContext.lineWidth = z(1);
        this.TTContext.strokeRect(z(25), z(25), z(50), z(25 + this.z));
    }
    draw() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.z = this.z;
        ctx.drawImage(this.TT, z(this.x + center.x - 1) - (this.TT.width / 2), z(this.y + center.y + 24) - (this.TT.height))
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



let grassTile = new TileSprite("grassTile", 0, 0, 0, "#24A520", "#1A7715", "#016B01", "#024402");
let dirtTile = new TileSprite("dirtTile", 0, 0, 0, "#725F11", "#3F3516", "#563011", "#3A200A");
let waterTile = new TileSprite("waterTile", 0, 0, 0, "#2162A3", "#5353F9", "#2162A3", "#5353F9");
let sandTile = new TileSprite("sandTile", 0, 0, 0, "#C1B385", "#DDDACA", "#968C60", "#7F7044");
let stoneTile = new TileSprite("stoneTile", 0, 0, 0, "#6D6C68", "#4C4B49", "#494949", "#3F3F3F");
let lavaTile = new TileSprite("lavaTile", 0, 0, 0, "#D83D00", "#F99900", "#D33C00", "#FFAA00");

class HighLightTile {
    constructor() {
        // hexTileArtTop = [[28.866, -59.995], [-28.868, -59.995], [-57.736, -9.995], [-28.868, 40.005], [28.866, 40.005], [57.735, -9.995], [28.866, -59.995]];
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
            ctx.lineWidth = z(5);
            ctx.strokeStyle = "white";
            ctx.beginPath();
            // ctx.moveTo(z(hexTileArt[0][0] + this.x + center.x - 50), z(-hexTileArt[0][1] + this.y + center.y + 25));
            ctx.moveTo(z(hexTileArt[0][0] + this.x + center.x - 50), z(-hexTileArt[0][1] + this.y + center.y + 25 - this.z));
            ctx.lineTo(z(hexTileArt[1][0] + this.x + center.x - 50), z(-hexTileArt[1][1] + this.y + center.y + 25 - this.z));
            ctx.lineTo(z(hexTileArt[2][0] + this.x + center.x - 50), z(-hexTileArt[2][1] + this.y + center.y + 25 - this.z));
            ctx.lineTo(z(hexTileArt[3][0] + this.x + center.x - 50), z(-hexTileArt[3][1] + this.y + center.y + 25 - this.z));
            ctx.lineTo(z(hexTileArt[4][0] + this.x + center.x - 50), z(hexTileArt[4][1] + this.y + center.y + 25 - this.z));
            ctx.lineTo(z(hexTileArt[5][0] + this.x + center.x - 50), z(hexTileArt[5][1] + this.y + center.y + 25 - this.z));
            ctx.closePath();
            ctx.stroke();
            ctx.moveTo(z(hexTileArt[3][0] + this.x + center.x - 50), z(-hexTileArt[3][1] + this.y + center.y + 25 - this.z));
            ctx.lineTo(z(hexTileArt[3][0] + this.x + center.x - 50), z(-hexTileArt[3][1] + this.y + center.y + 25));
            ctx.lineTo(z(hexTileArt[4][0] + this.x + center.x - 50), z(hexTileArt[4][1] + this.y + center.y + 25));
            ctx.lineTo(z(hexTileArt[5][0] + this.x + center.x - 50), z(hexTileArt[5][1] + this.y + center.y + 25));
            ctx.lineTo(z(hexTileArt[0][0] + this.x + center.x - 50), z(-hexTileArt[0][1] + this.y + center.y + 25))
            ctx.lineTo(z(hexTileArt[0][0] + this.x + center.x - 50), z(-hexTileArt[0][1] + this.y + center.y + 25 - this.z))
            // ctx.lineTo(z(hexTileArt[1][0] + this.x + center.x - 50), z(-hexTileArt[1][1] + this.y + center.y + 25 - this.z));
            // ctx.lineTo(z(hexTileArt[2][0] + this.x + center.x - 50), z(-hexTileArt[2][1] + this.y + center.y + 25 - this.z));
            ctx.stroke();
        }
        // ctx.globalAlpha = 0.5;
        // ctx.fillStyle = "white";
        // ctx.strokeStyle = "black";
        // ctx.lineWidth = z(7);
        // ctx.beginPath();
        // ctx.moveTo(z(hexTileArtTop[0][0] + this.x + center.x), z(hexTileArtTop[0][1] + this.y + center.y - this.z));
        // for (let i = 1; i < hexTileArtTop.length; i++) {
        //     ctx.lineTo(z(hexTileArtTop[i][0] + this.x + center.x), z(hexTileArtTop[i][1] + this.y + center.y - this.z))
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

