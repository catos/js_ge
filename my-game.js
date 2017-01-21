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
}

class AcceleratedBall extends Ball {
	constructor(name, x, y, radius, color) {
		super(name, x, y, radius, color);

		this.distance = new Vector();
		this.easingAmount = 0.5;
	}

	update(delta) {
		// http://genericgamedev.com/general/basic-game-physics-from-newton-to-code/
		//https://gamedevelopment.tutsplus.com/tutorials/quick-tip-smoothly-move-an-entity-to-the-position-of-the-mouse--gamedev-7356
		this.distance = myGame.mousePosition.subtract(this.position);
		
		if (this.distance.magnitude() > 1) {
			this.position = this.position.add(this.distance.scale(this.easingAmount).scale(delta))
		}

		myGame.debugObjects.position = this.position.x + ', ' + this.position.y;
		myGame.debugObjects.distance = this.distance.x + ', ' + this.distance.y;

	}
}

class MyGame extends Engine {

	constructor() {
		super('myGame');
		// this.nodes.push(new Ball("ball1", this.width / 2, this.height / 2, 10));
	}

	keyDown(event) {
		var ball;
		var name = "ball" + (myGame.nodes.length + 1);
		var radius = getRandomInt(1, 50);
		var color = 'rgb(' + getRandomInt(0, 256) + ',' + getRandomInt(0, 265) + ', ' + getRandomInt(0, 256) + ')';
		var x = getRandomInt(0 + radius, myGame.width - radius);
		var y = getRandomInt(0 + radius, myGame.height - radius);

		switch (event.keyCode) {
			case 65:
				ball = new AcceleratedBall(name, x, y, radius, color);
				break;
			case 66:
				ball = new Ball(name, x, y, radius, color);
				break;
			default:
				return;
		}

		myGame.nodes.push(ball);
	}
}

var myGame = new MyGame();
myGame.init();
myGame.main();