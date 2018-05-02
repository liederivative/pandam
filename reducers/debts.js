import {
 ADD_EXPENSES, 
 GET_LIST_EXPENSES, 
 SET_UNSUBSCRIBE, 
 SET_DATES,
 SET_ROWS,
 SET_PAGE,
 SET_INDEXES,
  } from '../actions/debts';

import moment from '../utils/date';

const initialState =  {
  data: [],
  indexes:[null],
  rowPerPage:5,
  page:0,
  sortField:'expense_date',
  dates:[moment().subtract(7,'days'), moment().add(1, 'days')],
};

export default function debts(state = initialState, action) {

  

  switch (action.type) {
    
    case GET_LIST_EXPENSES:
      const data = action.payload;
      let dataIndexes = data.map(e=>e[state.sortField]); 

      let indexes = state.indexes.concat(dataIndexes[ dataIndexes.length - 1 ])
      indexes = [...new Set(indexes)];
      if(state.dates[1].toISOString() < indexes[ indexes.length - 1 ]){
        indexes[0] = state.dates[1].toISOString();
      }
      console.log(state)
      if(state.indexes[0] === null){
        indexes = [state.dates[1].toISOString(), dataIndexes[ dataIndexes.length - 1 ]];
      }
      // let indexes = (  dataIndexes[0] === dataIndexes[ dataIndexes.length - 1 ] )? [ state.indexes[0], dataIndexes[0]]:[ dataIndexes[0], dataIndexes[ dataIndexes.length - 1 ] ]
      return {
        
        ...state, data, indexes
    };
    case SET_PAGE:
    
      return {
        
        ...state, page:action.payload
    };
    case SET_INDEXES:
    
      return {
        
        ...state, page:0, indexes:action.payload
    };
    case SET_ROWS:
    
      return {
        
        ...state, rowPerPage:action.payload
    };
    case SET_DATES:
      const dates = action.payload;
      
      const startDate = dates[0].fromDRtoISO().startOf('day');
      const endDate = dates[1].fromDRtoISO().endOf('day');
  
      return {
        
        ...state, dates:[startDate, endDate]
    };
    
    
    default:
      return state;
  }
}