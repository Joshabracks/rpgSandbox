
class Tree01 {
    constructor(parent, height, width) {
        this.parent = parent;
        this.height = height;
        this.width = width;
        this.class = "Environment";
        this.leavesColor = "rgb(" + ((Math.random() * 100)) + "," + ((Math.random() * 100) + 100) + "," + ((Math.random() * 100)) + ")";
        this.trunkColor = "rgb(" + ((Math.random() * 50) + 100) + "," + ((Math.random() * 50) + 50) + "," + ((Math.random() * 50)) + ")";
        this.trunkArt = [
            () => { this.context.moveTo(z(-this.width + (this.imageWidth / 2)), z( -25 + (this.image.height))) },
            () => { this.context.bezierCurveTo(z(-this.width + (this.imageWidth / 2)), z(this.image.height - 10), z(this.width + (this.imageWidth / 2)), z(this.image.height - 10), z(this.width + (this.imageWidth / 2)), z(-25 + (this.image.height))) },
            () => { this.context.lineTo(z(this.width + (this.imageWidth / 2)), z(25 + (this.image.height - this.height))) },
            () => { this.context.lineTo(z(-this.width + (this.imageWidth / 2)), z(25 + (this.image.height - this.height))) }
        ]
        this.canopyPoints = []
        let totalPoints = (Math.random() * 10) + 20;
        let rot = 360 / totalPoints;
        let topPoint = 0;
        let widestPoint = 0;
        const addPoint = (degrees) => {
            let radius = (Math.random() * 35) + 60;
            if (degrees > 360) {
                degrees = 360
            }
            var cx = Math.cos(degrees * Math.PI / 180) * radius;
            if (Math.abs(cx) > Math.abs(widestPoint)) {
                widestPoint = Math.abs(cx);
            }
            var cy = Math.sin(degrees * Math.PI / 180) * radius;
            if (cy > topPoint) {
                topPoint = cy;
            }
            var bx = Math.cos(degrees * Math.PI / 180) * (radius + 10);
            var by = Math.sin(degrees * Math.PI / 180) * (radius + 10);
            this.canopyPoints.push({ x: cx, y: cy, bx: bx, by: by })
        }
        for (let i = 0; i < totalPoints - 1; i++) {

            let degrees = rot * i;
            addPoint(degrees)
        }
        addPoint(360)
        this.imageWidth = widestPoint;
        this.totalHeight = topPoint + this.height;
        this.image = document.createElement('canvas');
        this.context = this.image.getContext('2d');
        renderContainer.append(this.image);
        this.radialWidth = Math.floor(this.imageWidth);
        this.imageWidth = (this.imageWidth * 2) + 50;
        this.imageHeight = this.totalHeight + 50;
        this.render();
    }
    draw() {
        ctx.drawImage(this.image, map.world[this.parent[0]][this.parent[1]].x + center.x - (this.image.width / 2), center.y + map.world[this.parent[0]][this.parent[1]].y - this.image.height -  map.world[this.parent[0]][this.parent[1]].z + 20)
    }
    render() {
        // this.context.fillStyle = 'black';
        this.image.width = z(this.imageWidth);
        this.image.height = z(this.imageHeight);
        var offsetX = this.image.width / 2;
        var offsetY = this.image.height - this.height;
        // this.context.fillRect(0, 0, this.image.width, this.image.height)
        this.context.fillStyle = this.trunkColor;
        this.context.strokeStyle = "#603813";
        this.context.lineWidth = z(1);
        this.context.beginPath();
        this.trunkArt.forEach((fn) => { fn() })
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
        this.context.beginPath();
        this.context.fillStyle = this.leavesColor;
        this.context.moveTo(z(this.canopyPoints[0].x - 25 + this.radialWidth + (this.image.width / 2)), z(this.canopyPoints[0].y - this.Height + this.image.height + 25));
        for (let i = 1; i < this.canopyPoints.length; i++) {
            this.context.bezierCurveTo(z(this.canopyPoints[i - 1].bx + offsetX), z(this.canopyPoints[i - 1].by + offsetY), z(this.canopyPoints[i].bx + offsetX), z(this.canopyPoints[i].by + offsetY), z(this.canopyPoints[i].x + offsetX), z(this.canopyPoints[i].y + offsetY));
        }
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
    }
}