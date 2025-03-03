#!/bin/bash

echo "Starting new Java application..."
nohup java -jar /home/ubuntu/studentapp/StudentAttendanceApp-1.0.jar > /home/ubuntu/studentapp/app.log 2>&1 &
