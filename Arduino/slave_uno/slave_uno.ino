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

#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
  #include <avr/power.h>
#endif

// Which pin on the Arduino is connected to the NeoPixels?
// On a Trinket or Gemma we suggest changing this to 1
#define PIN            6

// How many NeoPixels are attached to the Arduino?
#define NUMPIXELS      79

// When we setup the NeoPixel library, we tell it how many pixels, and which pin to use to send signals.
// Note that for older NeoPixel strips you might need to change the third parameter--see the strandtest
// example for more information on possible values.
Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUMPIXELS, PIN,  NEO_GRBW + NEO_KHZ800);

int delayval = 15190;

// Include Arduino Wire library for I2C
#include <Wire.h>

// Define Slave I2C Address
#define SLAVE_ADDR 9

// Define Slave answer size
#define ANSWERSIZE 5

// Define string with response to Master
String answer = "Hello";

#define LED  2

int data;

void setup() {
  pinMode(LED, OUTPUT);
  digitalWrite(LED, LOW);
  
  // Initialize I2C communications as Slave
  Wire.begin(SLAVE_ADDR);
  
  // Function to run when data requested from master
  Wire.onRequest(requestEvent); 
  
  // Function to run when data received from master
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
    data = Wire.read();
  
  // Print to Serial Monitor
  Serial.println("Receive event");
}

void requestEvent() {

  // Setup byte variable in the correct size
  byte response[ANSWERSIZE];
  
  // Format answer as array
  for (byte i=0;i<ANSWERSIZE;i++) {
    response[i] = (byte)answer.charAt(i);
  }
  
  // Send response back to Master
  Wire.write(response,sizeof(response));
  
  // Print to Serial Monitor
  Serial.println("Request event");
}

void loop() {
    if(data==1) {
  digitalWrite(LED, HIGH);
} else if(data==0){
    digitalWrite(LED, LOW);
}
  // Time delay in loop
  delay(50);

    // For a set of NeoPixels the first NeoPixel is 0, second is 1, all the way up to the count of pixels minus one.

  for(int i=1;i<NUMPIXELS+2;i+=1){
    // pixels.Color takes RGB values, from 0,0,0 up to 255,255,255
    strip.setPixelColor(i-2, strip.Color(0,0,0,0));
    strip.setPixelColor(i-1, strip.Color(30,200,0,255)); 
    strip.setPixelColor(i, strip.Color(100,200,0,255)); 
    strip.setPixelColor(i+1, strip.Color(30,200,0,255)); 
    strip.show(); // This sends the updated pixel color to the hardware.

    delay(delayval); // Delay for a period of time (in milliseconds).

  }
}
