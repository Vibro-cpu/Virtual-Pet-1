var dog;
var happyDog;
var database;
var foodS = 0;
var foodStock;

function preload()
{
  Dog = loadImage("Dog.png")
  Happydog = loadImage("Dog Wagging Tail.png")
}

function setup() {

  database = firebase.database();
  
	createCanvas(500, 500);
  dog = createSprite(250,250,20,20);
  dog.addImage(Dog);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock)
}


function draw() {  
  background(46,139,87)

  textSize(17.5);

  fill("white")

  stroke("black")

  text("Press the Up Arrow Key to feed your dog!",100,90)

  text("Treats Remaining : " + foodS,100,107.5)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(Happydog)
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(Dog)
  }

  drawSprites();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }

  else{
    x=x-1
  }

  database.ref('/').update({
    Food : x
  })
}