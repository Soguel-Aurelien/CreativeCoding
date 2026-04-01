let shockedMeme;
let kurtAngleMeme;

function preload(){
    kurtAngleMeme = loadImage('kurt_angle_meme.jpg');
    shockedMeme = loadImage('memeShocked.jpg');
}

function setup() {
	createCanvas(1000, 1000);
    deletemeplzx();
}

function deletemeplzx () {

    kurtAngleMeme.loadPixels();

    let red = kurtAngleMeme.pixels[i];
    let previousRed = null;
    
    for(let i = 0; i<kurtAngleMeme.pixels.length;i+=4){
        // kurtAngleMeme.pixels[i] = kurtAngleMeme.pixels[i];
        kurtAngleMeme.pixels[i+1] = 0;
        kurtAngleMeme.pixels[i+2] = 0;
        // kurtAngleMeme.pixels[i+3] = kurtAngleMeme.pixels[i];
        if(previousRed != null){
            if(red<previousRed){
                
            }
        }

    }
    kurtAngleMeme.updatePixels();
    image(kurtAngleMeme,100,100,400,400);
}

function zoomFilter(){
   let zoom = mouseX/200;

   let widthMeme = shockedMeme.width;
   let heightMeme = shockedMeme.height;

   let zoneWidth = widthMeme / zoom;
   let zoneHeight = heightMeme / zoom;

   let zoneX = (widthMeme - zoneWidth) / 2;
   let zoneY = (heightMeme - zoneHeight) / 2;

   image(shockedMeme,
    550, 100, 400, 450,
    zoneX, zoneY, zoneWidth, zoneHeight
   )

}
function orderPixelColor(){
    let previousRed = null;
    let previousGreen = null;
    let previousBlue = null;
    let previousAlpha = null;

    image(kurtAngleMeme,100,100,400,400);
    kurtAngleMeme.loadPixels();

    
    for(let i = 0; i<kurtAngleMeme.pixels.length;i+=4){
        let red = kurtAngleMeme.pixels[i];
        let green = kurtAngleMeme.pixels[i+1];
        let blue = kurtAngleMeme.pixels[i+2];
        let alpha = kurtAngleMeme.pixels[i+3];

        if(previousRed != null){
            if(red>previousRed){
                kurtAngleMeme.pixels[i]=red-4;
            }
        }
        
        if(previousGreen != null){
            if(green>previousGreen){
                kurtAngleMeme.pixels[i+1]=green-4;
            }
        }
        if(previousBlue != null){
            if(blue>previousBlue){
                kurtAngleMeme.pixels[i+2]=blue-4;
            }
        }
        if(previousAlpha != null){
            if(alpha>previousAlpha){
                kurtAngleMeme.pixels[i+3]=alpha-4;
            }
        }

        previousRed = red;
        previousGreen = green;
        previousBlue = blue;
        previousAlpha = alpha;

    }
    kurtAngleMeme.updatePixels();
    image(kurtAngleMeme,100,100,400,400);

    
}
    

function draw(){
    // orderPixelColor();

    zoomFilter();
}
