
PLAY=1;
END=0;
gameState=PLAY;
var bg,bgImg,gameover,gameOver;
var player, bow, arrow, shooterImg, shooter_shooting;
var alien,alienImg;
var alienGroup;
var invisibleGround;
var arrowGroup;

function preload(){
  
  shooterImg = loadImage("assets/soldado.png")
  alienImg=loadImage("assets/alien.png")
  bgImg = loadImage("assets/space.png")
  gameover=loadImage("assets/gameOver.png");

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-400, 50, 50);
console.log("player",player.x)
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false
   player.setCollider("rectangle",0,0,300,500)



  invisibleGround = createSprite(displayWidth-1150,displayHeight-300,4000,10);
  invisibleGround.visible = false;


   alienGroup=new Group();
   arrowGroup=new Group(); 

}

function draw() {
  background(0); 
if(gameState===PLAY){


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if (keyWentDown("space")) {
  createArrow();
}





   aliens();
  


player.collide(invisibleGround);

drawSprites();

}
}
function aliens(){
if(frameCount%120===0){
alien=createSprite(1190,displayHeight/2);
alien.debug = false   
alien.x=random(800,1500)
   console.log(alien.x);
   alien.addImage(alienImg);
   alien.scale=0.2
  alienGroup.setColliderEach("rectangle",0,0,500,500)
 alien.velocityX=-2
  alienGroup.add(alien)
  
   
}





if(alienGroup.isTouching(arrowGroup)){
  for(var i=0;i <alienGroup.length;i++){
    if(alienGroup[i].isTouching(arrowGroup)){
      alienGroup[i].destroy();
      arrowGroup.destroyEach();
    }
  }
}


  if (alienGroup.isTouching(player)){
    alienGroup.setVelocityXEach(0);
  player.visible=false;
  }

}

function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  //arrow.addImage(arrowImage);
  arrow.x = 850;
  arrow.y=player.y;
  arrow.velocityX = 4;
  arrow.lifetime = 200;
  arrow.scale = 0.3;
  arrow.shapeColor=("yellow")
  arrowGroup.add(arrow);
}
