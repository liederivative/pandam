import { focus } from 'redux-form';

const scrollToInvalid = (params,formName) => {
	console.log(params)
	const {errors,dispatch} = params;

	console.log(params,dispatch,formName)
      if (errors) {
      	let elmts, form;
      	form = document.forms[formName]
		  elmts = (form || {}).elements || []
		  for (let i = 0, iLen = elmts.length; i < iLen; ++i) {
		    let elmt = elmts[i]
		    // console.log(elmt);
		    if (elmt.name in errors) {
		      elmt.focus()
		      break
		    }
		  }
        const invalidInput = Object.keys(errors).find(key => key !== undefined);
        console.log(invalidInput)
        // dispatch(focus('createClients',Object.keys(invalidInput)[0]));
        window.scrollTo(0, window.pageYOffset +
          (document.getElementsByName(invalidInput)[0].getBoundingClientRect().top - 100));
      }
   };

export default scrollToInvalid;