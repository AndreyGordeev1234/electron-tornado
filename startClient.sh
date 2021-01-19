if which node > /dev/null
    then
        echo "node is installed, skipping..."
    else
        echo "installing nodejs..."
        sudo apt-get update
        sudo apt-get install nodejs
        sudo apt-get install npm
    fi

echo "going to app folder..."
cd app
echo "installing dependencies..."
npm i
echo "starting the app..."
npm start
echo "app is running!"