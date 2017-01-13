var a = new Vector(1, 1);
var b = new Vector(2, 0);

console.log('a', a);
console.log('b', b);

console.log('a.magnitude', a.magnitude());
console.log('a.normalize', a.normalize());
console.log('a.add', a.add(b));
console.log('a.subtract', a.subtract(b));
console.log('a.scale', a.scale(2));
console.log('a.dot', a.dot(b));
