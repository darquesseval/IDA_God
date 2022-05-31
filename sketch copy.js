
let LexendZettaRegular, LexendZettaBold;//???

let startSlide;
let rebuildSlide;
let rulesSlide;
let homeSlide;
let housesSlide;
let endSlide;
let challengeSlide 
let displayedSlide;

let challengeCard1;
let challengeCard2;

let buttonStart;
let buttonArduino;

let timer = 20000;
let q = 0;
let k = 0;

let challenges = []
let displayedChallenges = [];

let IntroSlides = TRUE;


function preload(){
    startSlide = document.querySelector("#intro1");
    rebuildSlide = document.querySelector("#intro2");
    rulesSlide = document.querySelector("#intro3");
    homeSlide = document.querySelector("#homeSlide");
    challengeSlide = document.querySelector("#challengeSlide");
    housesSlide = document.querySelector("#housesSlide");
    endSlide = document.querySelector("#endSlide");

    challengeCard0 = document.querySelector("#challengeCard0");
    challengeCard1 = document.querySelector("#challengeCard1");
    //challengeCard2, etc.
    challenges = [challengeCard0]
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

    buttonDone1 = createButton('Vollendet');
    buttonDone1.position(windowWidth/20*8, windowHeight/20*12);
    buttonDone1.style('background-color', 'transparent');
    buttonDone1.style('color', 'white');
    buttonDone1.style('font-size', '2vw');
    buttonDone1.style('font-familiy', 'LexendZettaRegular, regular');
    buttonDone1.size(windowWidth/9, windowHeight/14);
    buttonDone1.hide();

    buttonDone2 = createButton('Vollendet');
    buttonDone2.position(windowWidth/20*12, windowHeight/20*12);
    buttonDone2.style('background-color', 'transparent');
    buttonDone2.style('color', 'white');
    buttonDone2.style('font-size', '2vw');
    buttonDone2.style('font-familiy', 'LexendZettaRegular, regular');
    buttonDone2.size(windowWidth/9, windowHeight/14);
    buttonDone2.hide();

    buttonDone3 = createButton('Vollendet');
    buttonDone3.position(windowWidth/20*16, windowHeight/20*12);
    buttonDone3.style('background-color', 'transparent');
    buttonDone3.style('color', 'white');
    buttonDone3.style('font-size', '2vw');
    buttonDone3.style('font-familiy', 'LexendZettaRegular, regular');
    buttonDone3.size(windowWidth/9, windowHeight/14);
    buttonDone3.hide();

    displayedChallenges.resize(windowWidth/10, 0);
    image(displayedChallenges[1], windowWidth/20*1, windowHeight/20*3);
    image(displayedChallenges[2], windowWidth/20*8, windowHeight/20*3);
    image(displayedChallenges[3], windowWidth/20*15, windowHeight/20*3);

    if (IntroSlides = TRUE){
        displayedSlide = startSlide;
    } else {
        displayedSlide = homeSlide
    }

    buttonArduino.mousePressed(houses)//if houses are moved

    if (millis() > timer + q && displayedChallenges.lenght < 3){
        timer = millis() + random(10000,30000);
        challenge();
    }

    if (displayedChallenges.lenght == 1){
        buttonDone1.show();
    } else if (displayedChallenges.lenght == 2){
        buttonDone1.show();
        buttonDone2.show();
    } else {
        buttonDone1.show();
        buttonDone2.show();
        buttonDone3.show();
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
        millis() = q;
    }
}
function challenge(){
    let q = random(0, challenges.lenght-1);
    displayedSlide = challengeSlide;
    buttonAccept.show();
    buttonIgnore.show();
    buttonAccept.mousePressed(accept);
    buttonIgnore.mousePressed(ignore);
}
function accept(){
    displayedSlide = homeSlide;
    buttonAccept.hide();
    buttonIgnore.hide();

    displayedChallenges.splice(0, 0, challenges[q]);
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