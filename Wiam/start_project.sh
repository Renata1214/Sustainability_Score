#!/bin/bash

# compile using hmod +x start_project.sh
# run using ./start_project.sh

cd "$(dirname "$0")"


echo "Starting backend..."
python3 run_all.py &

cd wiam/changes_frontend
echo "Starting frontend..."
npx expo start
