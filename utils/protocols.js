const { protocol } = require('electron');
const path = require('path');

module.exports.registerProtocols = (PROTOCOL,FOLDER)=>{

	protocol.registerFileProtocol(PROTOCOL, (request, callback) => {
      
      // // Strip protocol
      let url = request.url.substr(PROTOCOL.length + 1);

      // Build complete path for node require function
      url = path.join(__dirname, '..' , FOLDER, url);

      // Replace backslashes by forward slashes (windows)
      // url = url.replace(/\\/g, '/');
      url = path.normalize(url);

      // console.log(url);
      callback({path: url});
  },(error) => {
    if (error) console.error('Failed to register protocol',error)
  });

}