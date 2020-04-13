class Polyline {
    constructor(pointsArray, x, y, color, width) {
        this.points = pointsArray;
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.id = Date.now()
    }
    draw = () => {
        ctx.beginPath()
        for (let i = 0; i < this.points.length; i++) {
            ctx.lineTo(z(this.points[i][0] + center.x), z(this.points[i][1] + center.y));
        }
        ctx.strokeStyle = this.color;
        ctx.strokeWidth = this.width;
        ctx.stroke()
        ctx.closePath()
    }
}