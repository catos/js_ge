
// Game Loop: http://gameprogrammingpatterns.com/game-loop.html
// Vector Math: http://docs.godotengine.org/en/stable/tutorials/vector_math.html
// Wall Sliding Demo: http://jsfiddle.net/dlubarov/64Laxwoe/
// http://gamedev.stackexchange.com/questions/111799/movement-with-vector-math
// https://www.sitepoint.com/simple-inheritance-javascript/

var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};

var Vector = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Vector.prototype = {
    magnitude: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    normalize: function () {
        var result = this.scale(1 / this.magnitude());
        return result;
    },

    add: function (b) {
        var result = new Vector();
        result.x = this.x + b.x;
        result.y = this.y + b.y;

        return result;
    },

    subtract: function (b) {
        var result = new Vector();
        result.x = this.x - b.x;
        result.y = this.y - b.y;

        return result;
    },

    scale: function (k) {
        var result = new Vector(this.x * k, this.y * k);
        return result;
    },

    dot: function (b) {
        return this.x * b.x + this.y * b.y;
    }
}

var GameObject = function (name) {
    this.name = name;
}

GameObject.prototype = {
    keyDown: function (event) { },
    debug: function () { },
    update: function () { },
    render: function () { }
}

var Engine = function (name, width, height) {
    this.canvas = document.getElementById(name);
    this.ctx = canvas.getContext("2d");
    this.width = width || 500;
    this.height = height || 500;
    this.mousePosition = new Vector();
    this.gamePaused = true;
    this.gameObjects = [];
    this.debugObjects = {};

    this.lastUpdate = Date.now();
    this.delta = 0;
}

inheritsFrom(Engine, GameObject);

Engine.prototype = {

    init: function () {
        var self = this;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.rootGameObject = new GameObject("root");
        this.gameObjects.push(this.rootGameObject);

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
    },

    keyDown: function(event) {
        console.log('keyDown: ', event);
        this.gameObjects.forEach(function (go) {
            go.keyDown(event);
        });
    },

    debug: function () {
        this.debugObjects.numGameObjects = this.gameObjects.length;
        this.debugObjects.gamePaused = this.gamePaused;
        this.debugObjects.delta = this.delta;
        this.debugObjects.mousePosition = this.mousePosition.x + ', ' + this.mousePosition.y;

        var count = 1;
        for (var i in this.debugObjects) {
            this.ctx.fillText(i + ': ' + this.debugObjects[i], 10, 50 + 10 * count++);
        }
    },

    update: function () {
        delta = this.delta;
        this.gameObjects.forEach(function (go) {
            go.update(delta);
        });
    },

    render: function () {
        delta = this.delta;
        this.gameObjects.forEach(function (go) {
            go.render(delta);
        });
    },

    main: function () {

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