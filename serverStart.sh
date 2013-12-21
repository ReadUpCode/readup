# Server start script for local development
echo "Initiating local server boot sequence"

echo "Loading local environment variables"
source ./node_modules/readupdevkeys/start.test.sh

echo "Running grunt tasks"
grunt
