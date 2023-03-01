/////////////////////////////////////////////////////////////////////////////
//
//  Square.js
//

function Square(gl, vertexShader, fragmentShader) {

    vertexShader ||= "Square-vertex-shader";
    fragmentShader ||= "Square-fragment-shader";

    let program = initShaders(gl, vertexShader, fragmentShader);

    // Set up our data:
    //   - positions contains our vertex positions
    //   - indices contains how to organize the vertices
    //       into primitives
    //
    let positions = [
        0,0,0, //0   0 = -.5 & 1 = .5
        1,0,0, //1
        1,1,0, //2
        0,1,0, //3

        0,0,1, //4
        1,0,1, //5
        1,1,1, //6
        0,1,1 //7
    ];

    let indices = [

        
         6,4,7, //face 
         5,4,6, //
         2,5,6, // right
         1,5,2, // 
         3,1,2, //
         0,1,3, // back
         7,0,3, //left
         4,0,7,
         2,7,3, //top
         6,7,2,
         5,0,4, //bottom
         1,0,5

    ];

    // Initialize all of our WebGL "plumbing" variables
    //
    let aPosition = new Attribute(gl, program, positions,
	    "aPosition", 3, gl.FLOAT);

    indices = new Indices(gl, indices);

    let MV = new Uniform(gl, program, "MV");
    let P  = new Uniform(gl, program, "P");

    this.render = () => {
        gl.useProgram(program);

        aPosition.enable();
        indices.enable();

        MV.update(this.MV);
        P.update(this.P);

        gl.drawElements(gl.TRIANGLES, indices.count, indices.type, 0);

        indices.disable();
        aPosition.disable();
    
    };
};
