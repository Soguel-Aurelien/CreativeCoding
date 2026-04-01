
let squares = [];
let chances = [0.3, 0.5, 0.6, 0];

function setup() {
	createCanvas(400, 400);

	const squareSize = 100;
	const gap = 20;
	const gridSize = 3 * squareSize + 2 * gap;
	const startX = (width - gridSize) / 2;
	const startY = (height - gridSize) / 2;
	console.log("Width: "+width,"Height: "+height,"GridSize: "+gridSize);
	console.log("StrX: "+startX,"StrY: "+startY);

	for (let row = 0; row < 3; row++) {
		for (let column = 0; column < 3; column++) {
			const x = startX + column * (squareSize + gap);
			const y = startY + row * (squareSize + gap);
			console.log("X: "+x,"Y: "+y);

			squares.push({
				x,
				y,
				size: squareSize,
			});
		}
	}
}


function draw() {
	frameRate(5);
	background(255);
	stroke(0);

	for (const currentSquare of squares) {
		square(currentSquare.x, currentSquare.y, currentSquare.size);

		// const direction = Math.floor(Math.random() * 2) + 1;
		const direction = Math.random();
		const fraction = random(chances);
		const part = currentSquare.size*fraction;

		if(direction>=0.5){
            
            line(currentSquare.x, currentSquare.y+part, currentSquare.x+currentSquare.size, currentSquare.y+part);
        }else{
            line(currentSquare.x+part, currentSquare.y, currentSquare.x+part, currentSquare.y+currentSquare.size);
        }
	}
}


