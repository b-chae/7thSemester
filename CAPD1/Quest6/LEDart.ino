int led[3] = {15, 4, 17};
int gnd[3] = {2, 16, 5};

void setup() {
  // put your setup code here, to run once:
  for (int i=0; i<3; i++) {
    pinMode(led[i], OUTPUT);
    digitalWrite(led[i], 1);
    
    pinMode(gnd[i], OUTPUT);
    digitalWrite(gnd[i], 0);
  }
  Serial.begin(115200);
}

void loop() {
	for(int i=0; i<2; i++){
		digitalWrite(led[0],1);
  delay(100);
  digitalWrite(led[0],0);
  delay(1);
  digitalWrite(led[1],1);
  delay(100);
  digitalWrite(led[1],0);
  delay(1);
  digitalWrite(led[2],1);
  delay(1000);
  digitalWrite(led[2],0);
  delay(1);
	}
	digitalWrite(led[0],1);
  delay(100);
  digitalWrite(led[0],0);
  delay(1);
  digitalWrite(led[1],1);
  delay(100);
  digitalWrite(led[1],0);
  delay(1);
  for(int i=0; i<7; i++){
  digitalWrite(led[2],1);
  delay(100);
  digitalWrite(led[2],0);
  delay(50);
	}
}