var balloon,balloonImage1,balloonImage2,database;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("HOT AIR BALLOON",balloonImage1);
  balloon.scale=0.5;

 var balloonRef =database.ref('balloon/height');
 balloonRef.on("value",readPosition,showError);
}

// function to display UI


  function draw(){
    background(bg);
    if(height != undefined){
      if(keyDown(LEFT_ARROW)){
        writePosition(-5,0);
        balloon.addAnimation("HOT AIR BALLOON",balloonImage2);
      }
      else if(keyDown(RIGHT_ARROW)){
        writePosition(5,0);
        balloon.addAnimation("HOT AIR BALLOON",balloonImage2);
      }
      else if(keyDown(UP_ARROW)){
        writePosition(0,-5);
        balloon.addAnimation("HOT AIR BALLOON",balloonImage2);
      }
      else if(keyDown(DOWN_ARROW)){
        writePosition(0,+5);
        balloon.addAnimation("HOT AIR BALLOON",balloonImage2);
      }
      drawSprites();
      fill(0);
      stroke("white");
      textSize(25);
      text("**Use arrow keys to move Hot Air Balloon!",40,40);
    
  }
}
  
  function writePosition(x,y){
    database.ref('balloon/height').set({
      'x': position.x + x ,
      'y': position.y + y
    })
  }
  
  function readPosition(data){
    position = data.val();
    //console.log(position.x);
    balloon.x = position.x;
    balloon.y = position.y;
  }
  
  function showError(){
    console.log("Error in writing to the database");
  }
  

  

  


