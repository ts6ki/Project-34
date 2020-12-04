var dog, happyDog, database, foodS, foodStock;
var dogImage, happyDogImage;

function preload()
{
  dogImage = loadImage("dogImg.png");
  happyDogImage = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  dog = createSprite(250,300);
  dog.addImage(dogImage);
  dog.scale = 0.25;

  foodStock = database.ref("food");
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(rgb(46, 139, 87));

  textSize(20);
  fill("white");
  text("Hint: Use the Up Arrow Key to feed the dog milk", 40, 30);

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }

  drawSprites();
  

}

function readStock(data)
{
  foodS = data.val();
  console.log(foodS);
}

function writeStock(x)
{
  if(x<=0)
  {
    x=0;
  }
  else  
  {
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}



