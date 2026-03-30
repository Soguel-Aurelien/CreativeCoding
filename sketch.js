
let squares = [];
let chance = [1/3, 1/2, 2/3];

function setup() {
	createCanvas(400, 400);

	const squareSize = 100;
	const gap = 20;
	const gridSize = 3 * squareSize + 2 * gap;
	const startX = (width - gridSize) / 2;
	const startY = (height - gridSize) / 2;

	for (let row = 0; row < 3; row++) {
		for (let column = 0; column < 3; column++) {
			const x = startX + column * (squareSize + gap);
			const y = startY + row * (squareSize + gap);

			squares.push({
				x,
				y,
				size: squareSize,
			});
		}
	}
}

function draw() {
	background(255);
	stroke(0);
	noFill();

	for (const currentSquare of squares) {
		square(currentSquare.x, currentSquare.y, currentSquare.size);

        direction=Math.random()<0.5 ? 1 :2;

        if(direction==1){
            fraction=random(chance);
            const offset= square.size*fraction;

            line(currentSquare.x, currentSquare.y+offset, currentSquare.x+square.size, currentSquare.y+offset);
        }
       
	}

}


