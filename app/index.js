const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const ipc = require('electron').ipcMain;
ipc.on('dataRequest', function (event, data) {
  const { net } = require('electron');
  const request = net.request('http://localhost:8888/api/data');
  let result = '';
  request.on('response', (response) => {
    response.on('data', (chunk) => {
      result += chunk.toString('utf-8');
    });
    response.on('end', (_) => {
      event.sender.send('dataLoaded', JSON.parse(result));
    });
  });
  request.on('error', (error) => {
    event.sender.send('dataError', error);
  });
  request.end();
});
