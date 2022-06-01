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
let challengeCarryOut = false;
let housesCarryOut = false;


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
    challengeCard2 = select("#challenge2"); 
    challengeCard3 = select("#challenge3"); 
    challenges = [challengeCard0, challengeCard1, challengeCard2, challengeCard3]
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(102, 143, 83);


  buttonArduino = createButton('Häuser');
  buttonArduino.position(windowWidth/20*17, windowHeight/20*2);
  buttonArduino.style('background-color', '#b3a798');
  buttonArduino.style('color', 'white');
  buttonArduino.style('border-color', 'transparent');
  buttonArduino.style('font-size', '2vw');
  buttonArduino.style('font-familiy', 'LexendZettaRegular, regular');
  buttonArduino.size(windowWidth/9, windowHeight/14);
  buttonArduino.mousePressed(houses); //if houses are moved

  buttonArduino1 = createButton('Häuser aufgestellt');
  buttonArduino1.position(windowWidth/20*13, windowHeight/20*2);
  buttonArduino1.style('background-color', '#b3a798');
  buttonArduino1.style('color', 'white');
  buttonArduino1.style('border-color', 'transparent');
  buttonArduino1.style('font-size', '2vw');
  buttonArduino1.style('font-familiy', 'LexendZettaRegular, regular');
  buttonArduino1.size(windowWidth/9, windowHeight/14);
  buttonArduino1.hide();
  buttonArduino1.mousePressed(rules); // When all houses are rebuild -> function(rules)

  buttonAccept = createButton('Akzeprieren');
  buttonAccept.position(windowWidth/20*8, windowHeight/20*6);
  buttonAccept.style('background-color', '#b3a798');
  buttonAccept.style('color', 'white');
  buttonAccept.style('border-color', 'transparent');
  buttonAccept.style('font-size', '2vw');
  buttonAccept.style('font-familiy', 'LexendZettaRegular, regular');
  buttonAccept.size(windowWidth/9, windowHeight/14);
  buttonAccept.hide();
  buttonAccept.mousePressed(accept);

  buttonIgnore = createButton('Ignorieren');
  buttonIgnore.position(windowWidth/20*12, windowHeight/20*6);
  buttonIgnore.style('background-color', '#b3a798');
  buttonIgnore.style('color', 'white');
  buttonIgnore.style('border-color', 'transparent');
  buttonIgnore.style('font-size', '2vw');
  buttonIgnore.style('font-familiy', 'LexendZettaRegular, regular');
  buttonIgnore.size(windowWidth/9, windowHeight/14);
  buttonIgnore.hide();
  buttonIgnore.mousePressed(ignore);

  buttonStart = createButton('START');
  buttonStart.position(windowWidth/20*2, windowHeight/20*6);
  buttonStart.style('background-color', '#b3a798');
  buttonStart.style('color', 'white');
  buttonStart.style('border-color', 'transparent');
  buttonStart.style('font-size', '2vw');
  buttonStart.style('font-familiy', 'LexendZettaRegular, regular');
  buttonStart.size(windowWidth/9, windowHeight/14);
  buttonStart.mousePressed(rebuild);

  buttonDone1 = createButton('Vollendet');
  buttonDone1.position(windowWidth/20*5, windowHeight/20*12);
  buttonDone1.style('background-color', '#b3a798');
  buttonDone1.style('color', 'white');
  buttonDone1.style('border-color', 'transparent');
  buttonDone1.style('font-size', '2vw');
  buttonDone1.style('font-familiy', 'LexendZettaRegular, regular');
  buttonDone1.size(windowWidth/9, windowHeight/14);
  buttonDone1.hide();
  buttonDone1.mousePressed(done1);

  buttonDone2 = createButton('Vollendet');
  buttonDone2.position(windowWidth/20*10, windowHeight/20*12);
  buttonDone2.style('background-color', '#b3a798');
  buttonDone2.style('color', 'white');
  buttonDone2.style('border-color', 'transparent');
  buttonDone2.style('font-size', '2vw');
  buttonDone2.style('font-familiy', 'LexendZettaRegular, regular');
  buttonDone2.size(windowWidth/9, windowHeight/14);
  buttonDone2.hide();
  buttonDone2.mousePressed(done2);

  buttonDone3 = createButton('Vollendet');
  buttonDone3.position(windowWidth/20*15, windowHeight/20*12);
  buttonDone3.style('background-color', '#b3a798');
  buttonDone3.style('color', 'white');
  buttonDone3.style('border-color', 'transparent');
  buttonDone3.style('font-size', '2vw');
  buttonDone3.style('font-familiy', 'LexendZettaRegular, regular');
  buttonDone3.size(windowWidth/9, windowHeight/14);
  buttonDone3.hide();
  buttonDone3.mousePressed(done3);
}



