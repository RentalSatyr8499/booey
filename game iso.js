var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ghostX = canvas.width/2;
var ghostY = canvas.height-30;
var dx = 0;
var dy = 0;
var distanceMoved = 0;
var ghostSize = .2;
var crateX = 0;  
var crateY = 0;  
var interactionDistance = 50;  // The distance within which the ghost can interact with the object

/* load images!*/
var bgImage = new Image();
bgImage.src = './art/iso1-bg.png';
var ghostImages = [new Image(), new Image(), new Image(), new Image()];
ghostImages[0].src = './art/ghost1.png';
ghostImages[1].src = './art/ghost2.png';
ghostImages[2].src = './art/ghost3.png';
ghostImages[3].src = './art/ghost4.png';
var ghostApple = [new Image(), new Image(), new Image(), new Image()];
ghostApple[0].src = './art/ghostapple1.png';
ghostApple[1].src = './art/ghostapple2.png';
ghostApple[2].src = './art/ghostapple3.png';
ghostApple[3].src = './art/ghostapple4.png';

/* draw images!*/
var currentImgArray = ghostImages
var currentImg = currentImgArray[0];
function draw() {
    // canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // bg
    ctx.drawImage(bgImage, 0, canvas.height/4, canvas.width, (bgImage.height/bgImage.width)*canvas.width); //bg

    /* messages */
    var crateDistance = Math.sqrt(Math.pow(ghostX - crateX, 2) + Math.pow(ghostY - crateY, 2));
    if (crateDistance <= interactionDistance) {
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('Press space to open', 10, 30);
    }

    /* GHOST */
    // Draw the current image
    ctx.drawImage(currentImg, ghostX, ghostY, ghostSize*currentImg.width, ghostSize*currentImg.height);
    ghostX += dx;
    ghostY += dy;
    
    // animate ghost
    // Update the total distance moved
    distanceMoved += Math.abs(dx) + Math.abs(dy);
    // If the ghost has moved more than 20 pixels, change the image
    if (distanceMoved >= 20) {
        distanceMoved = 0;
        currentImg = currentImgArray[(currentImgArray.indexOf(currentImg) + 1) % currentImgArray.length];
    } 

  }
setInterval(draw, 10);

/* listen for user input!*/
document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            dx = -2;
            dy = 0;
            break;
        case 38:
            dx = 0;
            dy = -2;
            break;
        case 39:
            dx = 2;
            dy = 0;
            break;
        case 40:
            dx = 0;
            dy = 2;
            break;
        case 32:  // Space key
            // If the ghost is near the object, change the image
            var crateDistance = Math.sqrt(Math.pow(ghostX - crateX, 2) + Math.pow(ghostY - crateY, 2));
            if (crateDistance <= interactionDistance) {
                currentImgArray = ghostApple;
            }
            break;
    }
    
};
document.onkeyup = function(e) {
    dx = 0;
    dy = 0;
};

/* firebase stuff */
function submitScore(name) {
  var newPlayerRef = database.ref('players').push();
  newPlayerRef.set({
    name: name,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  });
}
