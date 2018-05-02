import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import * as actions from '../actions';
import type { counterStateType } from '../reducers/counter';
import promise from "redux-promise-middleware";
import AppMiddlewares from '../middleware';
// import { persistentStore } from 'redux-pouchdb';
// import PouchMiddleware from 'pouch-redux-middleware';



// import PouchDB from 'pouchdb-browser';
import path from 'path';
import { forwardToRenderer, triggerAlias, replayActionMain, replayActionRenderer, forwardToMain } from 'electron-redux';

let history;

let configureStore = (initialState,scope='renderer') => {
  // Redux Configuration
  let middleware = [];
  const enhancers = [];

 


  // Promise 
  middleware.push(promise());

  // Thunk Middleware
  middleware.push(thunk);

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  // Router Middleware
  if (scope === 'renderer'){
    console.log(AppMiddlewares)
    // AppMiddlewares
    middleware.push(...AppMiddlewares);

    history = createHashHistory();

    const router = routerMiddleware(history);
    middleware.push(router);

    
    //  const pouchMiddleware = PouchMiddleware({
    //   path: '/storage',
    //   db,
    //   actions: {
    //     remove: doc => { return { type: actions.DELETE_CLIENT, id: doc._id } },
    //     insert: doc => { return { type: actions.CREATE_CLIENT, todo: doc } },
    //     // batchInsert: docs => { return { type: actions.BATCH_INSERT_TODOS, todos: docs } },
    //     update: doc => { return { type: actions.EDIT_CLIENT, todo: doc } },
    //   }
    // })
    // middleware.push(pouchMiddleware);
    // middleware.push(persistentStore(db));

  }
  

  // Redux DevTools Configuration
  const actionCreators = {
    ...actions,
    ...routerActions,
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  let composeEnhancers = compose;
  if (scope === 'renderer'){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators,
    })
    : compose;
  /* eslint-enable no-underscore-dangle */
  }
  

// Store on Main and renderer
if (scope === 'renderer') {
    middleware = [
      forwardToMain,
      ...middleware,
    ];
  }

  if (scope === 'main') {
    middleware = [
      triggerAlias,
      ...middleware,
      forwardToRenderer,
    ];
  }

// Add persistence Pouchdb 'redux-store'
  // var PouchDB = (scope === 'main')? require('pouchdb'):require('pouchdb-browser');
  // const db = new PouchDB( 'redux-store');
  let store;
  if(scope === 'renderer'){

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  // enhancers.push(persistentStore(db));
  // const db = require('electron').remote.getGlobal('db');
    const enhancer = composeEnhancers(...enhancers);
    store = createStore(rootReducer, initialState, enhancer);

  // const enhancer = composeEnhancers(...enhancers,persistentStore(db))(createStore);

  // Create Store
  // const substore = createStore(rootReducer, initialState, enhancer);
    // store = enhancer(rootReducer, initialState);

  }
  if(scope === 'main'){
    enhancers.push(applyMiddleware(...middleware));
    const enhancer = composeEnhancers(...enhancers);
    
    // try{
    store = createStore(rootReducer, initialState, enhancer);
  // }catch(e){console.log('store',e)}
  }

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))); // eslint-disable-line global-require
  }
  
  (scope === 'renderer')?replayActionRenderer(store):replayActionMain(store);

  return (scope === 'renderer')?{store, history}:store;

  
};

export default { configureStore };
