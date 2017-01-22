class EasingBall extends Ball {
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