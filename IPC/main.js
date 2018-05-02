
const {ipcMain} = require('electron');



export function OnYesModal(callback){

	ipcMain.on('modalYesOrNo',(event, ...args)=>{
		let data = {payload:'',type:'ON_YES_REPLAY'}
		event.sender.send(data);
	})

}