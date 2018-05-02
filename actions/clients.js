export const CREATE_CLIENT = 'CREATE_CLIENT';
export const SAVE_CLIENT = 'SAVE_CLIENT';
export const EDIT_CLIENT = 'EDIT_CLIENT';
export const DELETE_CLIENT = 'DELETE_CLIENT';
export const SEARCH_CLIENTS = 'SEARCH_CLIENTS';
export const GET_CLIENT = 'GET_CLIENT';
export const GET_LIST_CLIENT = 'GET_LIST_CLIENT';
export const ACTIVATE_LOAN = 'ACTIVATE_LOAN';
export const GET_LOANS = 'GET_LOANS';
export const SET_LOANS = 'SET_LOANS';
export const SET_SELECTOR = 'SET_SELECTOR';
export const SET_DATE = 'SET_DATE';
export const SET_INDEXES = 'SET_INDEXES';
export const SET_ROWSPERPAGE = 'SET_ROWSPERPAGE';
export const SET_PAGE = 'SET_PAGE';
export const SET_SORTING = 'SET_SORTING';
export const SET_DETAIL = 'SET_DETAIL';
export const SET_SUBMENU = 'SET_SUBMENU';
export const SET_SUBCRIPTION = 'SET_SUBCRIPTION';
export const SET_UNSUBCRIPTION = 'SET_UNSUBCRIPTION';
export const APPROVE_LOAN = 'APPROVE_LOAN';
export const INITIALIZE_FORM = 'INITIALIZE_FORM';
export const UPDATED_CHANGE = 'UPDATED_CHANGE';
export const STORE_ID_LOAN = 'STORE_ID_LOAN';


import { initialize, clearFields, getFormValues } from 'redux-form';

import moment from '../utils/date';
import {startLoading,stopLoading} from './loading';
import {openModal} from './modal';
// import {createModal} from '../utils/helpers';

const {remote} = require('electron');

let db;
if(remote){
    db = remote.getGlobal('db');
}

