var PLAY = 1;
var END = 0;
var gameState = PLAY;

var mario, mario_running, mario_collided;
var ground, invisibleGround, groundImage;

var coinsGroup, coinImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
  mario_running = loadAnimation("mario.jpg","mario.jpg","mario.jpg");
  mario_collided = loadAnimation("end.jpg");
  
  groundImage = loadImage("bg.jpg");
  
  coinImage = loadImage("coin.jpg");
  
  obstacle = loadImage("obstacle.jpg");
  obstacle2 = loadImage("obstacle2.jpg");
  obstacle3 = loadImage("obstacle3.jpg");
  /*obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");*/
  
  restartImg= loadImage("restart.png")
  gameOverImg= loadImage("gameOver.png")
  jumpSound=loadSound("jump.mp3")
  dieSound=loadSound("die.mp3")
  checkpointSound=loadSound("checkpoint.mp3")
}

function setup() {
  createCanvas(600, 200);
  
  mario = createSprite(50,180,20,50);
  mario.addAnimation("running", mario_running);
  mario.addAnimation("collided" , mario_collided)
  mario.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("bg",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  coinsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  mario.setCollider("rectangle", 0, 0, 400, mario.height);
  mario.debug = false 
  
  score = 0;

  gameOver= createSprite(300, 100);
  gameOver.addImage(gameOverImg)
  gameOver.scale= 0.5;

  restart= createSprite(300, 140);
  restart.addImage(restartImg)
  restart.scale= 0.5;

}

function draw() {
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    gameOver.visible=false;
    restart.visible=false
    //move the ground
    ground.velocityX = -4;
    //scoring
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& mario.y >=100) {
        mario.velocityY = -13;
        jumpSound.play()
    }
    
    //add gravity
    mario.velocityY = mario.velocityY + 0.8
  
    //spawn the clouds
    spawnCoins();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(mario)){
        //gameState = END;
//dieSound.play();
mario.velocityY=-12
jumpSound.play()
    }
  }
   else if (gameState === END) {

    gameOver.visible=true
    restart.visible=true
      ground.velocityX = 0;
      mario.velocityY= 0
      mario.changeAnimation("end", end)
     
      obstaclesGroup.setLifetimeEach(-1)
      coinsGroup.setLifetimeEach(-1)
     obstaclesGroup.setVelocityXEach(0);
     coinsGroup.setVelocityXEach(0);
   }
  
 
  //stop trex from falling down
  mario.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      /*case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;*/
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnCoins() {
  //write code here to spawn the clouds
   if (frameCount % 60 === 0) {
     coin = createSprite(600,100,40,10);
    coin.y = Math.round(random(10,60));
    coin.addImage(cloudImage);
    coin.scale = 0.5;
    coin.velocityX = -3;
    
     //assign lifetime to the variable
    coin.lifetime = 134;
    
    //adjust the depth
    coin.depth = mario.depth;
    mario.depth = mario.depth + 1;
    
    //adding cloud to the group
   coinsGroup.add(coin);
    }
}

