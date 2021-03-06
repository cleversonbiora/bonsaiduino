#include <SPI.h>
#include <Ethernet.h>
#include "DHT.h"
#define temperature A0
#define luminosity A1
#define moisture_soil A2
#define DHTTYPE DHT11 // DHT 11
DHT dht(temperature, DHTTYPE);
byte mac[] = { 0x00, 0xAA, 0xBB, 0xCC, 0xDE, 0x01 }; // RESERVED MAC ADDRESS
EthernetClient client;

//https://gist.github.com/ericoporto/fb9c975a290a822edca9
//https://arduino.stackexchange.com/questions/10410/how-to-call-url-with-arduino-ethernet-shield
//https://arduinojson.org/v6/example/

void setup() {
  Serial.begin(9600);  /* Define baud rate for serial communication */
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP"); 
  }
  dht.begin();
}

void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  int temperaturaValue = t;
  int luminosityValue = analogRead(luminosity);
  int moistureValue = analogRead(moisture_soil);

  sendData(1, moistureValue);
  sendData(2, luminosityValue);
  sendData(3, temperaturaValue);

  Serial.print("Temperature = ");
  Serial.print(t);
  Serial.print("\n\n");
  Serial.print("Humidity = ");
  Serial.print(h);
  Serial.print("\n\n");
  Serial.print("Luminosity = ");
  Serial.print(luminosityValue);
  Serial.print("\n\n");
  Serial.print("Moisture Soil = ");
  Serial.print(moistureValue);
  Serial.print("\n\n");

  delay(600000);//10min
  //delay(3000);//3sec
}

void sendData(int sensorId, int value){
  String data = "{\"sensorid\":" + String(sensorId) + ",\"value\":" + String(value) + "}";
  if (client.connect("bonsaiarduino.ga",80)) { // REPLACE WITH YOUR SERVER ADDRESS
    client.println("POST /api/sensorvalue/post.php HTTP/1.1"); 
    client.println("Host: bonsaiarduino.ga"); // SERVER ADDRESS HERE TOO
    client.println("Content-Type: application/json"); 
    client.print("Content-Length: "); 
    client.println(data.length()); 
    client.println(); 
    client.print(data); 
  } 

  if (client.connected()) { 
    client.stop();  // DISCONNECT FROM THE SERVER
  }
}