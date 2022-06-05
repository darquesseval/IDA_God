const int REED_PIN = 13;  // Pin connected to reed switch
const int LED_PIN = 6; // LED pin
const int LED_PIN2 = A4; // LED pin


void setup() {
  Serial.begin(9600);
  pinMode(REED_PIN, INPUT_PULLUP);  // Enable internal pull-up for the reed switch
  pinMode(LED_PIN, OUTPUT);
    pinMode(LED_PIN2, OUTPUT);
}

void loop() {

      digitalWrite(LED_PIN, HIGH);   // Turn the LED off
        digitalWrite(LED_PIN2, LOW);  // Turn the LED on
        delay(1000);
            digitalWrite(LED_PIN, LOW);  // Turn the LED on
    digitalWrite(LED_PIN2, HIGH);  // Turn the LED on
    delay(1000);
 


  

  
}
