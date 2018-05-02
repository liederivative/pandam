import {startLoading,stopLoading} from '../actions/loading';
import {upsert,save} from '../actions/commonDB';

export const checkPending = ({dispatch}) => next => action => {
  next(action);

 if (action.type.search('PENDING') > 0) {
    dispatch(startLoading());
  }
  if (action.type.search('FULFILLED') > 0) {
    dispatch(stopLoading());
  }
  if (action.type.search('REJECTED') > 0) {
    dispatch(stopLoading());
  }

 };

export const saveToDB = ({dispatch}) => next => action => {
	next(action);

	if (action.type.search('SAVE') === 0) {



		let docs = action.payload.map( (doc) => ({ created_date: new Date().toISOString(), ...doc }) ) 

		dispatch({type:'INFO_SAVE',payload:docs,meta:{scope:'local'}})

	    dispatch(save(docs));
	}

 };

 export const asyncDB = [checkPending,saveToDB];