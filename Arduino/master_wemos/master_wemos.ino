#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
 
ESP8266WebServer Webserver(80);
 
// Replace with your network credentials
const char* ssid = "Nokia 6.1";
const char* password = "lalala001";

int data;
 
String HTMLpage = "";
 
// Include Arduino Wire library for I2C
#include <Wire.h>
 
// Define Slave I2C Address
#define SLAVE_ADDR 9
 
// Define Slave answer size
#define ANSWERSIZE 5
 
void setup() {
    // Initialize I2C communications as Master
  Wire.begin();

     //HTMLpage += "<head><title>Webserver Tutorial</title></head><h3>ESP8266 Webserver Demo (Toggle LED)</h3><p>LED <a href=\"ledON\"><button>ON</button></a>&nbsp;<a href=\"ledOFF\"><button>OFF</button></a></p>";
      HTMLpage += "<!doctype html><html>  <head>    <link rel=\"stylesheet\" type=\"text/css\" href=\"https://beamish-scone-b8a64e.netlify.app/style.css\">    <link rel=\"shortcut icon\" href=\"#\">    <script src=\"https://beamish-scone-b8a64e.netlify.app/Libraries/p5/p5.js\"></script>    <script src=\"https://beamish-scone-b8a64e.netlify.app/sketch.js\"></script>    <title>GOD!</title>  </head>  <body>    <img src=\"https://beamish-scone-b8a64e.netlify.app/Images/Intro1.png\" class=\"hidden\">    <img src=\"https://beamish-scone-b8a64e.netlify.app/Images/Intro2.png\" class=\"hidden\">        <img src=\"https://beamish-scone-b8a64e.netlify.app/Images/Intro3.png\" id=\"intro3\" class=\"hidden\">      </body></html>";

  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("");
 
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
 
  if (MDNS.begin("esp8266", WiFi.localIP())) {
    Serial.println("MDNS responder started");
  }
 
  Webserver.on("/", [](){
    Webserver.send(200, "text/html", HTMLpage);
  });
  Webserver.on("/ledON", [](){
    Webserver.send(200, "text/html", HTMLpage+"<p>LED is ON</p>");
    data = 1;
    // Write a charatre to the Slave
    Wire.beginTransmission(SLAVE_ADDR);
    delay(1000);
    Wire.write(data);
    Wire.endTransmission();
    Serial.println("Write data to slave");
  });
  Webserver.on("/ledOFF", [](){
    Webserver.send(200, "text/html", HTMLpage+"<p>LED is OFF</p>");
    data = 0;
    // Write a charatre to the Slave
    Wire.beginTransmission(SLAVE_ADDR);
    delay(1000); 
    Wire.write(data);
    Wire.endTransmission();
    Serial.println("Write data to slave");
  });
 
  Webserver.begin();
  Serial.println("HTTP Webserver started");

  
  // Setup serial monitor
//  Serial.begin(9600);
  Serial.println("I2C Master Demonstration");
}
 
void loop() {

  Webserver.handleClient();

     
  Serial.println("Receive data");
  
  // Read response from Slave
  // Read back 5 characters
  Wire.requestFrom(SLAVE_ADDR,ANSWERSIZE);
  
  // Add characters to string
  String response = "";
  while (Wire.available()) {
      char b = Wire.read();
      response += b;
  } 
  
  // Print to Serial Monitor
  Serial.println(response);
}
