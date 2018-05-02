
const STOP_LOADING = {type:'STOP_LOADING'};
const MODAL_ANSWERED_YES = {type:'MODAL_ANSWERED_YES'};
const MODAL_ANSWERED_NO = {type:'MODAL_ANSWERED_NO'};


const electron = require('electron');
const electronProcess = (electron.remote)?electron.remote:electron;

module.exports.closeWindow = (callback,remote)=>{
    store.dispatch(STOP_LOADING);
    callback;
    remote.getCurrentWindow().close();
  }

module.exports.createModal =  function (scope,args ){

  const options = args; 
  console.log(electronProcess);
  // const electronProcess = (scope === "main")?electron:electron.remote;
  
  const path = require('path');
  const url = require('url');

  
  const type ={
    // 'YesOrNo': path.join(__dirname,'modal', 'YesOrNoModal.html'),
    'YesOrNo': url.format({
    pathname: 'YesOrNoModal.html',
    protocol: 'modal:',
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
    width:411,
    height: 260,
    parent: parentWin, 
    show: false,
    frame:false,
    modal:true
  })

  child.loadURL(type['YesOrNo']);

  child.once('ready-to-show', () => {
    child.show();
    
  })
  

};