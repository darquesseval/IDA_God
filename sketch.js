let button;
let i=0;
let j=1
let direction = true;
let intro = [
    "Willkommen zum Eignungstest für Gottheiten!\n\nTestet euer göttliches Geschick. Versucht zu zweit ein Monument für die Menschen im Dorf zu bauen.\n\nEine Person baut, während die andere schaut und Anweisungen gibt.",
    "Bevor ihr jedoch mit dem Bau beginnen könnt, müsst ihr das von einem Erdbeben verwüstete Dorf aufräumen.\n\nStellt dazu die umgefallenen Gebäude abwechslungsweise wieder auf. Die Lichter zeigen euch ob diese korrekt stehen.\n\nSprecht euch ab wer mit bauen beginnt.",
    "Ihr habt nun einen Tag Zeit euer Monument auf dem Baufeld in der Mitte des Dorfes zu bauen.\n\nPro Spielzug/Spieleinsatz dürft ihr vier Elemente berühren/verschieben. Danach wird gewechselt.\n\nGestapelte Elemente dürfen miteinander verschoben werden, sofern nur ein Element berührt wird.\n\nFangt nun an zu bauen!"];
let displayedText = intro[0];
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  button = createButton('Weiter');
  button.position(windowWidth/2, windowHeight/2);
  button.style('background-color', color(0))
  button.style('color', 'white');
  button.style('font-size', 'windowWidth/20');
  button.size(windowWidth/5, windowHeight/8)
  button.center()
   button.mousePressed(startGame);

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
    textAlign(CENTER);
    textSize(windowWidth/80)
    fill(255)
    text(displayedText, windowWidth/2, 100);

    }

    function startGame() {
        console.log("Game starts now!")
        displayedText = intro[j]
        j=j+1
         }
        