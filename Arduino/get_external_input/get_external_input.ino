#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
 
ESP8266WebServer Webserver(80);
 
// Replace with your network credentials
const char* ssid = "Nokia 6.1";
const char* password = "lalala001";
 
String HTMLpage = "";
int LED = D2;
 
void setup(void){
  HTMLpage += "<!doctype html><html><head><script crossorigin=\"anonymous|use-credentials\"><link rel=\"shortcut icon\" href=\"#\"><script src=\"https://beamish-scone-b8a64e.netlify.app/Libraries/p5/p5.js\"></script><script src=\"https://beamish-scone-b8a64e.netlify.app/sketch.js\"></script><title>This is the title of the webpage!</title></head></html>";
 
  pinMode(LED, OUTPUT);
  digitalWrite(LED, LOW);
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
    digitalWrite(LED, HIGH);
    delay(1000);
  });
  Webserver.on("/ledOFF", [](){
    Webserver.send(200, "text/html", HTMLpage+"<p>LED is OFF</p>");
    digitalWrite(LED, LOW);
    delay(1000); 
  });
 
  Webserver.begin();
  Serial.println("HTTP Webserver started");
}
 
void loop(void){
  Webserver.handleClient();
}
