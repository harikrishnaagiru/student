#!/bin/bash

echo "Stopping existing Java application..."
sudo pkill -f StudentAttendanceApp-1.0.jar || echo "No process found"

echo "Starting new Java application..."
nohup java -jar /home/ubuntu/studentapp/StudentAttendanceApp-1.0.jar > /home/ubuntu/studentapp/app.log 2>&1 &
