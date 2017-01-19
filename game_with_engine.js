var myGame = new Engine("canvas");
myGame.init();
// myGame.rootGameObject.keyDown = function (event) {
// 	console.log('ball->keyDown: ', event);
// }


var Ball = function (name, x, y, radius, color) {
	this.name = name || "Noname";
	this.radius = radius || 10;
	this.color = color || "rgb(255,0,0)";
	this.speed = 20;

	this.position = new Vector(x - this.radius / 2, y - this.radius / 2);
	this.direction = new Vector();
	this.distance = 0;
}

inheritsFrom(Ball, GameObject);

Ball.prototype = {

	update: function (delta) {
		this.direction = myGame.mousePosition.subtract(this.position).normalize();
		this.distance = myGame.mousePosition.subtract(this.position).magnitude();

		// Move if distance is greater than radius * 5
		if (this.distance > (this.radius * 5)) {
			this.position = this.position.add(this.direction.scale(this.speed).scale(delta));
		}

		myGame.debugObjects.speed = this.speed;
		myGame.debugObjects.position = this.position.x + ', ' + this.position.y;
		myGame.debugObjects.direction = this.direction.x + ', ' + this.direction.y;
		myGame.debugObjects.distance = this.distance;
	},

	render: function (delta) {
		myGame.ctx.fillStyle = this.color;
		myGame.ctx.beginPath();
		myGame.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		myGame.ctx.closePath();
		myGame.ctx.fill();


		var pointLength = this.radius * 5;
		myGame.ctx.strokeStyle = "rgb(0,0,255)";
		myGame.ctx.beginPath();
		myGame.ctx.moveTo(this.position.x, this.position.y);
		myGame.ctx.lineTo(this.position.x + (this.direction.x * pointLength), this.position.y + (this.direction.y * pointLength));
		myGame.ctx.closePath();
		myGame.ctx.stroke();
	},

	keyDown: function() {
        console.log(this.name + '->keyDown');
	}
}

myGame.gameObjects.push(new Ball("ball1", myGame.width / 2, myGame.height / 2, 10));
myGame.gameObjects.push(new Ball("ball2", myGame.width / 3, myGame.height / 3, 20));

myGame.main();
