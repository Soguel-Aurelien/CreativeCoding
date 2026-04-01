function preload(){
    kurtAngleMeme = loadImage("kurt_angle_meme.jpg");
    shockedMeme = loadImage("memeShocked.jpg");
}

function setup() {
	createCanvas(1000, 1000);
}

function draw(){
    //image(kurtAngleMeme, 100,100,400,400);
    kurtAngleMeme.loadPixels();
    //image(shockedMeme, 100,520,400,400);
    loadPixels();
    kurtAngleMeme.loadPixels();
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            const index = (x+y*width)*4;
            pixels[index+0]=mouseX;
            pixels[index+1]=mousY;
            pixels[index+2]=y;
            pixels[index+3]=100;
        }
    }
    updatePixels();
}
