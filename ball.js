class Ball extends Node {
	constructor(name, x, y, radius, color) {
		super(name, x, y);

		this.radius = radius || 10;
		this.color = color || "rgb(255,0,0)";
		this.speed = 20;

		this.direction = new Vector();
		this.distance = 0;
		this.velocity = new Vector();
	}

	update(delta) {
		this.direction = myGame.mousePosition.subtract(this.position).normalize();
		this.distance = myGame.mousePosition.subtract(this.position).magnitude();

		// Move if distance is greater than radius * 2
		if (this.distance > (this.radius * 2)) {
			this.velocity = this.direction.scale(this.speed).scale(delta);
			this.position = this.position.add(this.velocity);
		}

		myGame.debugObjects.speed = this.speed;
		myGame.debugObjects.position = this.position.x + ', ' + this.position.y;
		myGame.debugObjects.direction = this.direction.x + ', ' + this.direction.y;
		myGame.debugObjects.velocity = this.velocity.x + ', ' + this.velocity.y;
		myGame.debugObjects.distance = this.distance;
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
		console.log('ball -> keyDown');
	}
}