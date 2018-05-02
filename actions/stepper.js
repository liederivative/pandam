export const STEPPER_NEXT_STEP = 'STEPPER_NEXT_STEP';
export const STEPPER_BACK_STEP = 'STEPPER_BACK_STEP';
export const STEPPER_RESET_STEP = 'STEPPER_RESET_STEP';

export const STEPPER_EXPAND_PANEL = 'STEPPER_EXPAND_PANEL';
export const STEPPER_CONTRACT_PANEL = 'STEPPER_CONTRACT_PANEL';

export function expandPanel(panelId) {
    return {
        type: STEPPER_EXPAND_PANEL,
        payload:{
            panelId
        },
        meta:{
        	scope:'local'
        }
    }
}
export function contractPanel(panelId) {
    return {
        type: STEPPER_CONTRACT_PANEL,
        payload:{
            panelId
        },
        meta:{
            scope:'local'
        }
    }
}
export function changeStep(stepId) {
    return {
        type: STEPPER_NEXT_STEP,
        payload:{
            step:1
        },
        meta:{
        	scope:'local'
        }
    }
}
export function backStep(stepId) {
    return {
        type: STEPPER_NEXT_STEP,
        payload:{
            step:-1
        },
        meta:{
            scope:'local'
        }
    }
}
export function resetStep(stepId) {
    return {
        type: STEPPER_RESET_STEP,
        
        meta:{
            scope:'local'
        }
    }
}