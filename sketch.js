let button;
let buttonDecline;
let buttonDecline2;
let buttonAchieved;
let buttonAchieved2;
let LexendZettaRegular, LexendZettaBold;
let i=0;
let j=1;
let k=1;
let timer = 0;
let timer2 = 0;
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
    "Errichtet ein Stockwerk mit nur \neiner einzigen Art Bausteinsorte",
    "Es dürfen keine zwei gleichen \nBausteine nebeneinander liegen",
    "Ersetzt auf der unteren Plattform \nalle Bausteine durch Würfel",
    "Erhöht die unterste Plattform um \nmindestens einen weiteren Bauustein."
]
let prayers2 = [
    "Oh bitte baut von nun an nur noch mit links, \ndenn ich habe eine Abneigung gegen rechte Baukunst.",
    "Platziert auf der nächsten Plattform \nvon jeder Art Baustein mindestens einen.",
    "Verwendet auf der jetztigen Etage nur \nzwei unterschiedliche Bausteinsoorten",
    "Reduziert die obersten zwei Plattformen \ndamit es nur noch als eine ganz oben thront"
]
let displayedPrayers;
let displayedPrayers2;
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
    // bird = loadImage('https://beamish-scone-b8a64e.netlify.app/Images/bird.png');
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

   buttonDecline = createButton('ABLEHNEN');
   buttonDecline.position(windowWidth/12*7, windowHeight/18*15.2);
   buttonDecline.style('background-color', 'transparent');
   buttonDecline.style('color', 'white');
   buttonDecline.style('font-size', '2vw');
   buttonDecline.style('font-familiy', 'LexendZettaRegular, regular');
   buttonDecline.size(windowWidth/9, windowHeight/14)
   buttonDecline.mousePressed(declinePrayers)

   buttonAchieved = createButton('ERREICHT');
   buttonAchieved.position(windowWidth/12*8, windowHeight/18*15.2);
   buttonAchieved.style('background-color', 'transparent');
   buttonAchieved.style('color', 'white');
   buttonAchieved.style('font-size', '2vw');
   buttonAchieved.style('font-familiy', 'LexendZettaRegular, regular');
   buttonAchieved.size(windowWidth/9, windowHeight/14)
   buttonAchieved.mousePressed(achievedPrayers)

   buttonDecline2 = createButton('ABLEHNEN');
   buttonDecline2.position(windowWidth/12*7, windowHeight/18*17);
   buttonDecline2.style('background-color', 'transparent');
   buttonDecline2.style('color', 'white');
   buttonDecline2.style('font-size', '2vw');
   buttonDecline2.style('font-familiy', 'LexendZettaRegular, regular');
   buttonDecline2.size(windowWidth/9, windowHeight/14)
   buttonDecline2.mousePressed(declinePrayers2)

   buttonAchieved2 = createButton('ERREICHT');
   buttonAchieved2.position(windowWidth/12*8, windowHeight/18*17);
   buttonAchieved2.style('background-color', 'transparent');
   buttonAchieved2.style('color', 'white');
   buttonAchieved2.style('font-size', '2vw');
   buttonAchieved2.style('font-familiy', 'LexendZettaRegular, regular');
   buttonAchieved2.size(windowWidth/9, windowHeight/14)
   buttonAchieved2.mousePressed(achievedPrayers2)

}



function draw() {

    background(102, 143, 83)
    // fill(255,0,0);
    // rect(i,30,20);
    displayedIntro.resize(windowWidth, 0);
    image(displayedIntro, 0, 0);
    // bird.resize(50, 0);
    // image(bird,i,50);


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
   
    textAlign(CENTER);
    textSize(windowWidth/60)
    fill(255)
    // text(displayedText, windowWidth/2, 100);
    
    textFont(LexendZettaBold);
    text(buttonText, windowWidth/6*5, windowHeight/9*8);

    textFont(LexendZettaBold);
    text(prayersText, windowWidth/6*1, windowHeight/9*6.5);

    if (millis() > timer){
        displayedPrayers = random(prayers);
        timer=timer+random(10000,30000);
        buttonDecline.show();
        buttonAchieved.show();
        print("New Prayer")
    }
    if (millis() > timer2){
        displayedPrayers2 = random(prayers2);
        timer2=timer2+random(10000,30000);
        buttonDecline2.show();
        buttonAchieved2.show();
        print("New Prayer")
    }
    // print("millis: "+millis() + " timer: "+timer);
    textFont(LexendZettaRegular);
    textAlign(LEFT);
    text(displayedPrayers, windowWidth/12*1, windowHeight/9*7.5);
    text(displayedPrayers2, windowWidth/12*1, windowHeight/9*8.5);

}

function startGame() {
    console.log("Next Slide")
    // displayedText = intro[j]
    displayedIntro = intro[j];
    j=j+1;
     }
function declinePrayers() {
    displayedPrayers = ""
    buttonDecline.hide();
    buttonAchieved.hide();
    print("Noo!")
}
function achievedPrayers() {
    displayedPrayers = random(prayers);
    print("Yey!")
}
function declinePrayers2() {
    displayedPrayers2 = ""
    buttonDecline2.hide();
    buttonAchieved2.hide();
    print("Noo!")
}
function achievedPrayers2() {
    displayedPrayers2 = random(prayers2);
    print("Yey!")
}