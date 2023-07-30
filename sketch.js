var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieImg, zombieGroup;
var bullet, bulletImg
var heart1, heart2, heart3, heart1Img, heart2Img, heart3Img;
var score;


function preload(){
  
  bulletImg = loadImage("/assets/bullet.png");
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  zombieImg = loadImage("assets/zombie.png");
  bgImg = loadImage("assets/bg.jpeg");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  
  //creating the player's hearts
heart1 = createSprite(displayWidth-150, 40, 20, 20);
heart1.addImage("heart1",heart1Img);
heart1.visible = false

heart2 = createSprite(displayWidth-150, 40, 20, 20);
heart2.addImage("heart1",heart1Img);
heart2.visible = false

heart3 = createSprite(displayWidth-150, 40, 20, 20);
heart3.addImage("heart1",heart1Img);
heart3.visible = false

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

zombieGroup = new Group()
bulletGroup = new Group()
}

function draw() {
  background(0); 

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet = createSprite(player.position.x,player.position.y, 20, 7);
  bullet.addImage(bulletImg)
  bullet.scale = 0.1
  bullet.velocityX = 6
  bulletGroup.add(bullet);
  bullet.lifetime = 310
  player.addImage(shooter_shooting)
  
}
//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(zombieGroup.isTouching(bulletGroup)){
  //zombie.visible = false
  //bullet.visible = false
  for(var i=0; i<zombieGroup.length; i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
zombieGroup[i].destroy()
bulletGroup.destroyEach()
score += 1
    }
  }
}

if(zombieGroup.isTouching(player)){
   for (var i=0; i<zombieGroup.length; i++){
if(zombieGroup[i].isTouching(player)){
  zombieGroup[i].destroy()
}
  }
}
spawnEnemy()
drawSprites();

}

function spawnEnemy(){
  if(frameCount%50 === 0){
    zombie = createSprite(random(500,1100),random(100,500),40,40)
    zombie.addImage(zombieImg);
    zombie.scale = 0.13
    zombie.velocityX = -5
    zombie.lifetime = 235
    zombieGroup.add(zombie)
  }
}