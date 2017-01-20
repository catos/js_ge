
// Game Loop: http://gameprogrammingpatterns.com/game-loop.html
// Vector Math: http://docs.godotengine.org/en/stable/tutorials/vector_math.html
// Wall Sliding Demo: http://jsfiddle.net/dlubarov/64Laxwoe/
// http://gamedev.stackexchange.com/questions/111799/movement-with-vector-math

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

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

class Node {
    constructor(name, x, y) {
        this.name = name || "Noname";
        this.position = new Vector(x, y);
        this.nodes = [];
    }

    keyDown(event) { }
    update() { }
    render() { }
}

class Engine extends Node {
    constructor(name, width, height) {
        super(name);

        this.canvas = document.getElementById(name);
        this.ctx = this.canvas.getContext("2d");
        this.width = width || 500;
        this.height = height || 500;
        this.mousePosition = new Vector();
        this.gamePaused = true;
        this.debugObjects = {};

        this.lastUpdate = Date.now();
        this.delta = 0;
    }

    init() {
        var self = this;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.rootNode = new Node("root");
        this.nodes.push(this.rootNode);

        this.canvas.addEventListener("mousemove", function (e) {
            self.mousePosition = new Vector(e.pageX - 10, e.pageY - 10);
        });

        this.canvas.addEventListener("mousedown", function (e) {
            self.gamePaused = !self.gamePaused;
        });

        this.canvas.addEventListener("mouseleave", function (e) {
            self.gamePaused = true;
        });

        document.addEventListener("keydown", function (e) {
            self.keyDown(e);
        });
    }

    keyDown(event) {
        this.nodes.forEach(function (go) {
            go.keyDown(event);
        });
    }

    debug() {
        this.debugObjects.numNodes = this.nodes.length;
        this.debugObjects.gamePaused = this.gamePaused;
        this.debugObjects.delta = this.delta;
        this.debugObjects.mousePosition = this.mousePosition.x + ', ' + this.mousePosition.y;

        var count = 1;
        for (var i in this.debugObjects) {
            this.ctx.fillText(i + ': ' + this.debugObjects[i], 10, 50 + 10 * count++);
        }
    }

    update() {
        var delta = this.delta;
        this.nodes.forEach(function (go) {
            go.update(delta);
        });
    }

    render() {
        var delta = this.delta;
        this.nodes.forEach(function (go) {
            go.render(delta);
        });
    }

    main() {

        var now = Date.now();
        this.delta = (now - this.lastUpdate) / 100;
        this.lastUpdate = now;

        this.ctx.clearRect(0, 0, this.width, this.height);

        this.debug();
        if (!this.gamePaused) {
            this.update();
        }
        this.render();

        requestAnimationFrame(this.main.bind(this));
    }
}