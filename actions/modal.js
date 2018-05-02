export const MODAL_OPEN_MODAL = 'MODAL_OPEN_MODAL';
export const MODAL_CLOSE_MODAL = 'MODAL_OPEN_MODAL';
export const MODAL_ANSWERED_YES = 'MODAL_ANSWERED_YES';
export const MODAL_ANSWERED_NO = 'MODAL_ANSWERED_NO';

import {createModal} from '../modal/modal'


export function openModalState(info){
	return{
        type: MODAL_OPEN_MODAL,
        payload:info
    }
}



export function openModal(info) {

    return (dispatch, getState) => {
    			createModal('renderer',info);
			    dispatch(openModalState(info));
			  };
}

export function closeModal() {
    return {
        type: MODAL_CLOSE_MODAL
    }
}