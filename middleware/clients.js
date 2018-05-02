
import {CREATE_CLIENT,EDIT_CLIENT,createClient} from '../actions/clients';
import { initialize, clearFields } from 'redux-form';
import {formNames} from '../utils/const';


export const processClients = ({dispatch, getState}) => next => action => {
  next(action);

  if (action.type === 'GET_CLIENT_FULFILLED') {
  		console.log(action.payload)
  		const {data,form,disabled} = action.payload;
  		
  		dispatch( clearFields( form, false,undefined, ...Object.keys(data) )  )
  		if(disabled) dispatch( {type:'DISABLE_FIELDS', payload:Object.keys(data) , meta:{scope:'local'}} )
  		dispatch( initialize(form, data, false, {keepValues:true}) )

  }
   if (action.type === 'GET_LOAN_FULFILLED') {
  		console.log(action.payload)
  		
  		dispatch( clearFields( formNames.Clients, false,undefined, ...Object.keys(action.payload) )  )
  		// dispatch( {type:'DISABLE_FIELDS', payload:Object.keys(action.payload) , meta:{scope:'local'}} )
  		dispatch( initialize(formNames.Clients, action.payload, false, {keepValues:true}) )

  }

  // if (action.type === CREATE_CLIENT) {

  // 	dispatch( {type: UPDATE_CLIENT,payload: {date: new Date(), id: action.payload }, meta:{scope:'local'}} )
  		

  // }

};

 export const clients = [processClients];


