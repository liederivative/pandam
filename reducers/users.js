import {
 SET_ID_EDITING, 
 SET_CAN_SAVE, 
 SEARCH_USER, 
 USER_FOUND, 
 USER_NOT_FOUND,
 IS_EDITING,
 IS_NEW_USER,
 SET_NEW_ID,
 GET_LIST_USERS,
  } from '../actions/users';


const initialState =  {
  data: [],
  usersState:{},
  idEditing:'',
  canSave:false,
  isNew:false,
};

export default function users(state = initialState, action) {

  

  switch (action.type) {
    
    case IS_EDITING:
      
      return {
        
        ...state, isNew: false
    };
    case GET_LIST_USERS:
      
      return {
        
        ...state, data: action.payload
    };
    
    case IS_NEW_USER:
      return {
        ...state, isNew: true
      };
    case SET_ID_EDITING:
      
      return {
        ...state, idEditing: action.payload
      };
    case USER_FOUND:
      return {
        ...state, canSave: false
      };
    case USER_NOT_FOUND:
      return {
        ...state, canSave: true
      };
    default:
      return state;
  }
}