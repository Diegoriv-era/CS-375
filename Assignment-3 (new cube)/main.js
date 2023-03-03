var canvas = undefined;
var gl = undefined;
var time = 0.0;

function init() {
	canvas = document.getElementById("canvas");
	gl = canvas.getContext("webgl2");

	gl.clearColor(0.2, 0.1, 0.2, 1);
	
	square = new Square(gl);
	gl.enable(gl.DEPTH_TEST);
	square.P = mat4();
	square.MV = mat4();

	render();
}

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	time += 2.0;

	//square.MV = rotateY(time) * rotateZ(time) * rotateX(time);
	//square.MV = rotate(time, 45, 45);// * rotateY(45) * rotateX(45);
	square.MV = mult(mult(rotateX(time),rotateY(time)),rotateZ(time));

	square.render();

	requestAnimationFrame(render);
}

window.onload = init;

