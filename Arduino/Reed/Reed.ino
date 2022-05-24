#include <Arduino.h>

const int switchHouse01 = 7;
const int green01 = 8;
const int red01 = 9;


bool house01 = false;


void setup() {
  Serial.begin(9600);
  pinMode(switchHouse01, INPUT);
  pinMode(green01, OUTPUT);
  pinMode(red01, OUTPUT);
  Serial.println("starting");
}


void loop() {
int switchHouse01Read = digitalRead(switchHouse01);

  if (switchHouse01Read == 1) {
digitalWrite(green01, HIGH);
digitalWrite(red01, LOW);
  Serial.println("OK");

  }
  else if (switchHouse01Read == 0){
digitalWrite(green01, LOW);
digitalWrite(red01, HIGH);
  Serial.println("Help!");
  }

}
