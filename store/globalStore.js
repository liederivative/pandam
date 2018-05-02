

import { configureStore} from './configureStore';

const {store, history} = configureStore();


export default store;






// const { createStore, applyMiddleware, compose } =require('redux');
// const { persistentStore } = require('redux-pouchdb');


// const db = new PouchDB( 'redux-store');

// const createStoreWithMiddleware = compose(
//   persistentStore(db)
// )(createStore);

// module.exports.store = createStoreWithMiddleware(()=>{},{})
