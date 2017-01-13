
// Game Loop: http://gameprogrammingpatterns.com/game-loop.html
// Vector Math: http://docs.godotengine.org/en/stable/tutorials/vector_math.html
// Wall Sliding Demo: http://jsfiddle.net/dlubarov/64Laxwoe/
// http://gamedev.stackexchange.com/questions/111799/movement-with-vector-math

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = 500;
var height = 500;
var vMouse = new Vector();
var started = false;
var debug = {};

canvas.width = width;
canvas.height = height;

canvas.addEventListener("mousemove", function (e) {
    vMouse = new Vector(e.pageX, e.pageY);
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

function printDebug(ctx) {
    var count = 1;
    for (var i in debug) {
        // result += debug[i] + '';
        ctx.fillText(i + ': ' + debug[i], 10, 50 + 10 * count++);
    }
}

/***********************/

var Ball = function (x, y, radius, color) {
    this.radius = radius || 10;
    this.position = new Vector(x - this.radius / 2, y - this.radius / 2);
    this.speed = 20;
    this.color = color || "rgb(255,0,0)";
}

Ball.prototype.update = function (delta) {
    if (started) {
        this.color = "rgb(0,155,0)";
    } else {
        this.color = "rgb(255,0,0)";
    }

    var vMovement = vMouse.subtract(this.position);
    var direction = vMovement.normalize();

    debug.delta = delta;
    debug.vMouse = vMouse.x + ', ' + vMouse.y;
    debug.speed = this.speed;
    debug.direction = direction.x + ', ' + direction.y;
    debug.directionScaled = direction.scale(this.speed).x + ', ' + direction.scale(this.speed).y;

    // move toward it
    this.position = this.position.add(direction.scale(this.speed));
};

Ball.prototype.render = function () {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
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
