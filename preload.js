const { app, contextBridge } = require('electron')
const path = require('path');
const fs = require('fs')

const appPath = __dirname;

const configFile = path.join(appPath, 'config', 'config.json');
const configData = JSON.parse(fs.readFileSync(configFile, 'utf8'));

contextBridge.exposeInMainWorld('setting', {
  code: () => configData.code,
  audio_success: () => configData.audio_success,
  audio_error: () => configData.audio_error,
})