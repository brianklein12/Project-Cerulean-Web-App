# This script uses the Grove SHT31 temperature and humidity sensor.
#
# I2C Address: 0x44
# Voltage:     3.3 V or 5.5 V
# Temperature Sensor Range: -40-125 C, with 0.3 C accuracy.

import smbus
import time
import requests

# Get I2C bus
bus = smbus.SMBus(1)
 
# SHT31 address, 0x44(68)
bus.write_i2c_block_data(0x44, 0x2C, [0x06])
 
time.sleep(0.5)
 
# SHT31 address, 0x44(68)
# Read data back from 0x00(00), 6 bytes
# Temp MSB, Temp LSB, Temp CRC, Humididty MSB, Humidity LSB, Humidity CRC
data = bus.read_i2c_block_data(0x44, 0x00, 6)
 
# Convert data.
temp     = data[0] * 256 + data[1]
cTemp    = -45 + (175 * temp / 65535.0)
fTemp    = -49 + (315 * temp / 65535.0)
humidity = 100 * (data[3] * 256 + data[4]) / 65535.0
 
# Print data.
print ("Temperature in Celsius is : %.2f C"    %cTemp)
print ("Temperature in Fahrenheit is : %.2f F" %fTemp)
print ("Relative Humidity is : %.2f %%RH"      %humidity)

# Send data to AWS web server.
url     = "http://ec2-184-72-73-47.compute-1.amazonaws.com/sensorData"
payload = {'temp': '%.2f'%fTemp, 'humidity': '%.2f'%humidity}

r = requests.post(url, data=payload)
if r.status_code == 200:
    print(r.text)               # Code to handle web response
else:
    print('Something is wrong') # in case of something went wrong!
