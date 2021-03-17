//flappy bird
// names of variables
var bird, bird_image;
var bg1, bg1_image,bg,backgroundImg;
var bg2,bg2_image;
var pipe1,pipeD_image;
var pipe2,pipeU_image;
var pipe1Group, pipe2Group;
var coin, coin_image;
var coinGroup;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, r,restart_image;

function preload(){
bird_image=loadImage("images/bird.png");
//bg1_image=loadImage("images/bg1.png");
bg2_image=loadImage("images/bg2.png");
coin_image=loadImage("images/coin.png")
pipeD_image=loadImage("images/pipeD.png");
pipeU_image=loadImage("images/pipeU.png");
restart_image=loadImage("images/reset.png");
getBackgroundImg();
}

function setup() {
  createCanvas(500,512);
  
  //background
  //bg1 = createSprite(144,256,10,10);
  //bg1.addImage(bg1_image);
 // bg1.scale = 2;
  
  //foot ground
  bg2=createSprite(200,550,300,100);
  bg2.addImage(bg2_image);
   
  bg2.scale =2;
  //bird
  bird = createSprite(25,256,10,10);
  bird.addImage(bird_image);
  
  // restart button

  //r=createSprite(144,256,10,20);
  //r.addImage(restart_image);
  //r.scale = 0.25;

  //pipe group
  pipe1Group = new Group();
  pipe2Group = new Group();
  coinGroup = new Group();
  
  //scoring
  score = 0;
  
  //restarting the game
  restart = createSprite(144,256,10,10);
  restart.addImage(restart_image);
  restart.visible=false;
  restart.scale = 0.1;
  }
  
  function draw() {
    if(backgroundImg){
    background(backgroundImg);
    }

    if(gameState === PLAY){
    spawnPipe();
    spawnCoin();
  
    //bird movement
  if (keyDown("space")){
    bird.y = bird.y - 15;
    }
    else{
    bird.velocityY = 5;
    }
   
    //ground movement
  //bg2.velocityX = -1;
  
  //repositioning foot ground
  //if(bg2.x < 137){
    //bg2.x = bg2.width/2;
    //}
  
    //game end
    if (bird.isTouching(pipe1Group) || bird.isTouching(pipe2Group)){
      gameState = END;
    }
    if(bird.isTouching(bg2)){
      gameState = END;
    }
    
  if(frameCount % 75 === 0){
  score++;
  }

  if(bird.isTouching(coinGroup)){
    score+=20;
  }

  }
  else if(gameState === END)  {
  //bg2.velocityX = 0;
  bird.visible = false;
  bird.x=25;
  bird.y=256;
  pipe1Group.setVelocityXEach(0);
  pipe2Group.setVelocityXEach(0);
  pipe1Group.setLifetimeEach(-1);
  pipe2Group.setLifetimeEach(-1);
  restart.visible=true;
  }
    
  if(mousePressedOver(restart)){
    reset();
  }
  
  drawSprites();
  
  textSize(30);
  textFont("Georgia");
  text("Score:" + score,175,500);
  }
  
  function spawnPipe(){
  if (frameCount % 75 === 0 ){
    pipe1 = createSprite(144,0,10,100);
    pipe1.addImage(pipeD_image);
    pipe1.y = random(0,50);
    pipe1.velocityX = -2;
    pipe1Group.add(pipe1);
    pipe1Group.setLifetimeEach(144);
   
    pipe2 = createSprite(144,512,10,100);
    pipe2.addImage(pipeU_image);
    pipe2.y = random(462,512);
    pipe2.velocityX = -2;
    pipe2Group.add(pipe2);
    pipe2Group.setLifetimeEach(144);
  
  }
  
  }
  
  function spawnCoin(){
    if (frameCount % 80 === 0 ){
      coin = createSprite(250,250,20,20);
      coin.scale = 0.1;
      coin.addImage(coin_image);
      coin.x = random (20,25);
      coin.velocityX = -2.5;
      coinGroup.add(coin);
      coin.lifetime = 150;
    }
  }



  function reset(){
    gameState = PLAY;
    pipe1Group.destroyEach();
    pipe2Group.destroyEach();
    score = 0;
    bird.visible=true;
    restart.visible=false
  }

  async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    //012345678910 1112
    //2021-01-13 T  1 5 : 2 0 - 05:00   est
    //2021-01-14 T  0 1 : 5 2 + 05:30   ist
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=19){
        bg = "images/bg1.png";
    }
    else{
        bg= "images/bgN.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}