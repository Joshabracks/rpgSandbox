let buttons = [];
class Button {
    constructor(name, clickAction, color, background, outline, parentId, display) {
        this.number = buttons.length;
        this.name = name;
        this.click = clickAction;
        this.color = color;
        this.outline = outline;
        this.background = background;
        this.parentId = parentId;
        this.self = document.createElement("button");
        this.click = clickAction;
        this.self.style.color = this.color;
        // this.self.style.outlineColor = this.outline;
        this.self.style.backgroundColor = this.background;
        this.self.style.display = "none";
        this.self.style.borderColor = this.outline;
        this.self.innerText = this.name;
        this.self.setAttribute('onclick', 'buttons[' + this.number + '].click(this)');
        this.displayType = display;
        this.parent = document.getElementById(this.parentId);
        this.parent.append(this.self);
        buttons.push(this);
    }
    show = () => {
        this.self.style.display = this.displayType;
    }
    hide = () => this.self.style.display = "none";
    // draw = () => {
    //     ctx.beginPath()
    //     ctx.fillStyle = this.color;
    //     ctx.strokeStyle = this.outline;
    //     ctx.lineWidth = 2;
    //     ctx.fillRect(this.x, this.y, this.width, this.height)
    //     ctx.strokeRect(this.x, this.y, this.width, this.height)
    //     ctx.fill()
    //     ctx.font = "20px Arial";
    //     ctx.fillStyle = "white";
    //     ctx.fillText(this.name, this.x + 20, this.y + 20)
    //     ctx.closePath()
    // }
}