export function saveIDLoan(id) {
    return{
        type: STORE_ID_LOAN,
        payload:id
    }
}
export function createClient (){
        return async (dispatch, getState) => {
                

            const {values} =  getState().form.createClients;
            const {national_id} =  getState().form.createClients.values;

            const packageFields = (values,loan_no,extraInfoLoan)=>{
                    
                    
                    let client = Object.filter(values, (r)=> !(r.indexOf('guarantor') === 0) && !(r.indexOf('business') === 0) && !(r.indexOf('loan') === 0) && !(r.indexOf('ref') === 0)  );
                    // .map(props=>({ [props]: }) )
                    let guarantor_ = Object.filter(values, (r)=> ( (r.indexOf('guarantor') === 0) && !(r.indexOf('guarantor_ref') === 0) && !(r.indexOf('guarantor_business') === 0) ) );
    
                    let guarantor_ref1_ = Object.filter(values, (r)=> { return r.indexOf('guarantor_ref1') === 0 } );
                    let guarantor_ref2_ = Object.filter(values, (r)=> { return r.indexOf('guarantor_ref2') === 0 } );
                    let loan_ = Object.filter(values, (r)=> (r.indexOf('loan_') === 0)  );
                    let business_ = Object.filter(values, (r)=> ( (r.indexOf('business') === 0) && !(r.indexOf('guarantor_business') === 0)  ) );
                    let guarantor_business_ = Object.filter(values, (r)=> ( (r.indexOf('guarantor_business') === 0) && !(r.indexOf('business') === 0)  ) );
                    let ref_1_ = Object.filter(values, (r)=> (r.indexOf('ref_1_') === 0) );
                    let ref_2_ = Object.filter(values, (r)=> (r.indexOf('ref_2_') === 0) );
                    let ref_3_ = Object.filter(values, (r)=> (r.indexOf('ref_3_') === 0) );

                    if (typeof loan_.loan_start_date === 'object' ) loan_.loan_start_date = loan_.loan_start_date.toISOString();

                    const guarantor = Object.keys(guarantor_).map( key => ({ [key.replace('guarantor_','')]: guarantor_[key] }) )
                    const loan = Object.keys(loan_).map( key => ({ [key.replace('loan_','')]: loan_[key] }) )
                    const business = Object.keys(business_).map( key => ({ [key.replace('business_','')]: business_[key] }) )
                    const guarantor_business = Object.keys(guarantor_business_).map( key => ({ [key.replace('guarantor_business_','')]: guarantor_business_[key] }) )
                    const ref_1 = Object.keys(ref_1_).map( key => ({ [key.replace('ref_1_','')]: ref_1_[key] }) )
                    const ref_2 = Object.keys(ref_2_).map( key => ({ [key.replace('ref_2_','')]: ref_2_[key] }) )
                    const ref_3 = Object.keys(ref_3_).map( key => ({ [key.replace('ref_3_','')]: ref_3_[key] }) )
                    const guarantor_ref1 = Object.keys(guarantor_ref1_).map( key => ({ [key.replace('guarantor_ref1_','')]: guarantor_ref1_[key] }) )
                    const guarantor_ref2 = Object.keys(guarantor_ref2_).map( key => ({ [key.replace('guarantor_ref2_','')]: guarantor_ref2_[key] }) )
                    

                    

                    const loans = [...Array(loan_no+1).keys()].map(loan_no=>`${client.national_id}_LOAN${loan_no}`)
                    const checkIf=(field)=>{
                        try{
                            return Object.assign(...field); 
                        }catch(e){
                            console.log(e);
                            return field;
                        }
                         
                    }
                    saveIDLoan(`${client.national_id}_LOAN${loan_no}`);
                    const payload = [
                                { ...client ,loan_no, loans, group:'client',id:`${client.national_id}`, rxid:`${client.national_id}`,
                                    refs:[`${client.national_id}_REF1`,`${client.national_id}_REF2`,`${client.national_id}_REF3`],
                                    ref_negocio:`${client.national_id}_BUSINESS` },

                               { ...checkIf(guarantor), id:`${client.national_id}_GUARANTOR${loan_no}`, rxid:`${client.national_id}_GUARANTOR${loan_no}`,
                                loan:`${client.national_id}_LOAN${loan_no}`, group:'guarantor',
                                refs:[`${client.national_id}_GUARANTOR_1REF${loan_no}`,`${client.national_id}_GUARANTOR_2REF${loan_no}`],
                                business:`${client.national_id}_GUARANTOR_BUSINESS${loan_no}`},

                                { ...checkIf(guarantor_business), id:`${client.national_id}_GUARANTOR_BUSINESS${loan_no}`, rxid:`${client.national_id}_GUARANTOR_BUSINESS${loan_no}`,group:'business' },
                                
                                { ...checkIf(business), id:`${client.national_id}_BUSINESS`,rxid:`${client.national_id}_BUSINESS`,group:'business' },

                               { ...checkIf(guarantor_ref1), id:`${client.national_id}_GUARANTOR_1REF${loan_no}` ,
                               group:'personalref', rxid:`${client.national_id}_GUARANTOR_1REF${loan_no}` },
                               { ...checkIf(guarantor_ref2), id:`${client.national_id}_GUARANTOR_2REF${loan_no}`,
                               group:'personalref', rxid:`${client.national_id}_GUARANTOR_2REF${loan_no}` },
                               { id:`${client.national_id}_REF1`,rxid:`${client.national_id}_REF1`, ...checkIf(ref_1),group:'personalref' },
                               { id:`${client.national_id}_REF2`,rxid:`${client.national_id}_REF2`, ...checkIf(ref_2),group:'personalref' },
                               { id:`${client.national_id}_REF3`,rxid:`${client.national_id}_REF3`, ...checkIf(ref_3) ,group:'personalref'},

                               { ...extraInfoLoan, id:`${client.national_id}_LOAN${loan_no}`,rxid:`${client.national_id}_LOAN${loan_no}`,
                                     guarantor:`${client.national_id}_GUARANTOR${loan_no}`,payments:[],
                                     client_id:client.national_id, group:'loan', ...checkIf(loan) },
                        ]
                    return payload;

            }
                           
            try{
                const mora_rate = await db.morarate.pouch.get('MORA_RATE')

                let extraInfoLoan = { 
                                    mora_rate: mora_rate.rate,
                                    check_run:1,
                                    false_count:0,
                                    approved:false,
                                    finished:false,
                                    notify:false,
                                    payed_cierre:false,
                                }
                    
                let client = await db.client.find().where('_id').eq(`${national_id}`).exec();
                console.log(client)
                const loan_no = (client.length)?(client[0].loan_no + 1): 0;
                console.log(loan_no)
                const payload = packageFields(values,loan_no,extraInfoLoan);

                dispatch( saveClient(payload) )
                
                    

            }catch(err){ err =>{ console.log(err); throw new Error('Noted--') } }
                

        };
}

export function saveClient(client){
    return{
        type: SAVE_CLIENT,
        payload:client,
        meta:{
            scope:'local'
        }
    }
}

