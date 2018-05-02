import { SIGN_IN_USER, SIGN_OUT_USER } from '../actions/auth';

const initialState =  {
  authenticated: false,
  modules:[0,1]
};

export default function auth(state = initialState, action) {

  switch (action.type) {
    case SIGN_IN_USER:
      return {
        ...state, authenticated: true
      };
    case SIGN_OUT_USER:
      return {
        ...state, authenticated: false
      };
    default:
      return state;
  }
}