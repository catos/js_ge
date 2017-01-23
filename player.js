class Player extends Node {
	constructor(name, x, y, radius, color) {
		super(name, x, y);

		this.radius = radius || 10;
		this.color = color || "rgb(0,128,128)";
		this.speed = 20;

		this.direction = new Vector(1, 1);
		this.distance = 0;
		this.velocity = new Vector(0, 0);

		this.thrust = 1;
		this.angle = 0;
		this.turnSpeed = 0.01;

		this.MOVE_FORWARD = 38;
		this.MOVE_FORWARD = 40;
		this.TURN_LEFT = 37;
		this.TURN_RIGHT = 39;
	}

	update(delta) {
		this.radians = this.angle / Math.PI * 180;

		var px = this.direction.x * Math.cos(this.radians) - this.direction.y * Math.sin(this.radians); 
		var py = this.direction.x * Math.sin(this.radians) + this.direction.y * Math.cos(this.radians);

		this.direction.x = px;
      	this.direction.y = py;

		// this.direction.x += Math.cos(this.radians) * this.thrust;
      	// this.direction.y += Math.sin(this.radians) * this.thrust;

		
		// this.distance = myGame.mousePosition.subtract(this.position).magnitude();

		// // Move if distance is greater than radius * 2
		// if (this.distance > (this.radius * 2)) {
		// 	this.velocity = this.direction.scale(this.speed).scale(delta);
		// 	this.position = this.position.add(this.velocity);
		// }

		myGame.debugObjects.speed = this.speed;
		myGame.debugObjects.angle = this.angle;
		myGame.debugObjects.radians = this.radians;
		// myGame.debugObjects.position = this.position.x + ', ' + this.position.y;
		// myGame.debugObjects.direction = this.direction.x + ', ' + this.direction.y;
		myGame.debugObjects.velocity = this.velocity.x + ', ' + this.velocity.y;
		// myGame.debugObjects.distance = this.distance;
	}

	render(delta) {
		myGame.ctx.fillStyle = this.color;
		myGame.ctx.beginPath();
		myGame.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		myGame.ctx.closePath();
		myGame.ctx.fill();


		var pointLength = this.radius * 2;
		myGame.ctx.strokeStyle = "rgb(0,0,255)";
		myGame.ctx.beginPath();
		myGame.ctx.moveTo(this.position.x, this.position.y);
		myGame.ctx.lineTo(this.position.x + (this.direction.x * pointLength), this.position.y + (this.direction.y * pointLength));
		myGame.ctx.closePath();
		myGame.ctx.stroke();
	}

	keyDown(event) {

		if (myGame.keysDown.indexOf(this.TURN_LEFT)) {
			this.angle += this.turnSpeed * -1;
		}
		
		if (myGame.keysDown.indexOf(this.TURN_RIGHT)) {
			this.angle += this.turnSpeed * 1;
		}
		

	}
}