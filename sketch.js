let button;
let LexendZettaRegular, LexendZettaBold;
let i=0;
let j=1;
let k=0;
let direction = true;
// let intro = [
//     "Willkommen zum Eignungstest für Gottheiten!\n\nTestet euer göttliches Geschick. Versucht zu zweit ein Monument für die Menschen im Dorf zu bauen.\n\nEine Person baut, während die andere schaut und Anweisungen gibt.",
//     "Bevor ihr jedoch mit dem Bau beginnen könnt, müsst ihr das von einem Erdbeben verwüstete Dorf aufräumen.\n\nStellt dazu die umgefallenen Gebäude abwechslungsweise wieder auf. Die Lichter zeigen euch ob diese korrekt stehen.\n\nSprecht euch ab wer mit bauen beginnt.",
//     "Ihr habt nun einen Tag Zeit euer Monument auf dem Baufeld in der Mitte des Dorfes zu bauen.\n\nPro Spielzug/Spieleinsatz dürft ihr vier Elemente berühren/verschieben. Danach wird gewechselt.\n\nGestapelte Elemente dürfen miteinander verschoben werden, sofern nur ein Element berührt wird.\n\nFangt nun an zu bauen!"];
let intro1;
let intro2;
let intro3;
let intro = []
let displayedIntro;
let prayers = [
    "Errichtet ein Stockwerk mit nur einer einzigen Art Bausteinsorte",
    "Es dürfen keine zwei gleichen Bausteine nebeneinander liegen"
]
let displayedPrayers;
let buttonText = "WEITER";
let prayersText = "GEBETE";
// let displayedText = intro[0];
let bird;



function preload(){
    LexendZettaRegular = loadFont("https://beamish-scone-b8a64e.netlify.app/Fonts/Lexend_Zetta/static/LexendZetta-Regular.ttf")
    LexendZettaBold = loadFont("https://beamish-scone-b8a64e.netlify.app/Fonts/Lexend_Zetta/static/LexendZetta-Bold.ttf")
    intro1 = loadImage('https://beamish-scone-b8a64e.netlify.app/Images/Intro11.png');
    intro2 = loadImage('https://beamish-scone-b8a64e.netlify.app/Images/Intro22.png');
    intro3 = loadImage('https://beamish-scone-b8a64e.netlify.app/Images/Intro33.png');
    intro =[intro1,intro2, intro3];
    displayedIntro = intro[0];
    displayedPrayers = prayers [k];
    bird = loadImage('https://beamish-scone-b8a64e.netlify.app/Images/bird.png');
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  background(102, 143, 83);

  button = createButton('');
  button.position(windowWidth/12*9.3, windowHeight/18*15.2);
  button.style('background-color', 'transparent');
  button.style('color', 'white');
  button.style('font-size', '2vw');
  button.style('font-familiy', 'LexendZettaRegular, regular');
  button.size(windowWidth/9, windowHeight/14)
   button.mousePressed(startGame);

}



function draw() {

    background(102, 143, 83)
    // fill(255,0,0);
    // rect(i,30,20);
    displayedIntro.resize(windowWidth, 0);
    image(displayedIntro, 0, 0);
    bird.resize(50, 0);
    image(bird,i,50);


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
    textSize(windowWidth/60)
    fill(255)
    // text(displayedText, windowWidth/2, 100);
    
    textFont(LexendZettaBold);
    text(buttonText, windowWidth/6*5, windowHeight/9*8);

    textFont(LexendZettaBold);
    text(prayersText, windowWidth/6*1, windowHeight/9*6.5);

    let displayedPrayers = random(prayers);
    textFont(LexendZettaRegular);
    text(displayedPrayers, windowWidth/6*1, windowHeight/9*7.5);

    }



function startGame() {
    console.log("Game starts now!")
    // displayedText = intro[j]
    displayedIntro = intro[j];
    j=j+1;
     }
        