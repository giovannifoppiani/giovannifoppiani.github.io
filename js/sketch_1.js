var lastX = 0;
var lastY = 0;

var newX = 0;
var newY = 0;

var xoff = 0.0;

//var direction= x+
function setup() {
	createCanvas(windowWidth, windowHeight);

	lastX = width / 2;
	lastY = height / 2;

	newX = lastX + 5;
	newY = lastY + 3;


}

function draw() {


	newX = lastX + random(-10, 10);
	newY = lastY + random(-10, 10);

	if (newX > width) {
		newX = width - 10;
	}

	if (newX < 0) {
		newX = 10;
	}

	stroke(255, 0, 0, 100);
	line(lastX, lastY, newX, newY);

	line(n, 0, n, height);
	var n = noise(xoff) * width;

	lastX = newX;
	lastY = newY;



}
