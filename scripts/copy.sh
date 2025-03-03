#!/bin/bash

echo "Removing old JAR files..."
rm -f /home/ubuntu/studentapp/*.jar

echo "Copying new JAR file from S3..."
aws s3 cp s3://studentattendanceapp/StudentAttendanceApp-1.0.jar /home/ubuntu/studentapp/

echo "Setting permissions for the JAR file..."
chmod +x /home/ubuntu/studentapp/StudentAttendanceApp-1.0.jar

