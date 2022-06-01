
let LexendZettaRegular, LexendZettaBold;//???

let startSlide;
let rebuildSlide;
let rulesSlide;
let homeSlide;
let housesSlide;
let endSlide;
let challengeSlide 
let displayedSlide;

let challengeCard0;
let challengeCard1;

let buttonStart;
let buttonArduino;
let buttonArduino1;

let timer = 6000;
let q = 0;
let k = 0;

let challenges = [];
let displayedChallenges = [];

let started = false;
let dayStarted = false;
let dayOver = false;
let buildingsReady = false;


function preload(){
    startSlide = select("#start");
    rebuildSlide = select("#rebuild");
    rulesSlide = select("#rules"); 
    homeSlide = select("#home"); 
    challengeSlide = select("#challenge"); 
    housesSlide = select("#houses"); 
    endSlide = select("#end"); 

    challengeCard0 = select("#challenge0"); 
    challengeCard1 = select("#challenge1"); 
    //challengeCard2, etc.
    challenges = [challengeCard0, challengeCard1]
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(102, 143, 83);


  buttonArduino = createButton('Häuser');
  buttonArduino.position(windowWidth/20*17, windowHeight/20*2);
  buttonArduino.style('background-color', 'transparent');
  buttonArduino.style('color', 'white');
  buttonArduino.style('font-size', '2vw');
  buttonArduino.style('font-familiy', 'LexendZettaRegular, regular');
  buttonArduino.size(windowWidth/9, windowHeight/14);

  buttonArduino1 = createButton('Häuser aufgestellt');
  buttonArduino1.position(windowWidth/20*13, windowHeight/20*2);
  buttonArduino1.style('background-color', 'transparent');
  buttonArduino1.style('color', 'white');
  buttonArduino1.style('font-size', '2vw');
  buttonArduino1.style('font-familiy', 'LexendZettaRegular, regular');
  buttonArduino1.size(windowWidth/9, windowHeight/14);
  buttonArduino1.hide();

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

  buttonStart.mousePressed(rebuild);
  buttonArduino1.mousePressed(rules); // When all houses are rebuild -> function(rules)
  buttonArduino.mousePressed(houses); //if houses are moved
  buttonAccept.mousePressed(accept);
  buttonIgnore.mousePressed(ignore);
}



function draw() {

    background(230);

    if (k != 0 && millis() > k + 5000 && dayStarted == false){
        k = millis();
        rulesSlide.toggleClass("hidden");
        homeSlide.toggleClass("hidden");
        dayStarted = true;
    }

    if (k != 0 && millis() > timer + k && displayedChallenges.length != 3){
        timer = timer + random(5000,10000);
        console.log("new challenge");
        challenge();
    }

    if (displayedChallenges.length == 1){
        buttonDone1.show();
    } else if (displayedChallenges.length == 2){
        buttonDone1.show();
        buttonDone2.show();
    } else if(displayedChallenges.length == 3){
        buttonDone1.show();
        buttonDone2.show();
        buttonDone3.show();
    }

    if (millis() > k + 60000 && dayOver == false){
        end();
        dayOver = true;
    }
}


// function start(){
//     buttonStart.mousePressed(rebuild);
// }
function rebuild() {
    if (started == false){
        startSlide.toggleClass("hidden");
        rebuildSlide.toggleClass("hidden");
        buttonStart.hide();
        buttonArduino1.show();
        started = true;
    }
}
function rules() {
    rebuildSlide.toggleClass("hidden");
    rulesSlide.toggleClass("hidden");
    buttonArduino1.hide()
    k = millis();
}
function challenge(){ //bugs: when this function is still running while new challenge is comming; cant press häuser butten when this function is running
    q = int(random(0, challenges.length));
    console.log(q);
    console.log(challenges.length);
    homeSlide.toggleClass("hidden");
    challengeSlide.toggleClass("hidden");

    challenges[q].removeClass("hidden");
    challenges[q].addClass("pos1");

    buttonAccept.show();
    buttonIgnore.show();
}
function accept(){
    challengeSlide.toggleClass("hidden");
    homeSlide.toggleClass("hidden");
    challenges[q].removeClass("pos1");
    challenges[q].addClass("hidden");
    buttonAccept.hide();
    buttonIgnore.hide();

    displayedChallenges.splice(0, 0, challenges[q]);
    challenges.splice(q, 1);

     displayedChallenge[0].addClass("pos1");
     displayedChallenge[1].addClass("pos2");
     displayedChallenge[2].addClass("pos3");

    //play Yey! Sound
}
function ignore(){
    var element = document.getElementById("challenge");
    element.classList.toggle("hidden");
    var element = document.getElementById("home");
    element.classList.toggle("hidden");
    buttonAccept.hide();
    buttonIgnore.hide();
    challenges.splice(q, 1);
    //play Nooo! Sound
}
function houses(){
    homeSlide.toggleClass("hidden");
    housesSlide.toggleClass("hidden");
    //play alarm sound, stop sound if houses are ok and show homeSlide
    buttonArduino.mousePressed(houses2)
}
function houses2(){
    housesSlide.toggleClass("hidden");
    homeSlide.toggleClass("hidden");
}
function end(){
    homeSlide.toggleClass("hidden"); // what if its not on homeSlide?
    endSlide.toggleClass("hidden");
    //making arduino crash the tower
    // stop new challenges
}
