
class Tree01 {
    constructor(parent, height, width) {
        this.parent = parent;
        this.height = height;
        this.width = width;
        this.class = "Environment";
        this.leavesColor = "rgb(" + ((Math.random() * 100)) + "," + ((Math.random() * 100) + 100) + "," + ((Math.random() * 100)) + ")";
        this.trunkColor = "rgb(" + ((Math.random() * 50) + 100) + "," + ((Math.random() * 50) + 50) + "," + ((Math.random() * 50)) + ")";
        this.trunkArt = [
            () => { ctx.moveTo(z(-this.width + map.world[this.parent[0]][this.parent[1]].x + center.x), z(0 + map.world[this.parent[0]][this.parent[1]].y + center.y - map.world[this.parent[0]][this.parent[1]].z)) },
            () => { ctx.bezierCurveTo(z(-this.width + map.world[this.parent[0]][this.parent[1]].x + center.x), z(15 + map.world[this.parent[0]][this.parent[1]].y + center.y - map.world[this.parent[0]][this.parent[1]].z), z(this.width + map.world[this.parent[0]][this.parent[1]].x + center.x), z(15 + map.world[this.parent[0]][this.parent[1]].y + center.y - map.world[this.parent[0]][this.parent[1]].z), z(this.width + map.world[this.parent[0]][this.parent[1]].x + center.x), z(0 + map.world[this.parent[0]][this.parent[1]].y + center.y - map.world[this.parent[0]][this.parent[1]].z)) },
            () => { ctx.lineTo(z(this.width + map.world[this.parent[0]][this.parent[1]].x + center.x), z(-this.height + map.world[this.parent[0]][this.parent[1]].y + center.y - map.world[this.parent[0]][this.parent[1]].z)) },
            () => { ctx.lineTo(z(-this.width + map.world[this.parent[0]][this.parent[1]].x + center.x), z(-this.height + map.world[this.parent[0]][this.parent[1]].y + center.y - map.world[this.parent[0]][this.parent[1]].z)) }
        ]
        this.canopyPoints = []
        let totalPoints = (Math.random() * 10) + 20;
        let rot = 360 / totalPoints;
        const addPoint = (degrees) => {
            let radius = (Math.random() * 35) + 60;
            if (degrees > 360) {
                degrees = 360
            }
            var cx = Math.cos(degrees * Math.PI / 180) * radius;
            var cy = Math.sin(degrees * Math.PI / 180) * radius;
            var bx = Math.cos(degrees * Math.PI / 180) * (radius + 10);
            var by = Math.sin(degrees * Math.PI / 180) * (radius + 10);
            this.canopyPoints.push({ x: cx, y: cy, bx: bx, by: by })
        }
        for (let i = 0; i < totalPoints - 1; i++) {

            let degrees = rot * i;
            addPoint(degrees)
        }
        addPoint(360)
    }
    draw() {
        ctx.fillStyle = this.trunkColor;
        ctx.strokeStyle = "#603813";
        ctx.lineWidth = z(1);
        ctx.beginPath();
        this.trunkArt.forEach((fn) => { fn() })
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = this.leavesColor;
        ctx.moveTo(z(this.canopyPoints[0].x + map.world[this.parent[0]][this.parent[1]].x + center.x), z(this.canopyPoints[0].y + map.world[this.parent[0]][this.parent[1]].y - this.height - map.world[this.parent[0]][this.parent[1]].z + center.y));
        for (let i = 1; i < this.canopyPoints.length; i++) {
            ctx.bezierCurveTo(z(this.canopyPoints[i - 1].bx + map.world[this.parent[0]][this.parent[1]].x + center.x), z(this.canopyPoints[i - 1].by + map.world[this.parent[0]][this.parent[1]].y - this.height - map.world[this.parent[0]][this.parent[1]].z + center.y), z(this.canopyPoints[i].bx + map.world[this.parent[0]][this.parent[1]].x + center.x), z(this.canopyPoints[i].by + map.world[this.parent[0]][this.parent[1]].y - this.height - map.world[this.parent[0]][this.parent[1]].z + center.y), z(this.canopyPoints[i].x + map.world[this.parent[0]][this.parent[1]].x + center.x), z(this.canopyPoints[i].y + map.world[this.parent[0]][this.parent[1]].y - this.height - map.world[this.parent[0]][this.parent[1]].z + center.y));
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
}