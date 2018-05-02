
import { STEPPER_NEXT_STEP,
        STEPPER_BACK_STEP, 
        STEPPER_RESET_STEP,
		STEPPER_EXPAND_PANEL,
        STEPPER_CONTRACT_PANEL, } from '../actions/stepper';


const initialState =  {
  panels:['panel1'],
  stepId:0,
  expanded:null,
};

export default function stepper(state = initialState, action) {

  switch (action.type) {
    case STEPPER_EXPAND_PANEL:

      if(!state.panels.filter(val=> val === action.payload.panelId).length){
        let panels = state.panels.concat(action.payload.panelId)
        return {...state, panels, expanded:action.payload.panelId}
      }
      return {
        ...state, expanded:action.payload.panelId
      };

    case STEPPER_CONTRACT_PANEL:
        
        
      
        let panels = state.panels.filter(val=> val !== action.payload.panelId);
        
        return {
            ...state, panels, expanded:false
        };

    case STEPPER_NEXT_STEP:
      const { step } = action.payload;
      return {
        ...state, stepId: state.stepId + step , expanded:null
      };
    case STEPPER_RESET_STEP:
      
      return {
        ...state, stepId: 0, expanded:null
      };
    
    default:
      return state;
  }
}