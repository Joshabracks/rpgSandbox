let tiles = {};
let tilesWheel = []
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
        this.bottomTile = [[-28.868, 55.005], [-57.736, 5.005], [-57.736, -9.995], [-57.736, -9.995], [57.735, -9.995], [57.735, -9.995], [57.735, 5.005], [28.866, 55.005]];
        tiles[this.name] = this;
        tilesWheel.push(this.name);
    }
    draw() {
        ctx.fillStyle = this.bottomColor;
        ctx.strokeStyle = this.bottomOutline;
        ctx.lineWidth = 4;
        ctx.beginPath()
        ctx.moveTo(this.bottomTile[0][0] + this.x + center.x, this.bottomTile[0][1] + this.y + center.y);
        ctx.lineTo(this.bottomTile[1][0] + this.x + center.x, this.bottomTile[1][1] + this.y + center.y);
        ctx.lineTo(this.bottomTile[2][0] + this.x + center.x, this.bottomTile[2][1] + this.y + center.y);
        ctx.lineTo(this.bottomTile[3][0] + this.x + center.x, this.bottomTile[3][1] + this.y + center.y - this.z);
        ctx.lineTo(this.bottomTile[4][0] + this.x + center.x, this.bottomTile[4][1] + this.y + center.y - this.z);
        ctx.lineTo(this.bottomTile[5][0] + this.x + center.x, this.bottomTile[5][1] + this.y + center.y);
        ctx.lineTo(this.bottomTile[6][0] + this.x + center.x, this.bottomTile[6][1] + this.y + center.y);
        ctx.lineTo(this.bottomTile[7][0] + this.x + center.x, this.bottomTile[7][1] + this.y + center.y);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.strokeRect(-25.868 + center.x + this.x, -9.995 - this.z + center.y + this.y, 57.736, 65 + this.z);
        ctx.fillRect(-25.868 + center.x + this.x, -9.995 - this.z + center.y + this.y, 57.736, 65 + this.z);
        ctx.beginPath();
        ctx.moveTo(this.topTile[0][0] + this.x + center.x, this.topTile[0][1] + this.y + center.y - this.z);
        for (let i = 1; i < this.topTile.length; i++) {
            ctx.lineTo(this.topTile[i][0] + this.x + center.x, this.topTile[i][1] + this.y + center.y - this.z)
        }
        ctx.fillStyle = this.topColor;
        ctx.strokeStyle = this.topOutline;
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
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

class HighLightTile {
    constructor(){
    this.topTile = [[28.866, -59.995], [-28.868, -59.995], [-57.736, -9.995], [-28.868, 40.005], [28.866, 40.005], [57.735, -9.995], [28.866, -59.995]];
    this.bottomTile = [[-28.868, 55.005], [-57.736, 5.005], [-57.736, -9.995], [-57.736, -9.995], [57.735, -9.995], [57.735, -9.995], [57.735, 5.005], [28.866, 55.005]];
    this.y = 0;
    this.x = 0;
    this.z = 0;
    }
    draw () {
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(this.topTile[0][0] + this.x + center.x, this.topTile[0][1] + this.y + center.y - this.z);
        for (let i = 1; i < this.topTile.length; i++) {
            ctx.lineTo(this.topTile[i][0] + this.x + center.x, this.topTile[i][1] + this.y + center.y - this.z)
        }
        ctx.fillStyle = "black";
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.globalAlpha = 1;
    }
}

let highLightTile = new HighLightTile();