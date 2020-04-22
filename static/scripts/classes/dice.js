

class ZPoint {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
var blah = 4;
class D10 {
    constructor(x, y) {
        this.class = "Die";
        this.stop = 0;
        this.up = false;
        this.x = x;
        this.y = y;
        this.z = 3;
        this.width = 100;
        this.height = 100;
        this.pitch = (Math.random() * (0.628319 * .5)) - (0.628319 * .25);
        this.roll = (Math.random() * (0.628319 * .5)) - (0.628319 * .25);
        this.yaw = (Math.random() * (0.628319 * .5)) - (0.628319 * .25);
        this.points = {
            top: new ZPoint(0, -50, 0),
            bottom: new ZPoint(0, 50, 0),
        }
        this.opposites = {
            1: 6,
            2: 7,
            3: 8,
            4: 9,
            5: 0,
            6: 1,
            7: 2,
            8: 3,
            9: 4,
            10: 5
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
        this.speedX = 0;
        this.speedY = 0;
        this.speedZ = 0;
        this.gravity = 0.01;
        this.gravitySpeed = 0;
        let colorList = ["black", "pastelChromatic", "blood", "discoChromatica", "lime"];
        this.fillColor = colorList[Math.ceil((Math.random() * colorList.length) - 1)]
    }
    newPos(lowSide, order) {
        if (this.stop < 100) {
            if (this.up) {
                this.gravitySpeed -= this.gravity;
                this.x += this.speedX;
                this.z += this.speedZ + this.gravitySpeed;
                this.y += this.speedY;
                if (this.gravitySpeed < 0) {
                    this.gravitySpeed = 0;
                    this.up = false;
                }
            } else {
                this.gravitySpeed -= this.gravity;
                this.x += this.speedX;
                this.z += this.speedZ + this.gravitySpeed;
                this.y += this.speedY;
                if (this.z <= 1) {
                    this.z = 1;
                    this.gravitySpeed = -(this.gravitySpeed * ((Math.random() * .2) + .6));
                    this.yaw = this.yaw * .75;
                    this.speedY = (this.yaw + this.pitch) * this.gravitySpeed;
                    this.pitch = this.pitch * .75;
                    this.speedX = (this.roll + this.yaw) * this.gravitySpeed;
                    this.roll = this.roll * .75;
                    this.up = true;
                    let gravDrag = (this.gravitySpeed * .5)
                    if (lowSide[1].z < lowSide[2].z && lowSide[1].z < lowSide[3].z && lowSide[1].z < lowSide[4].z) {
                        if (lowSide[1].z == this.points.top.z) {
                            this.speedY += (this.points.bottom.y - this.points.top.y) * gravDrag
                            this.speedX += (this.points.bottom.x - this.points.top.x) * gravDrag
                            var roller = (this.roll * (this.points.bottom.z - this.points.top.z))
                            if (gravDrag) {
                                this.roll = roller * gravDrag
                            } else {
                                this.roll = roller
                            }
                        } else if (lowSide[1].z == this.points.bottom.z) {
                            this.speedX += (this.points.top.x - this.points.bottom.x) * gravDrag
                            this.speedY += (this.points.top.y - this.points.bottom.y) * gravDrag
                            var roller = (this.roll * (this.points.top.z - this.points.bottom.z))
                            if (gravDrag) {
                                this.roll = roller * gravDrag
                            } else {
                                this.roll = roller
                            }
                        }
                        // this.roll *= 1.5;
                        // this.gravitySpeed *= 1gravDrag;
                    }
                    else if (lowSide[4].z < lowSide[2].z && lowSide[4].z < lowSide[3].z && lowSide[4].z < lowSide[1].z) {
                        this.speedY += (this.points[this.opposites[order]].y - lowSide[4].y) * gravDrag
                        this.speedX += (this.points[this.opposites[order]].x - lowSide[4].x) * gravDrag
                        var pitcher = (this.pitch * (this.points[this.opposites[order]].z - lowSide[4].z))
                        if (gravDrag) {
                            this.pitch = pitcher * gravDrag
                        } else {
                            this.pitch = pitcher
                        }
                        // this.yaw *= 1.5;
                    }
                    else if (lowSide[2].z < lowSide[4].z && lowSide[2].z < lowSide[3].z && lowSide[2].z < lowSide[1].z) {
                        this.speedY += (this.points[this.opposites[order]].y - lowSide[2].y) * gravDrag
                        this.speedX += (this.points[this.opposites[order]].x - lowSide[2].x) * gravDrag
                        var pitcher = (this.pitch * (this.points[this.opposites[order]].z - lowSide[2].z))
                        if (gravDrag) {
                            this.pitch = pitcher * gravDrag
                        } else {
                            this.pitch = pitcher
                        }
                        // this.pitch *= 1.5;
                    }
                    else if (lowSide[3].z < lowSide[2].z && lowSide[3].z < lowSide[4].z && lowSide[3].z < lowSide[1].z) {
                        if (lowSide[1].z == this.points.top.z) {
                            this.speedY += (this.points.bottom.y - this.points.top.y) * this.gravitySpeed
                            this.speedX += (this.points.bottom.x - this.points.top.x) * this.gravitySpeed
                            var roller = (this.roll * (this.points.bottom.z - this.points.top.z))
                            if (gravDrag) {
                                this.roll = roller * gravDrag
                            } else {
                                this.roll = roller
                            }
                        } else if (lowSide[1].z == this.points.bottom.z) {
                            this.speedX += (this.points.top.x - this.points.bottom.x) * this.gravitySpeed
                            this.speedY += (this.points.top.y - this.points.bottom.y) * this.gravitySpeed
                            var roller = (this.roll * (this.points.top.z - this.points.bottom.z))
                            if (gravDrag) {
                                this.roll = roller * gravDrag
                            } else {
                                this.roll = roller
                            }
                        }
                        // this.roll *= 1.5;
                    } else {
                        this.stop = true;
                    }
                }
                console.log(this.roll)
                if (this.yaw + this.pitch + this.roll < .001) {
                    this.speedY = 0;
                    this.speedX = 0;
                    this.stop++;
                }
            }
        } else {

            this.yaw = 0;
            this.pitch = 0;
            this.roll = 0;
        }
    }
    rotate() {
        var cosa = Math.cos(this.yaw);
        var sina = Math.sin(this.yaw);

        var cosb = Math.cos(this.pitch);
        var sinb = Math.sin(this.pitch);

        var cosc = Math.cos(this.roll);
        var sinc = Math.sin(this.roll);

        var Axx = cosa * cosb;
        var Axy = cosa * sinb * sinc - sina * cosc;
        var Axz = cosa * sinb * cosc + sina * sinc;

        var Ayx = sina * cosb;
        var Ayy = sina * sinb * sinc + cosa * cosc;
        var Ayz = sina * sinb * cosc - cosa * sinc;

        var Azx = -sinb;
        var Azy = cosb * sinc;
        var Azz = cosb * cosc;

        for (let point in this.points) {
            var px = JSON.parse(JSON.stringify(this.points[point].x));
            var py = JSON.parse(JSON.stringify(this.points[point].y));
            var pz = JSON.parse(JSON.stringify(this.points[point].z));

            this.points[point].x = Axx * px + Axy * py + Axz * pz;
            this.points[point].y = Ayx * px + Ayy * py + Ayz * pz;
            this.points[point].z = Azx * px + Azy * py + Azz * pz;
        }
    }
    draw() {
        // ctx.save();
        let order = this.sortSides();
        this.newPos(this.sides[order[0].side], order[0].side);
        this.rotate();
        // ctx.scale(z(width) / width, z(height) / height);
        // ctx.translate(center.x, center.y)
        // for (let i = 0; i < order.length; i++) {
        //     let side = this.sides[order[i].side];
        //     ctx.globalAlpha = 0.25;
        //     ctx.fillStyle = "black";
        //     let moved = false;
        //     ctx.save()
        //     console.log(this.z)
        //     if (this.z > 1.01) {
        //         ctx.scale(this.z, this.z)
        //     } else {
        //         ctx.scale(1.01, 1.01)
        //     }
        //     ctx.beginPath();
        //     for (let j = 1; j < 5; j++) {
        //         if (moved) {
        //             ctx.moveTo((side[j].x * this.z) + this.x + center.x, (side[j].y * this.z) + this.y + center.y);
        //             moved = false;
        //         } else {
        //             ctx.lineTo((side[j].x * this.z) + this.x + center.x, (side[j].y * this.z) + this.y + center.y);
        //         }
        //     }
        //     ctx.closePath()
        //     ctx.fill()
        //     ctx.restore()
        // }
        for (let i = 0; i < order.length; i++) {
            let side = this.sides[order[i].side];
            if (i == 6) {
                ctx.save()
                ctx.globalAlpha = 1;
                ctx.translate(this.x + center.x, this.y + center.y);
                ctx.rotate(this.yaw * 100);
                ctx.font = (40 * this.z) + "px Arial";
                ctx.textAlign = "center"
                ctx.fillStyle = this.innerColor;
                ctx.fillText(order[5].side, 0, 10 * this.z)
                if (order[5].side == 9 || order[5].side == 6) {
                    ctx.beginPath()
                    ctx.moveTo(-10 * this.z, 20 * this.z)
                    ctx.lineTo(10 * this.z, 20 * this.z)
                    ctx.strokeStyle = this.innerColor;
                    ctx.lineWidth = 4 * this.z;
                    ctx.closePath()
                    ctx.stroke()
                }
                ctx.restore()
            }
            ctx.fillStyle = this.color(side);
            ctx.beginPath()
            let moved = false;
            ctx.globalAlpha = .75;
            for (let j = 1; j < 5; j++) {
                if (moved) {
                    ctx.moveTo((side[j].x * this.z) + this.x + center.x, (side[j].y * this.z) + this.y + center.y);
                    moved = false;
                } else {
                    ctx.lineTo((side[j].x * this.z) + this.x + center.x, (side[j].y * this.z) + this.y + center.y);
                }
            }
            // ctx.save()
            // ctx.translate(this.x, this.y);
            // ctx.rotate(this.yaw * 100);
            // ctx.font = (40 * this.z) + "px Arial";
            // ctx.textAlign = "center"
            // ctx.strokeStyle = this.outerColor;
            // ctx.strokeText(order[5].side, 0, 10 * this.z)
            // ctx.restore()
            ctx.strokeStyle = this.outerColor;
            ctx.lineWidth = zo(0.5 * this.z)
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        if (blah > 0) {
            blah--
        }
        // ctx.restore()
    }
    color(side) {
        let r;
        let g;
        let b;
        let base;
        if (this.fillColor == "black") {
            this.innerColor = "black";
            this.outerColor = "white";
            r = (side[1].x + side[2].x + side[3].x + side[4].x) + 200;
            g = (side[1].y + side[2].y + side[3].y + side[4].y) + 200;
            b = (side[1].z + side[2].z + side[3].z + side[4].z) + 200;
        } else if (this.fillColor == "pastelChromatic") {
            this.innerColor = "white";
            this.outerColor = "white";
            base = side[1].z + side[2].z + side[3].z + side[4].z
            r = base + Math.abs((side[1].y + side[2].y + side[3].y + side[4].y) * .25)
            g = base
            b = base + Math.abs((side[1].x + side[2].x + side[3].x + side[4].x) * .55);
        } else if (this.fillColor == "blood") {
            this.innerColor = "white";
            this.outerColor = "white";
            base = (side[1].z + side[2].z + side[3].z + side[4].z) * .25
            r = base + Math.abs((side[1].z + side[2].z + side[3].z + side[4].z) * .95)
            g = base
            b = base + Math.abs((side[1].y + side[2].y + side[3].y + side[4].y) * .25);
        } else if (this.fillColor == "discoChromatica") {
            this.innerColor = "black";
            this.outerColor = "black";
            r = Math.random() * 255 + 100
            g = Math.random() * 255 + 100
            b = Math.random() * 255 + 100
        } else if (this.fillColor == "lime") {
            this.innerColor = "white";
            this.outerColor = "white";
            base = (side[1].z + side[2].z + side[3].z + side[4].z) * .10
            r = base + Math.abs((side[1].z + side[2].z + side[3].z + side[4].z) * .95)
            g = base + 150
            b = base + Math.abs((side[1].y + side[2].y + side[3].y + side[4].y) * .25);
        }
        if (r > 255) {
            r = 255;
        }
        if (r < 0) {
            r = 0;
        }
        if (g > 255) {
            g = 255;
        }
        if (g < 0) {
            g = 0;
        }
        if (b > 255) {
            b = 255;
        }
        if (b < 0) {
            b = 0;
        }
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
        function quickSort(arr) {
            if (arr.length < 2) {
                return arr;
            }
            let mid = Math.floor(arr.length / 2)
            let pivot = arr[mid];
            let lower = [];
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