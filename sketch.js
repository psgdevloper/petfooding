var doggy, dogImg, milkcar
var  happyDog, database, foodS, foodStock;
function preload()
{
  dogImg = loadImage("dogImg1.png");
  happyDog = loadImage("dogImg.png");
  mv=loadImage("milkvan.png");
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  foodstock = database.ref("Food");
  foodstock.on("value", readStock);
  doggy = createSprite(250,250)
  doggy.addImage(dogImg);
  doggy.scale =0.4
  milkcar = createSprite(80,100)
  milkcar.addImage(mv);
  milkcar.scale =0.3
  milkcar.visible=0
}


function draw() {  
background(46,139,87);

if(keyWentDown("up")&& foodS>0){

  writeStock(foodS);
    doggy.addImage(happyDog);
    
}
if(foodS==0) {
  strokeWeight(2)
  stroke("red");
  fill("Orange")
  textSize(25);
  text("No Milk Bro, order Some Milk first", 50, 420)
  text("To order Milk press RIGHT key ", 100, 470)
}

if(keyWentDown("right") && foodS==0)
{ milkcar.visible=1
  
  for(var i=1; i<=20;i++){
    
    setTimeout(function() {
      addtostock(foodS); 
      if(foodS==20){
    milkcar.visible=0
  }
    }, 500 * i); 
  }
  

}

if(keyWentUp("up"))
{

  doggy.addImage(dogImg);
}


  drawSprites();
  //add styles here
  strokeWeight(5)
  stroke("Yellow");
  fill("Orange")
  textSize(20);
  text("Remaining Milk :    "+foodS, 250, 60)
}
function readStock(data){
foodS = data.val();

}

function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1;
  }
     database.ref("/").update({
    Food:x
  })
}

function addtostock(x){
  x=x+1
  database.ref("/").update({
   Food:x
 })

 }

