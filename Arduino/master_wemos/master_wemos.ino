#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
 
ESP8266WebServer Webserver(80);
 
// Replace with your network credentials
const char* ssid = "Nokia 6.1";
const char* password = "lalala001";

bool started = false;
bool buildingsReady = false;
 
String HTMLpage = "";
 
// Include Arduino Wire library for I2C
#include <Wire.h>
 
// Define Slave I2C Address
#define SLAVE_ADDR 9
 
// Define Slave answer size
#define READYSIZE 3
#define FALLENSIZE 4
 
void setup() {
    // Initialize I2C communications as Master
  Wire.begin();

     //HTMLpage += "<head><title>Webserver Tutorial</title></head><h3>ESP8266 Webserver Demo (Toggle LED)</h3><p>LED <a href=\"ledON\"><button>ON</button></a>&nbsp;<a href=\"ledOFF\"><button>OFF</button></a></p>";
      HTMLpage += "<!doctype html><html>  <head>    <link rel=\"stylesheet\" type=\"text/css\" href=\"https://beamish-scone-b8a64e.netlify.app/style.css\">    <link rel=\"shortcut icon\" href=\"#\">       <script src=\"https://beamish-scone-b8a64e.netlify.app/Libraries/p5/p5.js\"></script>    <script src=\"https://beamish-scone-b8a64e.netlify.app/sketch.js\"></script>     <title>Polypolis</title>  </head>  <body>         <img src=\"https://beamish-scone-b8a64e.netlify.app/Images/Intro1.png\" id=\"intro1\" class=\"hidden\">    <img src=\"https://beamish-scone-b8a64e.netlify.app/Images/Intro2.png\" id=\"intro2\" class=\"hidden\">    <img src=\"https://beamish-scone-b8a64e.netlify.app/Images/Intro3.png\" id=\"intro3\" class=\"hidden\">    <img src=\"https://beamish-scone-b8a64e.netlify.app/Images/Intro4.png\" id=\"intro4\" class=\"hidden\">    <img src=\"https://beamish-scone-b8a64e.netlify.app/Images/Intro5.png\" id=\"intro5\" class=\"hidden\">                 <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>    <link href=\"https://fonts.googleapis.com/css2?family=Lexend+Zetta:wght@400;700&display=swap\" rel=\"stylesheet\">   </body></html>";

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
  });
  Webserver.on("/started", [](){
    started = true;
    // Write a charatre to the Slave
    Wire.beginTransmission(SLAVE_ADDR);
    delay(1000);
    Wire.write(started);
    Wire.endTransmission();
    Serial.println("Write data to slave");
  });
   
 
 
  Webserver.begin();
  Serial.println("HTTP Webserver started");

}
 
void loop() {

  Webserver.handleClient();

     
  Serial.println("Receive data");
  
  // Read response from Slave
  // Read back 5 characters
  Wire.requestFrom(SLAVE_ADDR, READYSIZE);

  // Add characters to string
  String bReady = "";
  while (Wire.available()) {
      char b = Wire.read();
      bReady += b;
  } 

    Wire.requestFrom(SLAVE_ADDR, FALLENSIZE);

    String bFallen = "";
  while (Wire.available()) {
      char a = Wire.read();
      bFallen += a;
  } 
  // Print to Serial Monitor
  Serial.println(bReady);
}
