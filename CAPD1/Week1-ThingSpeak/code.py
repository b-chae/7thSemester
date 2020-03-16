import random
import time
import requests

for i in range(10):
    value = random.randint(1, 100)
    url = "https://api.thingspeak.com/update?api_key=N9O5110X0T43YVMQ&field1=" + str(value)
    requests.get(url)
    time.sleep(20)
