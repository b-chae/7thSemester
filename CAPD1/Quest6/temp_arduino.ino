// Include the libraries we need
#include <OneWire.h>
#include <DallasTemperature.h>
#include <string>
#include <iostream>

// Data wire is plugged into port 2 on the Arduino
#define ONE_WIRE_BUS 15

// Setup a oneWire instance to communicate with any OneWire devices (not just Maxim/Dallas temperature ICs)
OneWire oneWire(ONE_WIRE_BUS);

// Pass our oneWire reference to Dallas Temperature. 
DallasTemperature sensors(&oneWire);

#include <WiFi.h>
#include <WiFiMulti.h>

WiFiMulti WiFiMulti;

void setup()
{
    Serial.begin(9600);
    delay(10);

    Serial.print("Waiting for WiFi... ");
	
    // We start by connecting to a WiFi network
    WiFiMulti.addAP("iptime", "44167104");

    while(WiFiMulti.run() != WL_CONNECTED) {
        Serial.print(".");
        delay(500);
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
	
	sensors.begin();

    delay(500);
}


void loop()
{
//    const uint16_t port = 80;
//    const char * host = "192.168.1.1"; // ip or dns
    const uint16_t port = 8085;
    const char * host = "ec2-3-87-72-38.compute-1.amazonaws.com"; // ip or dns

  sensors.requestTemperatures(); 
  Serial.print("Temperature for the device 1 (index 0) is: ");
  Serial.println(sensors.getTempCByIndex(0));  

    // Use WiFiClient class to create TCP connections
    WiFiClient client;

    if (!client.connect(host, port)) {
        Serial.println("Connection failed.");
        Serial.println("Waiting 60 seconds before retrying...");
        delay(60000);
        return;
    }
	
	String command = "GET /insert?&device_id=1000&value=";
	String strValue = String(sensors.getTempCByIndex(0));
	command += strValue;
	command += " HTTP/1.1\n\n";

    // This will send a request to the server
    //uncomment this line to send an arbitrary string to the server
    //client.print("Send this data to the server");
    //uncomment this line to send a basic document request to the server
    client.print(command);

  /*int maxloops = 0;

  //wait for the server's reply to become available
  while (!client.available() && maxloops < 1000)
  {
    maxloops++;
    delay(1); //delay 1 msec
  }
  if (client.available() > 0)
  {
    //read back one line from the server
    String line = client.readStringUntil('\r');
    Serial.println(line);
  }
  else
  {
    Serial.println("client.available() timed out ");
  }*/

    Serial.println("Closing connection.");
    client.stop();

    Serial.println("Waiting 60 seconds before restarting...");
    delay(60000);
  
}