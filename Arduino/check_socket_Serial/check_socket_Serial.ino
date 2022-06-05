#define LED  7

int started = 0;
int incomingByte = 0;

void setup() {
  pinMode(LED, OUTPUT);
digitalWrite(LED, LOW);

  Serial.begin(9600);

}

void loop() {
      if (Serial.available() > 0) {
    // read the incoming byte:
    started = Serial.read();

      }
   
if(started==1){
  digitalWrite(LED, HIGH);

}
}
