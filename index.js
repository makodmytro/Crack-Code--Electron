/* Mac os
const { app, BrowserWindow, Menu } = require('electron')
const fs = require('fs');
const path = require('path');

const configFilePath = path.join(__dirname, 'config.json');

fs.readFile(configFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  
  const config = JSON.parse(data);
  
  window.config = config;
});

const createWindow = () => {
  Menu.setApplicationMenu(null);

  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}) */


const { app, BrowserWindow, Menu } = require('electron');
const { Keyboard, Input } = require('electron-secure-virtual-keyboard');
const fs = require('fs');
const path = require('path');
// const os = require('os');
// const patttt = os.homedir()

// Get the path to the application bundle


const createWindow = () => {
    Menu.setApplicationMenu(null);

    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    })

    win.loadFile('index.html')
    win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow();

    Keyboard.init();
    
    Keyboard.add(mainWindow, {
      layout: 'numeric', // Specify the layout type ('numeric', 'alphanumeric', 'custom')
      targetElement: Input.getTarget() // Specify the target input element for keyboard input
    }); 

      // Handle keyboard visibility events
    Keyboard.on('show', () => {
      console.log('Keyboard is visible');
    });

    Keyboard.on('hide', () => {
      console.log('Keyboard is hidden');
    });
})

app.on('window-all-closed', () => {
   
    if (process.platform !== 'darwin') app.quit()
})