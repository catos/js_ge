class Vector {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        var result = this.scale(1 / this.magnitude());
        return result;
    }

    add(b) {
        var result = new Vector();
        result.x = this.x + b.x;
        result.y = this.y + b.y;

        return result;
    }

    subtract(b) {
        var result = new Vector();
        result.x = this.x - b.x;
        result.y = this.y - b.y;

        return result;
    }

    scale(k) {
        var result = new Vector(this.x * k, this.y * k);
        return result;
    }

    dot(b) {
        return this.x * b.x + this.y * b.y;
    }
}