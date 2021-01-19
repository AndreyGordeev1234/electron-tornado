if which node > /dev/null
    then
        echo "node is installed, skipping..."
    else
        echo "installing nodejs..."
        sudo apt-get install curl
        curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
        sudo apt-get install nodejs
    fi

echo "going to app folder..."
cd app
echo "installing dependencies..."
npm i
echo "starting the app..."
npm start
echo "app is running!"