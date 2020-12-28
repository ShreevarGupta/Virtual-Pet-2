var dog, dogImg, dogHappy;
var database;
var foodStock;
var foodObject;
var feed, add;
var position;
var feedTime, lastFeed;

function preload() {
  
  dogImg = loadImage("Dog.png");
  dogHappy = loadImage("happydog.png");
  
}

function setup() {

  createCanvas(1500, 600);
  
  database = firebase.database();

  dog = createSprite(1250, 350, 30, 30);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodObject = new Food();

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  feed = createButton("Feed Choco milk");
  feed.position(900, 200);
  feed.mousePressed(feedDog);

  add = createButton("Add Food");
  add.position(800, 200);
  add.mousePressed(addFood);

}


function draw() {  

  background(rgb(46, 139, 87));
  
  foodObject.display();

  feedTime = database.ref("FeedTime");
  feedTime.on("value", function(data){
    lastFeed = data.val(); 
  })

  fill(255, 255, 254);
  textSize(20);
  if(lastFeed>=12) 
    text("Last Feed : " + lastFeed%12 + " PM", 350, 62);
  
  else if(lastFeed === 0) 
   text("Last Feed : 12 AM", 350, 62);
 
  else
   text("Last Feed : " + lastFeed + " AM", 350, 62);

  drawSprites();

}


function readStock(data) {

  foodS = data.val();
  foodObject.updateFoodStock(foodS);

}


function writeStock(x) {

  database.ref("/").update({
    Food:x
  })

}

function feedDog() {

  dog.addImage(dogHappy);

  foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  database.ref("/").update({
    Food:foodObject.getFoodStock(),
    FeedTime:hour()
  })

}

function addFood() {

  foodS = foodS+1;
  database.ref('/').update({
    Food:foodS
  })

}