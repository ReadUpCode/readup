# Server start script for local development
echo "Initiating local server boot sequence"

echo "Loading local environment variables"
source ./node_modules/readupdevkeys/start.sh

echo "Running grunt tasks"
grunt
