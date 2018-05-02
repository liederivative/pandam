
const {ipcMain,dialog} = require('electron');

const getUserHome=()=> process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];


const listenerIPXCalls= mainWindow=>{
    ipcMain.on('dialogSave', (event, args) => {
        const {date,prefix, title, id} = args;
        console.log(args)
        let defaultPath = `${getUserHome()}\\Desktop\\${prefix +"_"+date}`;
        dialog.showSaveDialog({
                title,
                defaultPath,
                buttonLabel: "Guardar Archivo",
                filters: [{
                    name: 'PDF',
                    extensions: ['pdf']
                }]
            }, filename=>event.sender.send(`filename${id}`, filename)    );
    })

}

export default listenerIPXCalls;