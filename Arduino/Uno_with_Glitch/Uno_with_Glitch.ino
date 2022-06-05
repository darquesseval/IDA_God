#include <timer.h>
#include <Arduino.h>
#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
#include <avr/power.h>
#endif

#define NEO            4
#define NUMPIXELS      79
Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUMPIXELS, NEO,  NEO_GRBW + NEO_KHZ800);

int i = 1;
auto timer = timer_create_default(); // create a timer with default settings

#include "BasicStepperDriver.h"
#include "MultiDriver.h"
#include "SyncDriver.h"

// Motor steps per revolution. Most steppers are 200 steps or 1.8 degrees/step
#define MOTOR_STEPS 200
#define RPM 40

// Since microstepping is set externally, make sure this matches the selected mode
// If it doesn't, the motor will move at a different RPM than chosen
// 1=full step, 2=half step etc.
#define MICROSTEPS 4

// All the wires needed for full functionality
#define DIR 5
#define STEP 2


// Uncomment line to use enable/disable functionality
#define SLEEP 8

// 2-wire basic config, microstepping is hardwired on the driver
// BasicStepperDriver stepper(MOTOR_STEPS, DIR, STEP);

// Uncomment line to use enable/disable functionality
BasicStepperDriver stepper(MOTOR_STEPS, DIR, STEP, SLEEP);


//const float full_rotation_R = MOTOR_STEPS * MICROSTEPS * 2.5;

int latestLine = 0;
bool buildingsReady = false;
bool started = false;
int incomingByte = 0;

#define LEDred1  A0
#define LEDred2  A1
#define LEDred3  A2
#define LEDred4  A3
#define LEDwhite5  A4

#define LEDwhite1  A5
#define LEDwhite2  3
#define LEDwhite3  6
#define LEDwhite4  7

#define b1  9
#define b2  10
#define b3  11
#define b4  12
#define b5  13

bool myTimer(void *) {
  i++;
  if(i<=NUMPIXELS+1){
  strip.setPixelColor(i - 2, strip.Color(0, 0, 0, 0));
  strip.setPixelColor(i - 1, strip.Color(30, 200, 0, 255));
  strip.setPixelColor(i, strip.Color(100, 200, 0, 255));
  strip.setPixelColor(i + 1, strip.Color(30, 200, 0, 255));
  strip.show(); // This sends the updated pixel color to the hardware.
  if(i==NUMPIXELS && latestLine != 5){
    Serial.println(5);
    latestLine = 5;
  }
  } else if(i>NUMPIXELS+1) {
    stepper.rotate(30);
    stepper.rotate(-45);
    stepper.rotate(45);
    stepper.rotate(-30);
    }
    else if(i>NUMPIXELS+2 && latestLine != 6){
    Serial.println(6);
    latestLine = 6;
    }
  
return true;
//and then start motor here

}

void setup() {
  timer.every(1200, myTimer); //15190
  
  stepper.begin(RPM, MICROSTEPS);
  // this is needed for enabling/disabling steppers 
  stepper.setEnableActiveState(LOW);
  stepper.enable();
  
  pinMode(LEDred1, OUTPUT);
  pinMode(LEDred2, OUTPUT);
  pinMode(LEDred3, OUTPUT);
  pinMode(LEDred4, OUTPUT);
  pinMode(LEDred4, OUTPUT);

  pinMode(LEDwhite1, OUTPUT);
  pinMode(LEDwhite2, OUTPUT);
  pinMode(LEDwhite3, OUTPUT);
  pinMode(LEDwhite4, OUTPUT);

  pinMode(b1, INPUT_PULLUP);
  pinMode(b2, INPUT_PULLUP);
  pinMode(b3, INPUT_PULLUP);
  pinMode(b4, INPUT_PULLUP);
  pinMode(b5, INPUT_PULLUP);

  Serial.begin(9600);

  strip.begin(); // This initializes the NeoPixel library.
  strip.show();            // Turn OFF all pixels ASAP
  strip.setBrightness(50);
}

void loop() {

    if (Serial.available() > 0) {
    // read the incoming byte:
    incomingByte = Serial.read();

    }

    if(incomingByte==1){
    started=true;
    }
   
if(started==true){
  timer.tick();
  checkBuildings();
} 
}

void checkBuildings() {
  int b1read = digitalRead(b1);
  if (b1read == 0) {
    digitalWrite(LEDred1, LOW);
    digitalWrite(LEDwhite1, HIGH);
  } else if (b1read == 1) {
    digitalWrite(LEDred1, HIGH);
    digitalWrite(LEDwhite1, LOW);
  }

    int b2read = digitalRead(b2);
  if (b2read == 0) {
    digitalWrite(LEDred2, LOW);
    digitalWrite(LEDwhite2, HIGH);
  } else if (b2read == 1) {
    digitalWrite(LEDred2, HIGH);
    digitalWrite(LEDwhite2, LOW);
  }

    int b3read = digitalRead(b3);
  if (b3read == 0) {
    digitalWrite(LEDred3, LOW);
    digitalWrite(LEDwhite3, HIGH);
  } else if (b3read == 1) {
    digitalWrite(LEDred3, HIGH);
    digitalWrite(LEDwhite3, LOW);
  }
  
    int b4read = digitalRead(b4);
  if (b4read == 0) {
    digitalWrite(LEDred4, LOW);
    digitalWrite(LEDwhite4, HIGH);
  } else if (b4read == 1) {
    digitalWrite(LEDred4, HIGH);
    digitalWrite(LEDwhite4, LOW);
 }
  
    int b5read = digitalRead(b5);
  if (b5read == 1) {
    digitalWrite(LEDwhite5, HIGH);
  } else if (b5read == 0) {
    digitalWrite(LEDwhite5, LOW);
  }

  if(b1read==0 && b2read==0 && b3read==0 && b4read==0 && b5read==1){
    if(buildingsReady==false && latestLine != 2){
  Serial.println(2);
  latestLine = 2;
  buildingsReady=true;
    }
    else if (latestLine != 3 && buildingsReady==true){
       Serial.println(3);
       latestLine = 3;
    }
  } else if(b1read==1 && b2read==1 && b3read==1 && b4read==1 && b5read==0){
    if(buildingsReady==true && latestLine !=4){
      Serial.println(4);
      latestLine = 4;
    }
  }
  }

/*2=buildingsReady
 3 = biulding ok
 4 = building not ok ALARM
 5 = time nearly over
 */
