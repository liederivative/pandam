


const validate = (values,requiredFields) => {
  // console.log(values,requiredFields)
  const errors = {};

  requiredFields.forEach(field => {

      let stringify = (typeof values[field] ==='undefined')?values[field]:values[field].toString();
      if (!stringify) {
        errors[field] = 'Este campo es requerido'
      }
  })
    
        const national_id = values.searchString('national_id',1,1);

        if(national_id.length){
            for (var i = national_id.length - 1; i >= 0; i--) {
                if (values[national_id[i]].length < 13 ) {
                errors[national_id[i]] = "Cédula incorrecta";
              }
            }
             
        }
        const phone = values.searchString('phone',1,1);
        if(phone.length){
            for (var i = phone.length - 1; i >= 0; i--) {
                if (values[phone[i]].length < 12) {
                    errors[phone[i]] = "Teléfono incorrecto";
                }
            }
            
          }


    
  
  // await errors;

  return errors;
};

export default validate;