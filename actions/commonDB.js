export const INSERT_DOCS = 'INSERT_DOCS';
export const UPSERT_DOC = 'UPSERT_DOC';
// export const EDIT_CLIENT = 'EDIT_CLIENT';
// export const DELETE_CLIENT = 'DELETE_CLIENT';
// export const SEARCH_CLIENTS = 'SEARCH_CLIENTS';
// export const GET_CLIENTS = 'GET_CLIENTS';


let db;

if(require('electron').remote){
    db = require('electron').remote.getGlobal('db');
    console.log(db)
}

export function save(client){
		console.log(client);
        return{
            type: INSERT_DOCS,
            payload:Promise.all(client.map( (doc,i)=>db[doc.group].atomicUpsert(doc) ) ),
            meta:{
                scope:'local'
            }
        }
}


export function upsert(client){

        return{
            type: UPSERT_DOC,
            payload:db.bulkDocs(action.payload),
            meta:{
                scope:'local'
            }
        }
}
