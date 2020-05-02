
class Tree01 {
    constructor(parent, height, width) {
        this.parent = parent;
        this.height = height;
        this.width = width;
        this.class = "Environment";
        this.leavesColor = "rgb(" + ((Math.random() * 100)) + "," + ((Math.random() * 100) + 100) + "," + ((Math.random() * 100)) + ")";
        this.trunkArt = [
            () => { ctx.moveTo(z(-this.width + this.parent.x + center.x), z(0 + this.parent.y + center.y - this.parent.z)) },
            () => { ctx.bezierCurveTo(z(-this.width + this.parent.x + center.x), z(15 + this.parent.y + center.y - this.parent.z), z(this.width + this.parent.x + center.x), z(15 + this.parent.y + center.y - this.parent.z), z(this.width + this.parent.x + center.x), z(0 + this.parent.y + center.y - this.parent.z)) },
            () => { ctx.lineTo(z(this.width + this.parent.x + center.x), z(-this.height + this.parent.y + center.y - this.parent.z)) },
            () => { ctx.lineTo(z(-this.width + this.parent.x + center.x), z(-this.height + this.parent.y + center.y - this.parent.z)) }
        ]
        this.canopyPoints = []
        let totalPoints = (Math.random() * 10) + 20;
        let rot = 360 / totalPoints;
        console.log(totalPoints)
        const addPoint = (degrees) => {
            let radius =( Math.random() * 50) + 150;
            console.log(degrees)
            if (degrees > 360) {
                degrees = 360
            }
            var cx = Math.cos(degrees * Math.PI / 180) * radius;
            var cy = Math.sin(degrees * Math.PI / 180) * radius;
            var bx = Math.cos(degrees * Math.PI / 180) * (radius + 20);
            var by = Math.sin(degrees * Math.PI / 180) * (radius + 20);
            this.canopyPoints.push({x: cx, y: cy, bx: bx, by: by})
        }
        for (let i = 0; i < totalPoints; i++) {
            let degrees = rot * i;
            addPoint(degrees)
        }
        addPoint(360)
    }
    draw() {
        ctx.fillStyle = "#603813";
        ctx.strokeStyle = "#034928";
        ctx.strokeWidth = z(2);
        ctx.beginPath();
        this.trunkArt.forEach((fn) => { fn() })
        ctx.closePath();
        // ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = this.leavesColor;
        ctx.moveTo(z(this.canopyPoints[0].x + this.parent.x + center.x), z(this.canopyPoints[0].y + this.parent.y - this.height - this.parent.z + center.y));
        for (let i = 1; i < this.canopyPoints.length; i++) {
            ctx.bezierCurveTo(z(this.canopyPoints[i - 1].bx + this.parent.x + center.x), z(this.canopyPoints[i - 1].by + this.parent.y - this.height - this.parent.z + center.y), z(this.canopyPoints[i].bx + this.parent.x + center.x), z(this.canopyPoints[i].by + this.parent.y - this.height - this.parent.z + center.y), z(this.canopyPoints[i].x + this.parent.x + center.x), z(this.canopyPoints[i].y + this.parent.y - this.height - this.parent.z + center.y));
        }

        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
}