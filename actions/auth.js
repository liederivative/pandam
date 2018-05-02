export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';

export function signInUser() {
	// GET USER NAME, ROLE, MODULES : [0,1,2]
	// return function(dispatch) {
 //    request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`).then(response => {
 //      dispatch({
 //        type: REQUEST_GIFS,
 //        payload: response
 //      });
 //    });
    return {
        type: SIGN_IN_USER,
        meta:{
        	scope:'local'
        }
    }
}

export function signOutUser() {
    return {
        type: SIGN_OUT_USER,
        meta:{
        	scope:'local'
        }
    }
}