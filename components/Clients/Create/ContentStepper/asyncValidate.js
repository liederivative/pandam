
const db = require('electron').remote.getGlobal('db');


const asyncValidate = (values , dispatch ) => {
	console.log(values.national_id)
  return db.client.pouch.get(values.national_id).then(() => {

      throw { national_id: 'Cédula ya existe' }
    
  }).catch((err) =>{
  	if(err.national_id){
  		throw err;
  	}
  });
}

export default asyncValidate