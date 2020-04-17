

class ZPoint {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
var blah = 4;
class D10 {
    constructor() {
        this.x = 500;
        this.y = 500;
        this.z = 0;
        this.width = 100;
        this.height = 100;
        this.pitch = 0;
        this.roll = 0;
        this.yaw = 0;
        this.points = {
            top: new ZPoint(0, -50, 0),
            bottom: new ZPoint(0, 50, 0),
        }
        for (let i = 0; i < 10; i++) {
            let x = Math.sin(((0.628319) * i) + this.pitch) * 50;
            let y;
            let z = Math.cos(((0.628319) * i) + this.pitch) * 50;
            if (i % 2 == 0) {
                y = (Math.sin(((0.628319) * 0) + this.roll) * 50) - 10;
            } else {
                y = (Math.sin(((0.628319) * 0) + this.roll) * 50) + 10;
            }
            this.points[i] = new ZPoint(x, y, z);
        }
        this.sides = {
            1: { 1: this.points.top, 2: this.points[0], 3: this.points[1], 4: this.points[2] },
            2: { 1: this.points.top, 2: this.points[2], 3: this.points[3], 4: this.points[4] },
            3: { 1: this.points.top, 2: this.points[4], 3: this.points[5], 4: this.points[6] },
            4: { 1: this.points.top, 2: this.points[6], 3: this.points[7], 4: this.points[8] },
            5: { 1: this.points.top, 2: this.points[8], 3: this.points[9], 4: this.points[0] },
            6: { 1: this.points.bottom, 2: this.points[1], 3: this.points[2], 4: this.points[3] },
            7: { 1: this.points.bottom, 2: this.points[3], 3: this.points[4], 4: this.points[5] },
            8: { 1: this.points.bottom, 2: this.points[5], 3: this.points[6], 4: this.points[7] },
            9: { 1: this.points.bottom, 2: this.points[7], 3: this.points[8], 4: this.points[9] },
            10: { 1: this.points.bottom, 2: this.points[9], 3: this.points[0], 4: this.points[1] }
        }
        this.drawOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
    rotate() {
        // this.pitch += 0.05;
        // if (this.pitch >= 1) {
        //     this.pitch = 0;
        // }
        // for (let i = 0; i < 10; i++) {
        //     this.points[i].x = Math.sin(((0.628319) * i) + this.pitch) * 50;
        //     this.points[i].z = Math.cos(((0.628319) * i) + this.pitch) * 50;
            // if (i % 2 == 0) {
            //     this.points[i].y = (Math.sin(((0.628319) * 0) + this.roll) * 50);
            // } else {
            //     this.points[i].y = (Math.sin(((0.628319) * 0) + this.roll) * 50);
                
            // }
            // this.points.top.y = (Math.sin(((0.628319) * 0) + this.roll) * 50) - 50;
            // this.points.bottom.y = (Math.sin(((0.628319) * 0) + this.roll) * 50) + 50;
            // this.points.top.x = Math.sin(((0.628319) * 0) + this.roll) * 50
            // this.points.top.z = Math.cos(((0.628319) * 0) + this.pitch) * 50;
            // this.points.bottom.x = -(Math.sin(((0.628319) * 0) + this.roll) * 50);
            // this.points.bottom.z = -(Math.cos(((0.628319) * 0) + this.pitch) * 50);
        // }
        var cosa = Math.cos(this.yaw);
        var sina = Math.sin(this.yaw);
    
        var cosb = Math.cos(this.pitch);
        var sinb = Math.sin(this.pitch);
    
        var cosc = Math.cos(this.roll);
        var sinc = Math.sin(this.roll);
    
        var Axx = cosa*cosb;
        var Axy = cosa*sinb*sinc - sina*cosc;
        var Axz = cosa*sinb*cosc + sina*sinc;
    
        var Ayx = sina*cosb;
        var Ayy = sina*sinb*sinc + cosa*cosc;
        var Ayz = sina*sinb*cosc - cosa*sinc;
    
        var Azx = -sinb;
        var Azy = cosb*sinc;
        var Azz = cosb*cosc;
    
        for ( let point in this.points ) {
            var px = JSON.parse(JSON.stringify(this.points[point].x));
            var py = JSON.parse(JSON.stringify(this.points[point].y));
            var pz = JSON.parse(JSON.stringify(this.points[point].z));
    
            this.points[point].x = Axx*px + Axy*py + Axz*pz;
            this.points[point].y = Ayx*px + Ayy*py + Ayz*pz;
            this.points[point].z = Azx*px + Azy*py + Azz*pz;
        }
    }
    draw() {
        ctx.globalAlpha = 0.75;
        this.rotate();
        let order = this.sortSides();
        for (let i = 0; i < order.length; i++) {
            let side = this.sides[order[i].side];
            ctx.fillStyle = this.color(side);
            ctx.beginPath()
            let moved = false;
            for (let j = 1; j < 5; j++) {
                if (moved) {
                    ctx.moveTo(side[j].x + this.x, side[j].y + this.y);
                    moved = false;
                } else {
                    ctx.lineTo(side[j].x + this.x, side[j].y + this.y);
                }
            }
            ctx.closePath();
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        if (blah > 0) {
            blah--
        }
    }
    color(side) {
        let r = (side[1].x + side[2].x + side[3].x + side[4].x + 200) -45;
        let g = (side[1].y + side[2].y + side[3].y + side[4].y + 200) -45;
        let b = (side[1].z + side[2].z + side[3].z + side[4].z + 200) -45;
        return ("rgb(" + Math.floor(r) + ',' + Math.floor(g) + ',' + Math.floor(b) + ')')
    }
    sortSides() {
        let zLows = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 };
        for (let i in this.sides) {
            let zLow = this.sides[i][1].z;
            for (let j = 2; j < 4; j++) {
                if (this.sides[i][j].z < zLow) {
                    zLow = this.sides[i][j].z;
                }
            }
            zLows[i] = zLow;
        }
        let arr = [];
        for (let k in zLows) {
            arr.push({ side: k, z: zLows[k] })
        }
        function quickSort(arr){
            if (arr.length < 2) {
                return arr;
            }
            let mid = Math.floor(arr.length / 2)
            let pivot = arr[mid];
            let lower =[];
            let higher = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] != pivot) {
                    if (arr[i].z > pivot.z) {
                        higher.push(arr[i])
                    } else {
                        lower.push(arr[i])
                    }
                }
            }
            return quickSort(lower).concat([pivot]).concat(quickSort(higher))
        }
        return quickSort(arr);
    }
}
// //***************** */
// // Get the canvas element from the DOM



