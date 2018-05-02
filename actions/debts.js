
export const IS_NEW_USER= 'IS_NEW_USER';

export const ADD_EXPENSE= 'SAVE_ADD_EXPENSES';
export const DELETE_EXPENSE_PENDING= 'DELETE_EXPENSE_PENDING';
export const DELETE_EXPENSE_FULFILLED= 'DELETE_EXPENSE_FULFILLED';
export const DELETE_EXPENSE_REJECTED= 'DELETE_EXPENSE_REJECTED';
export const GET_LIST_EXPENSES= 'GET_LIST_EXPENSES';
export const SET_UNSUBSCRIBE= 'DEBTS_SET_UNSUBSCRIBE';
export const SET_DATES = 'SET_DATES';
export const SET_ROWS = 'SET_ROWS';
export const SET_PAGE = 'SET_PAGE';
export const SET_INDEXES = 'SET_INDEXES';





const {remote} = require('electron');

import {openModal} from './modal';

let db;
if(remote){
    db = remote.getGlobal('db');
}




export function isNew() {
    return {
        type: IS_NEW_USER,
        meta:{
            scope:'local'
        }
    }
}



export function addExpense(expense) {
     
    const payload = (dispatch)=>{
        
        dispatch({
            type: ADD_EXPENSE,
            payload:[expense],
            meta:{
                scope:'local'
            }
        })
    }
    return payload;
}


export function deleteExpense(expenseId) {

    const payload = async (dispatch)=>{

        dispatch({
            type: 'DELETE_EXPENSE_PENDING',
            payload:expenseId,
            meta:{
                scope:'local'
            }
        })
        const expense = await db.debt.findOne().where('id').eq(expenseId).exec();
        if(Object.keys(expense).length){
            expense.remove();

        }
        dispatch({
            type: 'DELETE_EXPENSE_FULFILLED',
            payload:expenseId,
            meta:{
                scope:'local'
            }
        })
    }
    return payload;
}
export function setPageExpenses(rowPerPage) {

    return {
        type: SET_PAGE,
        payload:rowPerPage,
        meta:{
            scope:'local'
        }
    }
}
export function resetPagination(rowPerPage) {

    return {
        type: SET_INDEXES,
        payload:rowPerPage,
        meta:{
            scope:'local'
        }
    }
}
export function setRowExpenses(rowPerPage) {

    return {
        type: SET_ROWS,
        payload:rowPerPage,
        meta:{
            scope:'local'
        }
    }
}
export function setDatesExpenses(dates) {

    return {
        type: SET_DATES,
        payload:dates,
        meta:{
            scope:'local'
        }
    }
}
let subs =[];
export function getListExpenses(query) {
    let {id , sort, cond} = query; 
    console.log(query);
    const payload = (dispatch,getState)=>{
        const {dates, rowPerPage} = getState().debts;
        dispatch( setUnsubscribeExpenses() );
        if(!sort) sort =  '-expense_date';
        if(!cond) cond = 'gte';
        console.log(cond,dates,sort,id, rowPerPage);

        const sub = db.debt.find().where('group').eq('debt')
                                  .where('expense_date')[cond](id)
                                  .where('expense_date').gt(dates[0].toISOString())
                                  .limit(rowPerPage).sort(sort)

        .$.subscribe( debts=>{
            dispatch({
                    type: GET_LIST_EXPENSES,
                    payload:debts,
                    meta:{
                        scope:'local'
                    }
                })
        })
        subs.push(sub);
    }
    return payload
}
export function setUnsubscribeExpenses() {

    subs.map(sub=>sub.unsubscribe())
    return {
        type: SET_UNSUBSCRIBE,
        payload:'',
        meta:{
            scope:'local'
        }
    }
}