export function getClients(options){
    console.log(options)
    const payload = async function(){
        // console.log(options)
        let data = await db.client.pouch.get(options.client);
        console.log(data);
        let y = await Object.assign({},data); delete y._id; delete y._rev;
        return await { data:y, ...options} 
    }

    return{
        type: GET_CLIENT,
        payload,
        meta:{
            scope:'local'
        }
    }
}
export function getListClients(options){

    const payload = async () =>{

        const query = await db.loan.find().where('approved').eq(false).exec() //query('clients/approved',options.selector);
        // const data = await query.rows.map((t)=>{return t.doc});
        
        return {data:query}
    }

    return {
        type: GET_LIST_CLIENT,
        payload,
        meta:{
            scope:'local'
        }
    }
}
export function setSelector(payload){

    return{
        type: SET_SELECTOR,
        payload,
        meta:{
            scope:'local'
        }
    }
}
let liveQuery;
export function setSubscribe({unsubscribe,query,addDate=0,collection='loan'}){

    return (dispatch, getState)=>{
        const {unsubscribe, addDate, dates,rowsPerPage, page,listOfClients, selector,sorting} = getState().clients;
        let {indexes} = getState().clients;
        const UTCDate = 'Africa/Accra';
        const startDate = moment.tz(dates[0],UTCDate).startOf('day').toISOString();
        const endDate = moment.tz(dates[1],UTCDate).endOf('day').toISOString();

        if(unsubscribe) liveQuery.unsubscribe();
        if(addDate) query = query.created_date = {$gt:startDate,$lt:endDate};

        let find = db[collection].find(query);
        let sortingDirection = 'gt';
        if(sorting){ 
            // find = find.sort( { [sorting[0].columnName]:sorting[0].direction } );
            // sortingDirection = (sorting[0].direction ==='asc')?'gt':'lt';
        }

        dispatch( setSelector({unsubscribe,query,addDate}) );

        let first = true;
        console.log(page)

        liveQuery = find.limit(rowsPerPage+1).where('id')[sortingDirection](indexes[page]).sort({created_date:'desc'})
        .$.subscribe( async loans=>{

            console.log(indexes,page, loans)
            
            if(page || first){
                first = false;
                const lastIndex = indexes.length - 1; 

                if(loans.length){
                    if(indexes > 1 ){
                        indexes[lastIndex] = loans[loans.length - 1].id;
                    }else{
                        indexes.push(loans[loans.length - 1].id)
                    }
                }
                
                indexes = [...new Set(indexes)];

            } 
            dispatch( setPropertie(SET_INDEXES,indexes) );

            dispatch( setLoans(loans) )

            })
      }
}
export function setUnsubscribe(payload){

    
    liveQuery.unsubscribe();

    return{
        type: SET_UNSUBCRIPTION,
        payload,
        meta:{
            scope:'local'
        }
        
    }
}
export function setPropertie(type,payload){

    return{
        type,
        payload,
        meta:{
            scope:'local'
        }
    }
}
export function approveLoan(loan_id){
    const approved = {
            type: APPROVE_LOAN,
            payload:loan_id,
            meta:{
                scope:'local'
            }
        }
    return async (dispatch, getState)=>{
        const loan = await db.loan.findOne().where('id').eq(loan_id).exec();
        if(loan){loan.approved = true;
            loan.save()
            dispatch(approved);
        }
    }
    
    
}
export function setLoans(payload){

    return{
        type: SET_LOANS,
        payload,
        meta:{
            scope:'local'
        }
    }
}
export function getLoans(options){
    console.log(options)

    const payload = async () => {

        const client = await db.get(options.client); 
        const laonRun = await client.loan_no + 1;
        let indexes = [];
        const runs = await [...Array(laonRun).keys()];
        console.log(runs, 'runs')
        
        const d = await Promise.all(runs.map(async (i) => {

            await indexes.push( await db.get(`${client._id}_GUARANTOR${i}`) )
            await indexes.push( await db.get(`${client._id}_GUARANTOR_REF${i}`) )
            await indexes.push( await db.get(`${client._id}_BUSINESS`) )
            await indexes.push( await db.get(`${client._id}_REF`) )
            await indexes.push( await db.get(`${client._id}_LOAN${i}`) )

          }));
        
     // {client:'111-1111111-1'}
        console.log(indexes)
        // const loans = await db.bulkGet( indexes); 

        return await { data:indexes, ...options} 
    }

    return{
        type: GET_LOANS,
        payload,
        meta:{
            scope:'local'
        }
    }
}

export function editClients(client) {

    return (dispatch, getState) => {
                db.get('DEFENDERS')
			  };
}

export function updateClients(client) {

    return (dispatch, getState) => {
                createModal('renderer',info);
                dispatch(openModalState(info));
              };
}

export function initializeForm(payload){
        const {form, data} = payload;
    
        return (dispatch,getState)=>{

                dispatch( initialize(form, data, false,) )

                dispatch({
                    type: INITIALIZE_FORM,
                    payload,
                    meta:{
                        scope:'local'
                    }
                })
        }
    
}

export function updateCollection(payload){
        let { row, fields, form} = payload;
    
        return async (dispatch,getState)=>{
                if(form){
                    fields = getFormValues(form)(getState());
                    fields = Object.assign({},...Object.keys(fields).map( 
                                            key=>({[key.replace('loan_',"")]:fields[key]}) 
                                            ) )
                }
                const obj = await db[row.group].findOne().where('id').eq(row.id).exec()
                console.log(obj)
                if(!Object.keys(obj).length){
                    openModal({msg:'No se pudo guardar los cambios'})
                    return;
                }
                console.log(fields)
                for (var i = Object.keys(fields).length - 1; i >= 0; i--) {
                    obj[ Object.keys(fields)[i] ] = fields[Object.keys(fields)[i]]
                }
                await obj.save()
                
                dispatch({
                    type: UPDATED_CHANGE,
                    payload,
                    meta:{
                        scope:'local'
                    }
                })
        }
    
}