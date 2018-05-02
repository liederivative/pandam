

const electron = require('electron');
const electronProcess = (electron.remote)?electron.remote:electron;
  
module.exports.closeWindow = (callback,remote)=>{
    store.dispatch(STOP_LOADING);
    callback;
    remote.getCurrentWindow().close();
  }

module.exports.printFile =  function (scope,options ){

  
  console.log(electronProcess);

  const path = require('path');
  const url = require('url');

  
  const type ={
    // 'YesOrNo': path.join(__dirname,'modal', 'YesOrNoModal.html'),
    'solicitud': url.format({
    pathname: 'SOLICITUD_DE_PRESTAMOS.htm',
    protocol: 'print:',
    slashes: true
  }),
    'Info': path.join(__dirname, 'modal', 'InfoModal.html'),  
  }

  
  
  console.log(options);
  if(!electronProcess) return;
  // if(!type[options.type]) return;
  const BrowserWindow = electronProcess.BrowserWindow;
  let parentWin = (scope === 'main')?parentWinProvided:electronProcess.getCurrentWindow();

  let child = new BrowserWindow({
    width:700,
    height: 680,
    parent: parentWin, 
    show: false,
    // frame:false,
    modal:true
  })

  child.loadURL(type['solicitud']);

  child.once('ready-to-show', () => {
    child.show();
    
  })
  

};