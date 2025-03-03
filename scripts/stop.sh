#!/bin/bash

echo "Stopping existing Java application..."
sudo pkill -f StudentAttendanceApp-1.0.jar || echo "No process found"
