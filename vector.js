var Vector = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Vector.prototype.magnitude = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
}

Vector.prototype.normalize = function () {
    var result = this.scale(1 / this.magnitude());
    return result; 
}

Vector.prototype.add = function (b) {
    var result = new Vector();
    result.x = this.x + b.x;
    result.y = this.y + b.y;

    return result;
}

Vector.prototype.subtract = function (b) {
    var result = new Vector();
    result.x = this.x - b.x;
    result.y = this.y - b.y;

    return result;
}

Vector.prototype.scale = function (k) {
	var result = new Vector(this.x * k, this.y * k);
    return result;
}

Vector.prototype.dot = function (b) {
    return this.x * b.x + this.y * b.y;
}
