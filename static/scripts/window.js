
window.onresize = function () {
    fitCanvas()
    rush = true;
    drawScreen()
}
window.onload = function () {
    drawScreen()
}
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let width = window.innerWidth
let height = window.innerHeight
canvas.height = height
canvas.width = width
let allFull = false;
let mapWidth = 11;
let mapHeight = 20;
let center = { x: 0, y: 0 }
let originCoord = { x1: 0, y1: 0, x2: 0, y2: 0 }
let drag = false;
let drawing = false;
let clientLoc = { x: 0, y: 0 }
let minStep = 7;
let drawStep = 0;
let showEraser = false;
let rush = true;
let activeCharacter = false;
let updateStep = Date.now()
let snap = true
let showBoundingBoxes = false;
let pencil = {
    color: "red",
    width: 5
}
let erasing = false;
let mode = "draw";
let eraser = {
    x: 0,
    y: 0,
    draw: () => {
        ctx.beginPath();
        ctx.arc(eraser.x + center.x, eraser.y + center.y, 25, 0, 2 * Math.PI)
        ctx.fillStyle = "pink";
        ctx.fill()
        ctx.closePath()
    }
}
//CREATING TEST CHARACTERS --- PROBABLY GOING TO REPLACE THIS
let characterNodes = document.getElementsByTagName('character');
let characters = [];
for (let character of characterNodes) {
    let images = character.getElementsByTagName('img')
    let imageObj = {}
    for (let i = 0; i < images.length; i++) {
        var image = images[i]
        imageObj[image.getAttribute('name')] = image;
    }
    let char = new Character(character.getAttribute('name'), 0, 0, imageObj, character.getAttribute('color'), character.getAttribute('outline'), character.getAttribute("size"))
    char.id = characters.length
    characters.push(char)
}
console.log("WEEEENDOW")
//END CREATING TEST CHARACTERS
function fitCanvas() {
    height = window.innerHeight
    width = window.innerWidth
    canvas.height = height
    canvas.width = width
}
//PUSH OBJECTS WITH A .draw() method into the Q.
let drawQ = []
//Points for drawing a hexagon
var hexagon = new Polygon([[28.867, 100], [0, 50], [28.867, 0], [86.601, 0], [115.47, 50], [86.601, 100]], 0, 0, "white", "black", 2)
let xsize = 150
let ysize = 50
console.log(ysize)
//END HEXAGON STUFF