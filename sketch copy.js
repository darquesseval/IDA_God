
let LexendZettaRegular, LexendZettaBold;//???

let startSlide;
let rebuildSlide;
let rulesSlide;
let homeSlide;
let housesSlide;
let endSlide;
let displayedSlide;
let challengeSlide0;
// challengeSlide1,etc.
let challengeSlide 

let buttonStart;
let buttonArduino;

let timer = 20000;
let q = 0;
let k = 0;

let challenges = [
    "Errichtet ein Stockwerk mit nur \neiner einzigen Art Bausteinsorte",
    "Es dürfen keine zwei gleichen \nBausteine nebeneinander liegen",
    "Ersetzt auf der unteren Plattform \nalle Bausteine durch Würfel",
    "Erhöht die unterste Plattform um \nmindestens einen weiteren Bauustein.",
    "Oh bitte baut von nun an nur noch mit links, \ndenn ich habe eine Abneigung gegen rechte Baukunst.",
    "Platziert auf der nächsten Plattform \nvon jeder Art Baustein mindestens einen.",
    "Verwendet auf der jetztigen Etage nur \nzwei unterschiedliche Bausteinsoorten",
    "Reduziert die obersten zwei Plattformen \ndamit es nur noch als eine ganz oben thront"
]
let displayedChallenges = [];

let IntroSlides = TRUE;


function preload(){
    startSlide = document.querySelector("#intro1");
    rebuildSlide = document.querySelector("#intro2");
    rulesSlide = document.querySelector("#intro3");
    homeSlide = document.querySelector("#homeSlide");
    challengeSlide0 = document.querySelector("#challengeSlide0");
    //challengeSlide1, etc. 
    challengeSlide = [challengeSlide0]//challengeSlide2, etc.
    housesSlide = document.querySelector("#housesSlide");
    endSlide = document.querySelector("#endSlide");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(102, 143, 83);
}



function draw() {

    background(102, 143, 83);
    displayedSlide.resize(windowWidth, 0);
    image(displayedSlide, 0, 0);

    buttonArduino = createButton('Arduino Input');
    buttonArduino.position(windowWidth/20*17, windowHeight/20*2);
    buttonArduino.style('background-color', 'transparent');
    buttonArduino.style('color', 'white');
    buttonArduino.style('font-size', '2vw');
    buttonArduino.style('font-familiy', 'LexendZettaRegular, regular');
    buttonArduino.size(windowWidth/9, windowHeight/14);

    buttonAccept = createButton('Akzeprieren');
    buttonAccept.position(windowWidth/20*8, windowHeight/20*17);
    buttonAccept.style('background-color', 'transparent');
    buttonAccept.style('color', 'white');
    buttonAccept.style('font-size', '2vw');
    buttonAccept.style('font-familiy', 'LexendZettaRegular, regular');
    buttonAccept.size(windowWidth/9, windowHeight/14);
    buttonAccept.hide();

    buttonIgnore = createButton('Ignorieren');
    buttonIgnore.position(windowWidth/20*17, windowHeight/20*17);
    buttonIgnore.style('background-color', 'transparent');
    buttonIgnore.style('color', 'white');
    buttonIgnore.style('font-size', '2vw');
    buttonIgnore.style('font-familiy', 'LexendZettaRegular, regular');
    buttonIgnore.size(windowWidth/9, windowHeight/14);
    buttonIgnore.hide();

    buttonStart = createButton('Start');
    buttonStart.position(windowWidth/20*17, windowHeight/20*14);
    buttonStart.style('background-color', 'transparent');
    buttonStart.style('color', 'white');
    buttonStart.style('font-size', '2vw');
    buttonStart.style('font-familiy', 'LexendZettaRegular, regular');
    buttonStart.size(windowWidth/9, windowHeight/14);
    buttonStart.mousePressed(rebuild);

    textFont(LexendZettaRegular);
    textAlign(LEFT);
    text(displayedChallenges[1], windowWidth/20*1, windowHeight/20*16);
    text(displayedChallenges[2], windowWidth/20*1, windowHeight/20*18);

    if (IntroSlides = TRUE){
        displayedSlide = startSlide;
    } else {
        displayedSlide = homeSlide
    }

    buttonArduino.mousePressed(houses)//if houses are moved

    if (millis() > timer + q){
        timer=timer+random(10000,30000);
        challenge();
    }

    if (millis() == 600000){
        end();
    }
}


// function start(){
//     buttonStart.mousePressed(rebuild);
// }
function rebuild() {
    IntroSlides = FALSE;
    displayedSlide = rebuildSlide;
    buttonStart.hide();

    // When all houses are rebuild -> function(rules)
    buttonArduino = createButton('Arduino Input');
    buttonArduino.position(windowWidth/20*17, windowHeight/20*2);
    buttonArduino.style('background-color', 'transparent');
    buttonArduino.style('color', 'white');
    buttonArduino.style('font-size', '2vw');
    buttonArduino.style('font-familiy', 'LexendZettaRegular, regular');
    buttonArduino.size(windowWidth/9, windowHeight/14);
    buttonArduino.mousepressed(rules)
}
function rules() {
    displayedSlide = rulesSlide;
    millis() = k;
    if (millis() = k + 20000){
        millis() = q; // is it still defined in draw?
        // start with draw
    }
}
function challenge(){
    let q = random(0, challenges.lenght-1);
    displayedSlide = challengeSlide[q];
    buttonAccept.show();
    buttonIgnore.show();
    buttonAccept.mousePressed(accept);
    buttonIgnore.mousePressed(ignore);
}
function accept(){
    displayedSlide = homeSlide;
    buttonAccept.hide();
    buttonIgnore.hide();

    if (displayedChallenges.lenght < 2){
        displayedChallenges.splice(0, 0, challenges[q]);
    } else {
        displayedChallenges.splice(1, 1);
        displayedChallenges.splice(0, 0, challenges[q]);
    }
    challenges.splice(q, 1);
    //play Yey! Sound
}
function ignore(){
    displayedSlide = homeSlide;
    buttonAccept.hide();
    buttonIgnore.hide();
    challenges.splice(q, 1);
    //play Nooo! Sound
}
function houses(){
    displaySlide = housesSlide
    //play alarm sound, stop sound if houses are ok and show homeSlide
    buttonArduino.mousePressed(displayedSlide = homeSlide)
}
function end(){
    displayedSlide = endSlide
    //making arduino crash the tower
    // stop new challenges

}