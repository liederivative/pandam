// @flow
import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import type { counterStateType } from '../reducers/counter';
import promise from "redux-promise-middleware";


import { forwardToRenderer, triggerAlias, replayActionMain, replayActionRenderer, forwardToMain } from 'electron-redux';



let history;
let enhancer;
let router;

function configureStore(initialState,scope='renderer') {
	console.log(scope)
	if (scope === 'renderer'){
		console.log('creating history')
		history = createHashHistory();
		console.log('creating router')
		router = routerMiddleware(history);
	}
	if (scope === 'renderer') {
		console.log('creating enhancer')
		enhancer = compose( applyMiddleware(forwardToMain,thunk, router,promise()) );
	  }

	 if (scope === 'main') {
	 	enhancer = applyMiddleware(triggerAlias,forwardToRenderer);
	  }
	 const store = createStore(rootReducer, initialState, enhancer);
	 (scope === 'renderer')?replayActionRenderer(store):replayActionMain(store);

	return (scope === 'renderer')?{store, history}:store;
}

export default { configureStore };
