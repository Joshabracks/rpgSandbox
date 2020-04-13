class Character {
    constructor(name, x, y, images, primaryColor, secondaryColor, size) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.images = images;
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
        this.direction = 1;
        this.height = this.images.front.height
        this.width = this.images.front.width
        this.size = size
    }
    drawHex = (transparency) => {
        if (transparency) {
        }
        ctx.fillStyle = this.primaryColor;
        let hex = [[28.867, 100], [0, 50], [28.867, 0], [86.601, 0], [115.47, 50], [86.601, 100], [28.867, 100], [0, 50]];
        ctx.beginPath()
        for (let i = 0; i < hex.length; i++) {
            ctx.lineTo(hex[i][0] + this.x + center.x, hex[i][1] + this.y + center.y);
        }
        ctx.strokeStyle = this.primaryColor;
        ctx.globalAlpha = 0.5;
        ctx.fill()
        ctx.globalAlpha = 1;
        ctx.strokeStyle = this.secondaryColor;
        ctx.lineWidth = 5;
        ctx.stroke()
        ctx.closePath()
        if (transparency) {
        }
    }
    // drawToken = () => {

    //     ctx.drawImage(this.tokenImage, this.x + center.x, this.y + center.y)
    //     // this.drawDirection();
    // }
    drawFull = () => {
        // if (allFull) {
        // }
        let hs = this.size
        let ws = this.size
        let rscale = 1 / this.size;
        let rxs = this.x * rscale
        let rys = this.y * rscale
        let yOffset = this.height
        let xOffset = (Math.mean([this.width, 130]) / 2) - 130
        // console.log(this.name, xOffset, this.width * this.size)
        if (this.width * this.size < 130) {
            xOffset = -xOffset
        }
        this.drawHex(true)
        this.drawDirection()
        ctx.save()
        ctx.scale(ws, hs)
        if (this.direction == 1) {
            ctx.drawImage(this.images.back, rxs + xOffset + center.x * rscale, (60 * rscale) + rys - yOffset + center.y * rscale)
        } else if (this.direction == 2) {
            ctx.drawImage(this.images.threeQuartersBackLeft, rxs + xOffset + center.x * rscale, (60 * rscale) + rys - yOffset + center.y * rscale)
        } else if (this.direction == 3) {
            ctx.drawImage(this.images.threeQuartersFrontLeft, rxs + xOffset + center.x * rscale, (60 * rscale) + rys - yOffset + center.y * rscale)
        } else if (this.direction == 4) {
            ctx.drawImage(this.images.front, rxs + xOffset + center.x * rscale, (60 * rscale) + rys - yOffset + center.y * rscale)
        } else if (this.direction == 5) {
            ctx.drawImage(this.images.threeQuartersFrontRight, rxs + xOffset + center.x * rscale, (60 * rscale) + rys - yOffset + center.y * rscale)
        } else if (this.direction == 6) {
            ctx.drawImage(this.images.threeQuartersBackRight, rxs + xOffset + center.x * rscale, (60 * rscale) + rys - yOffset + center.y * rscale)
        }
        ctx.restore()
        // ctx.drawImage(this.fullImage, this.x + center.x + xOffset - 247, this.y + center.y - 500)
    }
    drawDirection = () => {
        var radius = 50;
        var point_size = 10;
        var center_x = this.x + center.x + 60;
        var center_y = this.y + center.y + 50;

        const drawPoint = (angle, distance) => {
            var x = center_x + radius * Math.cos(-angle * Math.PI / 180) * distance;
            var y = center_y + radius * Math.sin(-angle * Math.PI / 180) * distance;
            ctx.fillStyle = this.primaryColor;
            ctx.strokeStyle = this.secondaryColor;
            ctx.beginPath();
            ctx.arc(x, y, point_size, 0, 2 * Math.PI);
            ctx.globalAlpha = 0.7
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.stroke();
        }
        //Execution
        drawPoint(this.direction * 60 + 30, 1);
    }
}