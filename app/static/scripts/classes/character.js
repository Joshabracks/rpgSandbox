class Character {
    constructor(artPath, x, y, z){
        this.height = 150;
        this.totalHeight = this.height;
        this.width = 100;
        this.radialWidth = this.width / 2;
        this.front = new Image(100, 150);
        this.front.src = artPath + "/front.svg";
        svgContainer.appendChild(this.front);
        this.back = new Image(100, 150);
        this.back.src = artPath + "/back.svg"
        svgContainer.appendChild(this.back);
        this.frontLeft = new Image(100, 150);
        this.frontLeft.src = artPath + "/frontLeft.svg";
        svgContainer.appendChild(this.frontLeft);
        this.backLeft = new Image(100, 150);
        this.backLeft.src = artPath + "/backLeft.svg"
        svgContainer.appendChild(this.backLeft);
        this.frontRight = new Image(100, 150);
        this.frontRight.src = artPath + "/frontRight.svg";
        svgContainer.appendChild(this.frontRight);
        this.backRight = new Image(100, 150);
        this.backRight.src = artPath + "/backRight.svg";
        svgContainer.appendChild(this.backRight);
        this.x = x;
        this.y = y;
        this.z = z;
        this.dirWheel = ["front", "frontRight", "backRight", "back", "backLeft", "frontLeft"];
        this.orientation = 0;
    }
    draw() {
        ctx.save();
        ctx.scale(z(1), z(1))
        ctx.drawImage(this[this.dirWheel[this.orientation]], this.x + center.x - (this.width / 2), this.y + center.y - this.z - this.height + 25)
        ctx.restore()
    }
}