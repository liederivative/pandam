import { CREATE_CLIENT, 
		UPDATE_CLIENT,
        GET_LOANS,
        SET_SELECTOR,
        SET_LOANS,
        SET_DATE,
        SET_INDEXES,
        SET_ROWSPERPAGE,
        SET_PAGE,
        SET_SUBCRIPTION,
        SET_SORTING,
        SET_DETAIL,
        SET_SUBMENU,
        STORE_ID_LOAN
	} from '../actions/clients';
import moment from '../utils/date';

const initialState =  {
  listOfClients:[],
  lastLoanCreated:'',
  disabled: [],
  selector:{},
  unsubcribe:0,
  addDate:1,
  dates:[moment().subtract(7,'days'), moment().add(1, 'days')],
  indexes:[null],
  rowsPerPage:5,
  page:0,
  query:0,
  sorting:[],
  detail:false,
  submenu:0,
};

export default function clients(state = initialState, action) {

  switch (action.type) {

    case UPDATE_CLIENT:
      console.log(action.payload)
      return {
        ...state
      };
    case 'GET_LIST_CLIENT_FULFILLED':

        return {
      ...state, listOfClients: action.payload.data
    };
    case STORE_ID_LOAN:

        return {
      ...state, lastLoanCreated: action.payload
    };
    case SET_LOANS:

        return {
      ...state, listOfClients: action.payload
    };
    case SET_SUBMENU:

        return {
      ...state, submenu: action.payload
    };
    case SET_DETAIL:

        return {
      ...state, detail: action.payload
    };
    case SET_SELECTOR:
        const {query,unsubcribe,addDate} = action.payload;
        return {
      ...state, selector: query, unsubcribe, addDate
    };
    case SET_DATE:

        return {
      ...state, dates: action.payload
    };
    case SET_DATE:

        return {
      ...state, detail: action.payload
    };
    case SET_ROWSPERPAGE:

        return {
      ...state, rowsPerPage: action.payload
    };
    case SET_PAGE:

        return {
      ...state, page: action.payload
    };
    case SET_INDEXES:

        return {
      ...state, indexes: action.payload
    };
    case SET_SORTING:

        return {
      ...state, sorting: action.payload
    };

    case 'DISABLE_FIELDS':

      return {
        ...state, disabled: action.payload
      };
    case 'CLEAR_DISABLED_FIELDS':

    return {
      ...state, disabled: []
    };

    default:
      return state;
  }
}