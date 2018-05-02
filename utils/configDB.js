import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-find'));

import RxDB from 'rxdb';
import adapter from 'pouchdb-adapter-leveldb';
import leveldown from 'leveldown';
RxDB.plugin(adapter);
RxDB.plugin(require('pouchdb-adapter-http')); // enable syncing over http (remote database)
import schemas from './JSONSchema';

const configDB = ( callback )=>{

	const db = new PouchDB('storage');

	const remoteDB = new PouchDB('http://admin:werttoma@104.154.203.138:5984/storage');

	global.db = db;

	const syncHandler = db.sync(remoteDB,{live:true,retry: true})
	.on('change', function (change) {
		console.log(change);
  		// yo, something changed!
	})
	.on('error', function (err) {
		console.log('yo we got an error',err)
  		// yo, we got an error! (maybe the user went offline?)
	});;

	var views = [
			// {
			//       _id: '_design/clients',
			//       views: {
			//         findSchema: {
			//           map: function (doc) {
			//             if (doc.type == 'CLIENT') {
			// 		            emit([doc._id, 0], doc);
			// 		        } else if (doc.type == 'GUARANTOR') {
			// 		            emit([doc._id.replace('_CLIENT',''), 1, doc.phone_type], doc);
			// 		        }
			//           }.toString()
			//         }
			//       }
			//     },
			    {
			    	_id: '_design/clients',
			      views: {
			        approved: {
			          map: function (doc) {
			            if (doc.type==='LOAN' && doc.approved === false ) {
			              emit([doc._id]);
			            }
			          }.toString()
			        }
			      }
			    
			    }
        	]


    const docs = views.map(view=>({id:view._id}) );
    

    db.bulkGet({docs})
    .then(r =>{
    	
    	let list = r.results.filter(e=> (e.docs[0].error)?e.docs[0].error.error:false);
    	
        let item = list.filter((d)=>{
        	
            let design = views.find((x) => {
            		
                        return x._id === d.id
                    });
            
            db.put(design).then();
            return design
        })
    })
	

}

const removeDB = async ()=>{
		await RxDB.removeDatabase('test', leveldown)
	}

const configDBII = async ( )=>{

	const remote = 'http://localhost:5984/test';
	const config={
		  name: 'test',           // <- name
		  adapter: leveldown,
		  password: 'pandamSecret2018$',     // <- password (optional)
		  multiInstance: false       // <- multiInstance (default: true)
		  // pouchSettings:{

		  // }
	}

	try{
	console.log(config)
	const db = await RxDB.create(config);
	// }catch(e){
	// 	console.log('CREATING DB:',e);
	// }
	console.log('DB created '+config.name);
	// try{

	const collections = Object.keys(schemas);
	console.log(collections);
	// }catch(e){
	// 	console.log('ARRAY OF SCHEMAS:',e);
	// }
	// try{
	await Promise.all( collections.map(type => db.collection(schemas[type]) ) );
	// }catch(e){
	// 	console.log('CREATING COLLECTIONS:',e);
	// }
	// const myCollection = await db.collection({
	// 							  name: 'heroes',
	// 							  schema: schema,
								  // migrationStrategies: {
									 //  	1: async function(oldDoc){
										//       oldDoc.secret = '';
										//       return oldDoc;
										//     }
									 //  }
								// });
	console.log('Collections created');
	const syncConfig = {
		remote:remote,
		waitForLeadership: false,
		options: { live: true, retry: true }
	}


 	collections.map(collection => db[collection].sync(syncConfig) ) 

	// const replicationState = await myCollection.sync({
	//     remote: 'http://admin:werttoma@104.154.203.138:5984/rxdb', // remote database. This can be the serverURL, another RxCollection or a PouchDB-instance
	//     waitForLeadership: false,              // (optional) [default=true] to save performance, the sync starts on leader-instance only
	//     direction: {                          // direction (optional) to specify sync-directions
	//         pull: true, // default=true
	//         push: true  // default=true
	//     },
	//     options: {                             // sync-options (optional) from https://pouchdb.com/api.html#replication
	//         live: true,
	//         retry: true
	//     },
	    // query: myCollection.find().where('age').gt(18) // query (optional) only documents that match that query will be synchronised
	// });
	// console.log('Sync DB');
	// replicationState.change$.subscribe(change => console.log(change));
	// try{
	global.db = await db;
	console.log('Set global DB');

	}catch(e){
		console.log('SETTING GLOBAL',e);
	}
}
export default {configDB:configDBII,removeDB};
