
import { MODAL_OPEN_MODAL, 
		MODAL_CLOSE_MODAL,
		MODAL_ANSWERED_YES, 
		MODAL_ANSWERED_NO } from '../actions/modal';


const initialState =  {
  type:'Info',
  isOpen: false,
  answeredYes:false,
  msg:'',
  title:'Error',
  textYes:'OK',
  textNo:'CANCEL'
};

export default function modal(state = initialState, action) {

  switch (action.type) {
    case MODAL_OPEN_MODAL:
      console.log(action.payload)
      return {
        ...state, isOpen: true, ...action.payload
      };
    case MODAL_CLOSE_MODAL:
      return {
        ...state, isOpen: false
      };
    case MODAL_ANSWERED_YES:
      return {
        ...state, answeredYes: true
      };
    case MODAL_ANSWERED_NO:
      return {
        ...state, answeredYes: false
      };
    default:
      return state;
  }
}