class MyGame extends Engine {

	constructor() {
		super('myGame');
		this.nodes.push(new Player("player1", this.width / 2, this.height / 2, 10));
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
				ball = new EasingBall(name, x, y, radius, color);
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