function draw() {

    background(230);

    if (k != 0 && millis() > k + 5000 && dayStarted == false){
        k = millis();
        rulesSlide.toggleClass("hidden");
        homeSlide.toggleClass("hidden");
        dayStarted = true;
    }

    if (k != 0 && millis() > timer + k && displayedChallenges.length != 3 && challenges.length != 0){
        challengeCarryOut = true;
        timer = timer + random(5000,10000);
        console.log("new challenge");

        if (displayedChallenges.length == 1){
            displayedChallenges[0].addClass("hidden");
            displayedChallenges[0].removeClass("pos2");
            displayedChallenges[0].removeClass("pos3");
            displayedChallenges[0].removeClass("pos1");
            buttonDone1.hide();
        } else if (displayedChallenges.length == 2){
            displayedChallenges[0].addClass("hidden");
            displayedChallenges[0].removeClass("pos2");
            displayedChallenges[0].removeClass("pos3");
            displayedChallenges[0].removeClass("pos1");
            displayedChallenges[1].removeClass("pos1");
            displayedChallenges[1].removeClass("pos3");
            displayedChallenges[1].addClass("hidden");
            displayedChallenges[1].removeClass("pos2");
            buttonDone1.hide();
            buttonDone2.hide();
        }

        challenge();
    }

    if (displayedChallenges.length == 1 && challengeCarryOut == false){
        displayedChallenges[0].removeClass("hidden");
        displayedChallenges[0].removeClass("pos2");
        displayedChallenges[0].removeClass("pos3");
        displayedChallenges[0].addClass("pos1");
        buttonDone1.show();
    } else if (displayedChallenges.length == 2 && challengeCarryOut == false){
        displayedChallenges[0].removeClass("hidden");
        displayedChallenges[0].removeClass("pos2");
        displayedChallenges[0].removeClass("pos3");
        displayedChallenges[0].addClass("pos1");
        displayedChallenges[1].removeClass("pos1");
        displayedChallenges[1].removeClass("pos3");
        displayedChallenges[1].removeClass("hidden");
        displayedChallenges[1].addClass("pos2");
        buttonDone1.show();
        buttonDone2.show();
    } else if(displayedChallenges.length == 3 && challengeCarryOut == false){
        displayedChallenges[0].removeClass("hidden");
        displayedChallenges[0].removeClass("pos2");
        displayedChallenges[0].removeClass("pos3");
        displayedChallenges[0].addClass("pos1");
        displayedChallenges[1].removeClass("pos1");
        displayedChallenges[1].removeClass("pos3");
        displayedChallenges[1].removeClass("hidden");
        displayedChallenges[1].addClass("pos2");
        displayedChallenges[2].removeClass("pos2");
        displayedChallenges[2].removeClass("pos1");
        displayedChallenges[2].removeClass("hidden");
        displayedChallenges[2].addClass("pos3");
        buttonDone1.show();
        buttonDone2.show();
        buttonDone3.show();
    }

    if (k != 0 && millis() > k + 60000 && dayOver == false){
        end();
        dayOver = true;
    }
}

function rebuild() {
    if (started == false){
        window.history.pushState("object or string", "Title", "started");
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
    buttonAccept.hide();
    buttonIgnore.hide();

    if (displayedChallenges.length == 1){
        displayedChallenges[0].removeClass("hidden")
    } else if (displayedChallenges.length == 2){
        displayedChallenges[0].removeClass("hidden")
        displayedChallenges[1].removeClass("hidden")
    }
    displayedChallenges.splice(0, 0, challenges[q]);
    challenges.splice(q, 1);
    //play Yey! Sound
    challengeCarryOut = false
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
    challengeCarryOut = false
}
function done1(){
    displayedChallenges[0].removeClass("pos1");
    displayedChallenges[0].addClass("hidden");
    displayedChallenges.splice(0, 1);
    buttonDone1.hide();
    buttonDone2.hide();
    buttonDone3.hide();
}
function done2(){
    displayedChallenges[1].removeClass("pos2");
    displayedChallenges[1].addClass("hidden");
    displayedChallenges.splice(1, 1);
    buttonDone1.hide();
    buttonDone2.hide();
    buttonDone3.hide();
}
function done3(){
    displayedChallenges[2].removeClass("pos3");
    displayedChallenges[2].addClass("hidden");
    displayedChallenges.splice(2, 1);
    buttonDone1.hide();
    buttonDone2.hide();
    buttonDone3.hide();
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
