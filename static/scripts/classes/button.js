class Button {
    constructor(name, x, y, width, height, clickAction, color) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.click = clickAction;
        this.height = height;
        this.width = width;
        this.color = color;
    }
    draw = () => {
        ctx.beginPath()
        ctx.fillStyle = this.color;
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fill()
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(this.name, this.x + 20, this.y + 20)
        ctx.closePath()
    }
}