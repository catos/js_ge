
// Wall Sliding Demo: http://jsfiddle.net/dlubarov/64Laxwoe/
// http://gamedev.stackexchange.com/questions/111799/movement-with-vector-math

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = 500;
var height = 500;
var vMouse = [0, 0];
var started = false;
var debug = {};

canvas.width = width;
canvas.height = height;

canvas.addEventListener("mousemove", function (e) {
    vMouse[0] = e.pageX;
    vMouse[1] = e.pageY;
});

canvas.addEventListener("mousedown", function (e) {
    console.log('click');
    started = !started;

    if (started) {
        render();
    }
});

canvas.addEventListener("mouseleave", function (e) {
    started = false;
});

/***********************/

function vectorMagnitude(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}

function normalizeVector(a) {
    return scaleVector(a, 1 / vectorMagnitude(a));
}

function addVectors(a, b) {
    return [a[0] + b[0], a[1] + b[1]];
}

function subtractVectors(a, b) {
    return [a[0] - b[0], a[1] - b[1]];
}

function scaleVector(a, k) {
    return [a[0] * k, a[1] * k];
}

function dotProduct(a, b) {
    return a[0] * b[0] + a[1] * b[1];
}

/***********************/

function printDebug(ctx) {
    var count = 1;
    for (var i in debug) {
        // result += debug[i] + '';
        ctx.fillText(i + ': ' + debug[i], 10, 50 + 10 * count++);
    }
}

/***********************/

var Ball = function (x, y, radius, color) {
    this.x = x || 0;
    this.y = y || 0;
    this.radius = radius || 10;
    this.speed = 20;
    this.color = color || "rgb(255,0,0)";

    this.x -= this.radius / 2;
    this.y -= this.radius / 2;
}

Ball.prototype.update = function (delta) {
    // get the target x and y
    this.targetX = vMouse[0];
    this.targetY = vMouse[1];

    if (started) {
        this.color = "rgb(0,155,0)";
    } else {
        this.color = "rgb(255,0,0)";
    }

    var vCurrent = [this.x, this.y];
    var vMovement = subtractVectors(vMouse, vCurrent);
    var vMovementNormalized = normalizeVector(vMovement);

    debug.delta = delta;
    debug.vMouse = vMouse[0] + ', ' + vMouse[1];

    // move toward it
    this.x += (this.targetX - this.x) / this.speed;
    this.y += (this.targetY - this.y) / this.speed;
};

Ball.prototype.render = function () {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
};

/***********************/

var ball1 = new Ball(width / 2, height / 2, 10);

function render() {
    ctx.clearRect(0, 0, width, height);
    
    ball1.update("ir delta");
    ball1.render();

    printDebug(ctx);    

    if (started) {
        requestAnimationFrame(render);
    }
}

render();
