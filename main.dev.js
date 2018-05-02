/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow,ipcMain } from 'electron';
import MenuBuilder from './menu';
import path from 'path';
import createModal from './modal/modal';
import { configureStore } from './store/configureStore';
import {registerProtocols} from './utils/protocols';
import {configDB} from './utils/configDB';
import listenerIPXCalls from './utils/IPXCalls';

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// protocol.registerStandardSchemes(['modal'])


app.on('ready', async () => {

  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  // protocol.interceptFileProtocol('atom', (request, callback) => {
  registerProtocols('modal','modal');
  registerProtocols('img','img');
  registerProtocols('print','print');
  configDB();
  // .then((e)=>console.log(e)).catch(e=>console.log('error configuring db ...'));
  

  mainWindow = new BrowserWindow({
    show: false,
    width: 1150,
    height: 900,
    icon: path.join(__dirname ,'..','resources','icon.ico'),
    // resizable: false,
    // frame:false,
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);


  let storeState = configureStore({},'main');


  global.reduxStore = storeState;
  
  listenerIPXCalls(mainWindow);
  
  //   ipcMain.on('redux-actionII', (event, payload) => {
  //     console.log(storeState.getState().modal.msg)
  //   });

  // ipcMain.on('redux-action', (event, payload) => {
  //   console.log('Updating action?')
  //   storeState.dispatch(payload);
  // });

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;

  });
  mainWindow.openDevTools();
  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});
