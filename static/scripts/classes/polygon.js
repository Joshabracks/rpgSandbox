class Polygon {
    constructor(pointsArray, x, y, color, strokeColor, strokeWidth) {
        this.points = pointsArray;
        this.x = x;
        this.y = y;
        this.color = color;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
        this.setBoundingBox()
        this.id = Date.now()
    }
    draw = () => {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(z(this.points[0][0] + this.x + center.x), z(this.points[0][1] + this.y + center.y))
        for (let i = 0; i < this.points.length; i++) {
            ctx.lineTo(z(this.points[i][0] + this.x + center.x), z(this.points[i][1] + this.y + center.y));
        }
        ctx.closePath();
        ctx.fill();
        if (this.strokeColor) {
            ctx.strokeStyle = this.strokeColor;
            ctx.lineWidth = z(this.strokeWidth);
            ctx.stroke()
        }
        if (showBoundingBoxes === true) {
            this.showBox()
        }
    }
    showBox = () => {
        this.setBoundingBox()
        ctx.rect(z(this.boundingBox.left + this.x), z(this.boundingBox.top + this.y), z(this.width), z(this.height))
        ctx.strokeStyle = 'grey'
        ctx.stroke()
    }
    setBoundingBox = () => {
        let xmin = parseFloat(this.points[0][0])
        let xmax = parseFloat(xmin)
        let ymin = parseFloat(this.points[0][1])
        let ymax = parseFloat(ymin)
        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i][0] < xmin) {
                xmin = parseFloat(this.points[i][0])
            }
            if (this.points[i][0] > xmax) {
                xmax = parseFloat(this.points[i][0])
            }
            if (this.points[i][1] < ymin) {
                ymin = parseFloat(this.points[i][1])
            }
            if (this.points[i][1] > ymax) {
                ymax = parseFloat(this.points[i][1])
            }
        }
        this.boundingBox = { left: xmin, right: xmax, top: ymin, bottom: ymax }
        this.width = xmax - xmin
        this.height = ymax - ymin
    }
}