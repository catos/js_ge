
// Game Loop: http://gameprogrammingpatterns.com/game-loop.html
// Vector Math: http://docs.godotengine.org/en/stable/tutorials/vector_math.html
// Wall Sliding Demo: http://jsfiddle.net/dlubarov/64Laxwoe/
// http://gamedev.stackexchange.com/questions/111799/movement-with-vector-math

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = 500;
var height = 500;
var vMouse = new Vector();
var running = false;
var gameObjects = [];
var debug = {};

canvas.width = width;
canvas.height = height;

canvas.addEventListener("mousemove", function (e) {
	vMouse = new Vector(e.pageX - 10, e.pageY - 10);
});

canvas.addEventListener("mousedown", function (e) {
	running = !running;

	if (running) {
		main();
	}
});

canvas.addEventListener("mouseleave", function (e) {
	running = false;
});

function printDebug(ctx) {
	debug.vMouse = vMouse.x + ', ' + vMouse.y;

	ctx.fillStyle = running ? "rgb(0,155,0)" : "rgb(255,0,0)";
	var count = 1;
	for (var i in debug) {
		ctx.fillText(i + ': ' + debug[i], 10, 50 + 10 * count++);
	}
}

/***********************/

var Ball = function (x, y, radius, color) {
	this.radius = radius || 10;
	this.position = new Vector(x - this.radius / 2, y - this.radius / 2);
	this.speed = 20;
	this.color = color || "rgb(255,0,0)";

	this.direction = new Vector();
	this.distance = 0;
}

Ball.prototype.update = function (delta) {

	this.direction = vMouse.subtract(this.position).normalize();
	this.distance = vMouse.subtract(this.position).magnitude();

	// Move if distance is greater than radius * 5
	if (this.distance > (this.radius * 5)) {
		this.position = this.position.add(this.direction.scale(this.speed).scale(delta));
	}

	debug.speed = this.speed;
	debug.position = this.position.x + ', ' + this.position.y;
	debug.direction = this.direction.x + ', ' + this.direction.y;
	debug.distance = this.distance;
};

Ball.prototype.render = function () {
	ctx.fillStyle = this.color;
	ctx.beginPath();
	ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
	ctx.closePath();
	ctx.fill();


	var pointLength = this.radius * 5;
	ctx.strokeStyle = "rgb(0,0,255)";
	ctx.beginPath();
	ctx.moveTo(this.position.x, this.position.y);
	ctx.lineTo(this.position.x + (this.direction.x * pointLength), this.position.y + (this.direction.y * pointLength));
	ctx.closePath();
	ctx.stroke();
};

gameObjects.push(new Ball(width / 2, height / 2, 10));
gameObjects.push(new Ball(width / 3, height / 3, 20));

/***********************/

var lastUpdate = Date.now();
// var myInterval = setInterval(main, 0);

function main() {
	var now = Date.now();
	var delta = (now - lastUpdate) / 100;
	debug.delta = delta;
	lastUpdate = now;

	ctx.clearRect(0, 0, width, height);

	gameObjects.forEach(function (go) {
		if (running) {
			go.update(delta);
		}
		go.render(delta);
	})

	printDebug(ctx);

	requestAnimationFrame(main);
}

main();