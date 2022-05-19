let button;
let i=0;
let direction = true;
let text = [
    "Hallo!",
    "Wie geht es dir?"];
let displayedText = text[0];
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  button = createButton('click me');
  button.position(windowWidth/2, windowHeight/2);
  button.style('background-color', color(0,0,255))
  button.size(windowWidth/3, windowHeight/3)
  button.center()
   button.mousePressed(startGame);

text()

}

 

function draw() {

    background(0)
    fill(255,0,0);
    rect(i,30,20);

    if(i>=windowWidth){
        direction = false;
    } else if(i<=0){
        direction = true;
    }  


    if(direction == true){
        i+=5;
    } else {
        i-=5;
    }  
    }

    function startGame() {
        console.log("Game starts now!")
         }