export const SET_ID_EDITING = 'SET_ID_EDITING';
export const SEARCH_USER = 'SEARCH_USER';
export const USER_FOUND = 'USER_FOUND';
export const USER_NOT_FOUND = 'USER_NOT_FOUND';
export const UPDATE_USER = 'UPDATE_USER';
export const USER_CREATED = 'USER_CREATED';
export const USER_NOT_CREATED= 'USER_NOT_CREATED';
export const IS_EDITING= 'IS_EDITING';
export const IS_NEW_USER= 'IS_NEW_USER';
export const SET_NEW_ID= 'SET_NEW_ID';
export const ADD_USER= 'SAVE_ADD_USER';
export const DELETE_USER= 'DELETE_USER';
export const GET_LIST_USERS= 'GET_LIST_USERS';
export const SET_UNSUBSCRIBE= 'USERS_SET_UNSUBSCRIBE';
export const RESET_PWD= 'RESET_PWD';


const {remote} = require('electron');

import {openModal} from './modal';
import {saltHashPassword} from '../utils/crypto';

let db;
if(remote){
    db = remote.getGlobal('db');
}
export function updateUser(payload) {
    const {id, fields} = payload;
    return {
        type: UPDATE_USER,
        payload:id,
        meta:{
            scope:'local'
        }
    }
}

export function createUser(user) {
    
    const payload = (dispatch,getState)=>{
        try{
            db.user.insert(user);
            dispatch({
                type: USER_CREATED,
                payload:user,
                meta:{
                    scope:'local'
                }
            })
        }catch(e){
            dispatch({  
                type: USER_NOT_CREATED,
                payload:user,
                meta:{
                    scope:'local'
                }
            })
        }
    }
    return payload
}
export function setIdEditing(id) {
    return {
        type: SET_ID_EDITING,
        payload:id,
        meta:{
        	scope:'local'
        }
    }
}

export function isEditing(id) {
    return {
        type: IS_EDITING,
        payload:id,
        meta:{
            scope:'local'
        }
    }
}
export function isNew() {
    return {
        type: IS_NEW_USER,
        meta:{
            scope:'local'
        }
    }
}
export function _userFound(id) {
    return {
        type: USER_FOUND,
        payload:id,
        meta:{
            scope:'local'
        }
    }
}
export function _userNotFound(id) {
    return {
        type: USER_NOT_FOUND,
        payload:id,
        meta:{
            scope:'local'
        }
    }
}
export function _searchUser(payload) {
    return {
        type: SEARCH_USER,
        payload,
        meta:{
            scope:'local'
        }
    }
}
function setDefaultPwd(user) {
    const pwd = saltHashPassword('1234');
    user.pwd = pwd.passwordHash;
    user.salt = pwd.salt;
    user.reset = 1;
    return user;
}
export function addUser(newUser) {
     
    const payload = (dispatch)=>{
        newUser = setDefaultPwd(newUser);
        dispatch({
            type: ADD_USER,
            // payload:db.user.insert(newUser),
            payload:[newUser],
            meta:{
                scope:'local'
            }
        })
    }
    return payload;
}
export function resetPwd(userId) {
    const payload = async (dispatch)=>{

        dispatch({
            type: 'RESET_PWD_PENDING',
            payload:userId,
            meta:{
                scope:'local'
            }
        })
        let user = await db.user.findOne().where('id').eq(userId).exec();
        if(Object.keys(user).length){
            
            user = setDefaultPwd(user);
            user.save();
            openModal({msg:'Contraseña del usuario cambiada a 1234',title:'Info'})
        }
        dispatch({
            type: 'RESET_PWD_FULFILLED',
            payload:userId,
            meta:{
                scope:'local'
            }
        })
    }
    return payload;
}

export function deleteUser(userId) {

    const payload = async (dispatch)=>{

        dispatch({
            type: 'DELETE_USER_PENDING',
            payload:userId,
            meta:{
                scope:'local'
            }
        })
        const user = await db.user.findOne().where('id').eq(userId).exec();
        if(Object.keys(user).length){
            user.remove();

        }
        dispatch({
            type: 'DELETE_USER_FULFILLED',
            payload:userId,
            meta:{
                scope:'local'
            }
        })
    }
    return payload;
}
let subs =[];
export function getListUsers() {
    const payload = (dispatch,getState)=>{

        const sub = db.user.find().where('group').eq('user').$.subscribe( users=>{
            dispatch({
                    type: GET_LIST_USERS,
                    payload:users,
                    meta:{
                        scope:'local'
                    }
                })
        })
        subs.push(sub);
    }
    return payload
}
export function setUnsubscribeUsers() {

    subs.map(sub=>sub.unsubscribe())
    return {
        type: SET_UNSUBSCRIBE,
        payload:'',
        meta:{
            scope:'local'
        }
    }
}
export function searchUser(userId) {

    const payload= async (dispatch,getState)=>{
        dispatch(_searchUser(userId));
        const user = await db.user.find().where('id').eq(userId).exec();
        if(!user.length){ 
            dispatch( _userNotFound(userId) ) ;

            return false;
         }
        dispatch( _userFound(userId) );
        return true;
            
    }
    return payload;
}

