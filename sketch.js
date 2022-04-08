// it is used to load image,sound and audio
//https://p5js.org/reference/#/p5/preload (ps5 libary)
//https://molleindustria.github.io/p5.play/docs/classes/Sprite.html
//indentation is structring thr code
var trex, trexAnimation; //VAR IS COMPUTER MEMORY
var ground, groundimage;
var invisibleGround;
var Clouds, Cloudsimg;
var cactus,
  cactusImage1,
  cactusImage2,
  cactusImage3,
  cactusImage4,
  cactusImage5,
  cactusImage6;
var gameOver,groundimage
var restart,restartimage
var score = 0;

var play = 0;
var end = 1;
var gamestate = play;
var CloudsGroup;
var cactusGroup;
var trexcollided

function preload() {
  trexAnimation = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundimage = loadImage("ground2.png");
  CloudsImage = loadImage("cloud.png");
  cactusImage1 = loadImage("obstacle1.png");
  cactusImage2 = loadImage("obstacle2.png");
  cactusImage3 = loadImage("obstacle3.png");
  cactusImage4 = loadImage("obstacle4.png");
  cactusImage5 = loadImage("obstacle5.png");
  cactusImage6 = loadImage("obstacle6.png");
  gameOverimage=loadImage("gameOver.png")
  restartimage=loadImage("restart.png")

  trexcollided=loadAnimation("trex_collided.png")
}

//any spirte one time in a program
function setup() {
  createCanvas(600, 200);

  //trex
  trex = createSprite(30, 195, 50, 50);
  trex.addAnimation("trex", trexAnimation);
  trex.addAnimation("trexcollided",trexcollided)
  trex.scale = 0.5;

   //DEBUGING THE TREX
   trex.debug = false
  //  trex.setCollider("rectangle", 0,0,280,trex.y)
  trex.setCollider("circle", -5,0,46)
  

   //to give 
 
  //ground
  ground = createSprite(300, 195, 600, 10);
  ground.addImage("floor", groundimage);

  //invisible sprite
  invisibleGround = createSprite(300, 195, 600, 10);
  invisibleGround.visible = false;

  //creating group
  //groupname=createGroup()
  CloudsGroup = new Group();
  cactusGroup = new Group();
//gameover
gameOver=createSprite(282,70)
gameOver.addImage("gameover",gameOverimage)
gameOver.scale=0.5

//restart
restart=createSprite(300,100)
restart.addImage("restart",restartimage)
restart.scale=0.5

//restart=createSprite()
}

// to display any object and its functions continously in a program
function draw() {
  background("black");

  drawSprites();
  text(mouseX + "," + mouseY, mouseX, mouseY);
  text("score:   " + score, 500, 50);

  if (gamestate === play) {
    score = score + Math.round(frameCount / 60);
    if (keyDown("space") && trex.y >= 165) {
      trex.velocityY = -9;
    } else if (keyDown("UP") && trex.y >= 165) {
      trex.velocityY = -9;
    }
    gameOver.visible=false
    restart.visible=false


    trex.velocityY = trex.velocityY + 0.5;

    //infinite background
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    ground.velocityX = -4;

    //calling user defined function
  CreateClouds();
  createobstacles();

    if (cactusGroup.isTouching(trex)) {
      trex.changeAnimation("trexcollided",trexcollided)
       gamestate = end;
    }
  } else if (gamestate == end) {
    trex.velocityY = 0;
    ground.velocityX = 0;

    CloudsGroup.setVelocityXEach(0)
    cactusGroup.setVelocityXEach(0)
    CloudsGroup.setLifetimeEach(-100)
    cactusGroup.setLifetimeEach(-100)
    gameOver.visible=true
    restart.visible=true
    if(mousePressedOver(restart)){
      restartgame()
    }

  }



  trex.collide(invisibleGround);

  
 // console.log(trex.y)
  // console.log(!FALSE)
}

function CreateClouds() {
  if (frameCount % 100 === 0) {
    Clouds = createSprite(550, 30, 60, 10);
    Clouds.velocityX = -2;
    // console.log("create clouds" + frameCount);
    Clouds.y = Math.round(random(30, 120));
    Clouds.addImage("Cloudyy", CloudsImage);
    closed.scale = 0.3;

    trex.depth = Clouds.depth;

    // console.log("trex depth is: ",trex.depth)
    // console.log("Clouds depth is: ",Clouds.depth)
    //lifetime=distance/speed
    //clodslifetime=550/4=137
    Clouds.lifetime = 275;

    //adding clouds to cloud group
    CloudsGroup.add(Clouds);

  }
}
function createobstacles() {
  if (frameCount % 60 === 0) {
    cactus = createSprite(580, 173, 10, 60);
    cactus.velocityX = -6;
    var number = Math.round(random(1, 6));
    switch (number) {
      case 1:
        cactus.addImage(cactusImage1);
        break;

      case 2:
        cactus.addImage(cactusImage2);
        break;

      case 3:
        cactus.addImage(cactusImage3);
        break;

      case 4:
        cactus.addImage(cactusImage4);
        break;

      case 5:
        cactus.addImage(cactusImage5);
        break;

      case 6:
        cactus.addImage(cactusImage6);
        break;

      default:
        break;
    }
    cactus.scale = 0.5;
    cactus.lifetime = 96;

    cactusGroup.add(cactus);
  }
}
function restartgame(){
gamestate=play
score=0
cactusGroup.destroyEach();
CloudsGroup.destroyEach();
}
