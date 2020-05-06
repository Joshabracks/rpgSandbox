
window.onresize = function () {
    fitCanvas()
    // rush = true;
    // drawScreen()
}
window.onload = function () {
    // setTimeout(() => sortCharacters(), 1000)
    window.requestAnimationFrame(drawScreen);
}
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d', {alpha: false, desynchronized: true})
let width = window.innerWidth
let height = window.innerHeight
canvas.height = height
canvas.width = width
let allFull = false;
let roll = false;
let mapWidth = 20;
let mapHeight = 60;
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
let activeTile = false;
let updateStep = Date.now()
let snap = true
let editMap = false;
let showBoundingBoxes = false;
let zoom = 1;
let distancer = false;
let pencil = {
    color: "red",
    width: 5
}
let erasing = false;
let painting = false;
let paintBrush = false;
let mode = "draw";
let hilightedTile;
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

//END CREATING TEST CHARACTERS
function fitCanvas() {
    height = window.innerHeight
    width = window.innerWidth
    canvas.height = height
    canvas.width = width
}
//PUSH OBJECTS WITH A .draw() method into the Q.
let drawQ = []
let dice = []
//Points for drawing a hexagon
var hexagon = new Polygon([[28.867, 100], [0, 50], [28.867, 0], [86.601, 0], [115.47, 50], [86.601, 100]], 0, 0, "white", "black", 2)
let xsize = 150
let ysize = 50
//END HEXAGON STUFF

//WORLDMAPSTUFF

let map = new HexMap(25, "grassTile");

// let worldMap = [];
// let y = ysize
// let x = xsize
// let even = false
// for (let row = 0; row < mapHeight; row++) {
//     for (let col = 0; col < mapWidth; col++) {
//         characters.push(new Tile(x, y, 0, "grassTile"))
//         x += 173
//     }
//     y += ysize
//     if (even) {
//         x = xsize
//         even = false
//     } else {
//         x = 63
//         even = true;
//     }
// }
//END WORLDMAPSTUFF