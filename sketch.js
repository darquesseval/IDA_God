let button;
let LexendZetta;
let i=0;
let j=1;
let direction = true;
// let intro = [
//     "Willkommen zum Eignungstest für Gottheiten!\n\nTestet euer göttliches Geschick. Versucht zu zweit ein Monument für die Menschen im Dorf zu bauen.\n\nEine Person baut, während die andere schaut und Anweisungen gibt.",
//     "Bevor ihr jedoch mit dem Bau beginnen könnt, müsst ihr das von einem Erdbeben verwüstete Dorf aufräumen.\n\nStellt dazu die umgefallenen Gebäude abwechslungsweise wieder auf. Die Lichter zeigen euch ob diese korrekt stehen.\n\nSprecht euch ab wer mit bauen beginnt.",
//     "Ihr habt nun einen Tag Zeit euer Monument auf dem Baufeld in der Mitte des Dorfes zu bauen.\n\nPro Spielzug/Spieleinsatz dürft ihr vier Elemente berühren/verschieben. Danach wird gewechselt.\n\nGestapelte Elemente dürfen miteinander verschoben werden, sofern nur ein Element berührt wird.\n\nFangt nun an zu bauen!"];
let intro1;
let intro2;
let intro3;
let intro = []
let displayedIntro
let buttonText = "Weiter";
// let displayedText = intro[0];



function preload(){
    LexendZetta = loadFont("./Fonts/Lexend_Zetta/static/LexendZetta-Regular.ttf")
    intro1 = loadImage('./Images/Intro1.png');
    intro2 = loadImage('./Images/Intro2.png');
    intro3 = loadImage('./Images/Intro3.png');
    intro =[intro1,intro2, intro3];
    displayedIntro = intro[0];
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  background(102, 143, 83);

  button = createButton('');
  button.position(windowWidth/16*7, windowHeight/18*14.9);
  button.style('background-color', 'transparent');
  button.style('color', 'white');
  button.style('font-size', '2vw');
  button.style('font-familiy', 'LexendZetta, regular');
  button.size(windowWidth/10, windowHeight/14)
   button.mousePressed(startGame);

}



function draw() {

    background(102, 143, 83)
    // fill(255,0,0);
    // rect(i,30,20);
    displayedIntro.resize(windowWidth, 0);
    image(displayedIntro, 0, 0);


    // if(i>=windowWidth){
    //     direction = false;
    // } else if(i<=0){
    //     direction = true;
    // }  
    // if(direction == true){
    //     i+=5;
    // } else {
    //     i-=5;
    // }  
    textFont(LexendZetta);
    textAlign(CENTER);
    textSize(windowWidth/60)
    fill(255)
    // text(displayedText, windowWidth/2, 100);
    text(buttonText, windowWidth/2, windowHeight/9*8);

    }



function startGame() {
    console.log("Game starts now!")
    // displayedText = intro[j]
    displayedIntro = intro[j];
    j=j+1;
     }
        