// /* ====================== */
// /* ====== VARIABLES ===== */
// /* ====================== */

// let dots = []; // Every dots in an array

// /* ====================== */
// /* ====== CONSTANTS ===== */
// /* ====================== */
// /* Some of those constants may change if the user resizes their screen but I still strongly believe they belong to the Constants part of the variables */
// const DOTS_AMOUNT = 1000; // Amount of dots on the screen
// const DOT_RADIUS = 4; // Radius of the dots
// let GLOBE_RADIUS = width * 0.7; // Radius of the globe
// let GLOBE_CENTER_Z = -GLOBE_RADIUS; // Z value of the globe center
// let PROJECTION_CENTER_X = width / 2; // X center of the canvas HTML
// let PROJECTION_CENTER_Y = height / 2; // Y center of the canvas HTML
// let FIELD_OF_VIEW = width * 0.8;

// class Dot {
//     constructor(x, y, z) {
//         this.x = x;
//         this.y = y;
//         this.z = z;

//         this.xProject = 0;
//         this.yProject = 0;
//         this.sizeProjection = 0;
//     }
//     // Do some math to project the 3D position into the 2D canvas
//     project(sin, cos) {
//         const rotX = cos * this.x + sin * (this.z - GLOBE_CENTER_Z);
//         const rotZ = -sin * this.x + cos * (this.z - GLOBE_CENTER_Z) + GLOBE_CENTER_Z;
//         this.sizeProjection = FIELD_OF_VIEW / (FIELD_OF_VIEW - rotZ);
//         this.xProject = (rotX * this.sizeProjection) + PROJECTION_CENTER_X;
//         this.yProject = (this.y * this.sizeProjection) + PROJECTION_CENTER_Y;
//     }
//     // Draw the dot on the canvas
//     draw(sin, cos) {
//         this.project(sin, cos);
//         // ctx.fillRect(this.xProject - DOT_RADIUS, this.yProject - DOT_RADIUS, DOT_RADIUS * 2 * this.sizeProjection, DOT_RADIUS * 2 * this.sizeProjection);
//         ctx.beginPath();
//         ctx.arc(this.xProject, this.yProject, DOT_RADIUS * this.sizeProjection, 0, Math.PI * 2);
//         ctx.closePath();
//         ctx.fill();
//     }
// }

// function createDots() {
//     // Empty the array of dots
//     dots.length = 0;

//     // Create a new dot based on the amount needed
//     for (let i = 0; i < DOTS_AMOUNT; i++) {
//         const theta = Math.random() * 2 * Math.PI; // Random value between [0, 2PI]
//         const phi = Math.acos((Math.random() * 2) - 1); // Random value between [-1, 1]

//         // Calculate the [x, y, z] coordinates of the dot along the globe
//         const x = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
//         const y = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);
//         const z = (GLOBE_RADIUS * Math.cos(phi)) + GLOBE_CENTER_Z;
//         dots.push(new Dot(x, y, z));
//     }
// }

// /* ====================== */
// /* ======== RENDER ====== */
// /* ====================== */
// function render(a) {
//     // Clear the scene
//     ctx.clearRect(0, 0, width, height);

//     // Increase the globe rotation
//     rotation = a * 0.0004;

//     const sineRotation = Math.sin(rotation); // Sine of the rotation
//     const cosineRotation = Math.cos(rotation); // Cosine of the rotation

//     // Loop through the dots array and draw every dot
//     for (var i = 0; i < dots.length; i++) {
//         dots[i].draw(sineRotation, cosineRotation);
//     }

//     window.requestAnimationFrame(render);
// }


// // Function called after the user resized its screen
// function afterResize() {
//     width = canvas.offsetWidth;
//     height = canvas.offsetHeight;
//     if (window.devicePixelRatio > 1) {
//         canvas.width = canvas.clientWidth * 2;
//         canvas.height = canvas.clientHeight * 2;
//         ctx.scale(2, 2);
//     } else {
//         canvas.width = width;
//         canvas.height = height;
//     }
//     GLOBE_RADIUS = width * 0.7;
//     GLOBE_CENTER_Z = -GLOBE_RADIUS;
//     PROJECTION_CENTER_X = width / 2;
//     PROJECTION_CENTER_Y = height / 2;
//     FIELD_OF_VIEW = width * 0.8;

//     createDots(); // Reset all dots
// }

// // Variable used to store a timeout when user resized its screen
// let resizeTimeout;
// // Function called right after user resized its screen
// function onResize() {
//     // Clear the timeout variable
//     resizeTimeout = window.clearTimeout(resizeTimeout);
//     // Store a new timeout to avoid calling afterResize for every resize event
//     resizeTimeout = window.setTimeout(afterResize, 500);
// }
// window.addEventListener('resize', onResize);

// // Populate the dots array with random dots
// createDots();

// // Render the scene
// window.requestAnimationFrame(render);

let die = new D10();