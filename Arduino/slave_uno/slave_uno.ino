
/*
  I2C Slave Demo
  i2c-slave-demo.ino
  Demonstrate use of I2C bus
  Slave receives character from Master and responds
  DroneBot Workshop 2019
  https://dronebotworkshop.com
*/
// NeoPixel Ring simple sketch (c) 2013 Shae Erisson
// released under the GPLv3 license to match the rest of the AdaFruit NeoPixel library

#include <timer.h>

#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
#include <avr/power.h>
#endif

// Which pin on the Arduino is connected to the NeoPixels?
// On a Trinket or Gemma we suggest changing this to 1
#define NEO            6

// How many NeoPixels are attached to the Arduino?
#define NUMPIXELS      79

// When we setup the NeoPixel library, we tell it how many pixels, and which pin to use to send signals.
// Note that for older NeoPixel strips you might need to change the third parameter--see the strandtest
// example for more information on possible values.
Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUMPIXELS, NEO,  NEO_GRBW + NEO_KHZ800);

int delayval = 15190;
int i = 1;
auto timer = timer_create_default(); // create a timer with default settings

// Include Arduino Wire library for I2C
#include <Wire.h>

// Define Slave I2C Address
#define SLAVE_ADDR 9

// Define Slave answer size
#define READYSIZE 3
#define FALLENSIZE 4

// Define string with response to Master
String bReady = "yes";
String bFallen = "help";
bool buildingsReady = false;

#define LEDred1  1
#define LEDred2  2
#define LEDred3  3
#define LEDred4  4
#define LEDred5  5

#define b1  7
#define b2  8
#define b3  9
#define b4  10
#define b5  11

bool started = false;

bool myTimer(void *) {
  i++;
  strip.setPixelColor(i - 2, strip.Color(0, 0, 0, 0));
  strip.setPixelColor(i - 1, strip.Color(30, 200, 0, 255));
  strip.setPixelColor(i, strip.Color(100, 200, 0, 255));
  strip.setPixelColor(i + 1, strip.Color(30, 200, 0, 255));
  strip.show(); // This sends the updated pixel color to the hardware.

//  if (i > NUMPIXELS) {
//    
//  }
return true;
//and then start motor here

}

void setup() {
  timer.every(1000, myTimer);

  pinMode(LEDred1, OUTPUT);
  pinMode(LEDred2, OUTPUT);
  pinMode(LEDred3, OUTPUT);
  pinMode(LEDred4, OUTPUT);
  pinMode(LEDred5, OUTPUT);

  pinMode(b1, INPUT);
  pinMode(b2, INPUT);
  pinMode(b3, INPUT);
  pinMode(b4, INPUT);
  pinMode(b5, INPUT);

  // Initialize I2C communications as Slave
  Wire.begin(SLAVE_ADDR);
Wire.onReceive(receiveEvent);
  // Setup Serial Monitor
  Serial.begin(9600);
  Serial.println("I2C Slave Demonstration");

#if defined (__AVR_ATtiny85__)
  if (F_CPU == 16000000) clock_prescale_set(clock_div_1);
#endif
  // End of trinket special code

  strip.begin(); // This initializes the NeoPixel library.
  strip.show();            // Turn OFF all pixels ASAP
  strip.setBrightness(50);
}

void receiveEvent() {

  // Read while data received
  started = Wire.read();

  // Print to Serial Monitor
  Serial.println("Receive event");
}


void loop() {
  checkBuildings();
  if(started==true) {
  timer.tick();
  }
}

void checkBuildings() {
  int b1read = digitalRead(b1);
  if (b1read == 1) {
    digitalWrite(LEDred1, LOW);
  } else if (b1read == 0) {
    digitalWrite(LEDred1, HIGH);
  }
 

      byte bReadyArray[READYSIZE];
  byte bFallenArray[FALLENSIZE];

  // Format answer as array
  for (byte i = 0; i < READYSIZE; i++) {
    bReadyArray[i] = (byte)bReady.charAt(i);
  }

  for (byte i = 0; i < FALLENSIZE; i++) {
    bFallenArray[i] = (byte)bFallen.charAt(i);
  }
    if (b1read == 1 && buildingsReady == false) {
    Wire.write(bReadyArray, sizeof(bReadyArray));
  }

  if (b1read == 0 && buildingsReady == true) {
    Wire.write(bFallenArray, sizeof(bFallenArray));
  }
}
