// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import counter from './counter';
import auth from './auth';
import modal from './modal';
import loading from './loading';
import stepper from './stepper';
import clients from './clients';
import users from './users';
import debts from './debts';
// import { persistentReducer } from 'redux-pouchdb';

const rootReducer = combineReducers({
	debts,
	users,
	clients,
 	stepper,
	loading,
	modal,
	auth,
	counter,
	router,
	form,
});

export default rootReducer;
