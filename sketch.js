var restart, gameover, restartSprite, gameoverSprite
var trex, trex_running, trexIsDead, edges;
var groundImage, ground;
var falseGround;
var cloud, cloudImg;
var cactuSprite, cactus1, cactus2, cactus3, cactus4, cactus5, cactus6;
var cactusGroup;
var cloudGroup;
var jogoEst = "play";
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexIsDead = loadImage("trex_collided.png")
  groundImage = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");
  cactus1 = loadImage("obstacle1.png");
  cactus2 = loadImage("obstacle2.png");
  cactus3 = loadImage("obstacle3.png");
  cactus4 = loadImage("obstacle4.png");
  cactus5 = loadImage("obstacle5.png");
  cactus6 = loadImage("obstacle6.png");
  restart = loadImage("restart.png")
  gameover = loadImage("gameOver.png")
}

function setup() {
  edges = createEdgeSprites();
  createCanvas(600, 200);
  //criando o trex
  restartSprite = createSprite(300, 100)
  restartSprite.addImage("restart.png", restart)
  restartSprite.scale = 0.5
  restartSprite.visible = false
  gameoverSprite = createSprite(300, 65)
  gameoverSprite.addImage("gameOver.png", gameover)
  gameoverSprite.scale = 0.8
  gameoverSprite.visible = false
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addImage("trex_collided", trexIsDead)
  trex.scale = 0.5;
  trex.x = 50;
  cactusGroup = new Group()
  cloudGroup = new Group()
  ground = createSprite(300, 180);
  ground.addImage("chao", groundImage);
  falseGround = createSprite(300, 181, 600, 1);
  falseGround.visible = false;
  trex.debug = true
  trex.setCollider ("circle", 52, -73, 40)
 //trex.setCollider("rectangle", 60, 0, 100, 200, 90)
}

function draw() {
  //definir a cor do plano de fundo
  background("white");

  if(jogoEst === "play"){
      if (keyDown("space") && trex.y > 140) {
    trex.velocityY = -10;
  }
  trex.velocityY = trex.velocityY + 0.5;
  ground.velocityX = -10;
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  cloudSet();
  cactus();
  if(trex.isTouching(cactusGroup)) {
    jogoEst = "gameOver"
  }
  } 
  else if(jogoEst === "gameOver") {
    trex.changeAnimation("trex_collided", trexIsDead)
    ground.velocityX = 0
    cactusGroup.setVelocityEach(0)
    cloudGroup.setVelocityEach(0)
    cactusGroup.setLifetimeEach(-1)
    cloudGroup.setLifetimeEach(-999)
    gameoverSprite.visible = true
    restartSprite.visible = true
  }

  //impedir que o trex caia
  trex.collide(falseGround);
  drawSprites();

}

function cloudSet() {
  if (frameCount % 50 === 0) {
    console.log("cloud")
    cloud = createSprite(600, 100);
    cloud.addImage(cloudImg);
    cloud.velocityX = -7;
    cloud.y = Math.round(random(0, 140));
    cloud.scale = Math.round(random(0.5, 0.7));
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud.lifetime = 100;
    cloudGroup.add(cloud)
  }
}

function cactus() {
  if (frameCount % 40 === 0) {
    cactuSprite = createSprite(600, 160, 30, 30);
    cactuSprite.scale = 0.7;
    cactuSprite.velocityX = -8;
    cactuSprite.lifetime = 100;
    cactusGroup.add(cactuSprite)
    randomic = Math.round(random(1, 6));
    switch (randomic) {
      case 1:
        cactuSprite.addImage(cactus1);
        break;

      case 2:
        cactuSprite.addImage(cactus2);
        break;
      case 3:
        cactuSprite.addImage(cactus3);
        break;
      case 4:
        cactuSprite.addImage(cactus4);
        break;
      case 5:
        cactuSprite.addImage(cactus5);
        break;
      case 6:
        cactuSprite.addImage(cactus6);
        break;

      default:
        break;
    }
  }
}
