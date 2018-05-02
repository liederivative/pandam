import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Button from 'material-ui/Button';

import Typography from 'material-ui/Typography';

import Clients from './ContentStepper/Clients';
import Guarantor from './ContentStepper/Guarantor';
import Loan from './ContentStepper/Loan';
import FinishIt from './ContentStepper/FinishIt';
import SuccessCheck from '../../animations/SuccessCheck';
import { submit, reset, destroy, isSubmitting ,getFormSyncErrors,getFormAsyncErrors } from 'redux-form';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../../actions';
import classNames from 'classnames';
import { formNames } from '../../../utils/const';

import PrintButton from '../../custom/PrintButton';

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  center:{
    textAlign:'center'
  },
  height:{
    height:390,
  },
  buttonProgress: {
    color: 'blue',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

function getSteps() {
  return ['Datos Cliente', 'Datos Fiador', 'Datos Préstamo','Crear Solicitud Préstamo'];
}
const getStepContent = (step,handler)=> {
      switch (step) {
        case 0:
          return <Clients onSubmit={()=>{} } />;
        case 1:
          return <Guarantor onSubmit={()=>{} }/>;
        case 2:
          return <Loan onSubmit={()=>{}} formName={formNames.Clients}></Loan>;
        default:
          return <FinishIt onSubmit={handler}></FinishIt>;
      }
    }


class HorizontalLinearStepper extends React.Component {
    static propTypes = {
        classes: PropTypes.object,
    };

    state = {
        // activeStep: 0,
        skipped: new Set(),
    }

    isStepOptional = step => {
        return step === 4;
    }

    
    handleOnSubmit = (v)=>{

        const {createClient} = this.props;

        
        // console.log(this.props)
    }
    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }
    checkIfItIsPossible = ()=>{
        

        const { syncErrors } = this.props;
        console.log(syncErrors);
        const {stopLoading,expandPanel} = this.props;

        if(Object.keys(syncErrors).length !== 0 ) {
            expandPanel('panel1');
            // stopLoading();
            return true;
        }
        // stopLoading();
        return false;
    }
    handleNext = () => {
        console.log(this.props)
        const {startLoading,changeStep, activeStep, createClient, reset, submit,destroy } = this.props;

        // startLoading();
        submit(formNames.Clients);

        if (this.checkIfItIsPossible()) return
            // this.props.dispatch(destroy('createClients'));

        // const { activeStep } = this.state;
        console.log(activeStep, getSteps().length - 1 )

        if (activeStep === (getSteps().length - 1) ){ createClient(); destroy([formNames.Clients]) }

        let { skipped } = this.state;
        if (this.isStepSkipped(activeStep)) {
          skipped = new Set(skipped.values());
          skipped.delete(activeStep);
        }

        changeStep(1);

        this.setState({
          // activeStep: activeStep + 1,
          skipped,
        });
    };

    handleBack = () => {
        this.props.startLoading();
        if (this.checkIfItIsPossible()) return

        this.props.backStep(-1);

        const { activeStep } = this.props;
        // this.setState({
        //   activeStep: activeStep - 1,
        // });
    };

    handleSkip = () => {
        const { activeStep } = this.props;
        if (!this.isStepOptional(activeStep)) {
          // You probably want to guard against something like this,
          // it should never occur unless someone's actively trying to break something.
          throw new Error("You can't skip a step that isn't optional.");
        }
        const skipped = new Set(this.state.skipped.values());
        skipped.add(activeStep);
        this.props.changeStep(1);
        this.setState({
          // activeStep: this.state.activeStep + 1,
          skipped,
        });
        };

        handleReset = () => {
            this.props.resetStep();
        // this.setState({
        //   activeStep: 0,
        // });
    };

    render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep,loading, submitting ,lastLoanCreated } = this.props;
    
    return (
      <div className={classes.root}>
      
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            if (this.isStepOptional(index)) {
              labelProps.optional = <Typography variant="caption">Optional</Typography>;
            }
            if (this.isStepSkipped(index)) {
              props.completed = false;
            }
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
                <div style={{'background':'white'}} className={classes.height}>
                    <div style={{'paddingTop':40}}>
                        <SuccessCheck></SuccessCheck>
                        
                    </div>
                  <Typography className={classNames(classes.instructions,classes.center,'make-space-around') }>
                    Solicitud fue procesada, solo falta ser aprobada.
                  </Typography>
                      <div style={{textAlign:'center'}}>
                          <PrintButton></PrintButton>
                      </div>

                </div>
                
              <Button onClick={this.handleReset} className={classes.button}>
                Volver Inicio
              </Button>
            </div>
          ) : (
            <div>
              <div style={{overflowY:'scroll',overflowX: 'hidden',height:390}} className={classes.height}>
                    {getStepContent(activeStep,this.handleOnSubmit)}
              </div>
              <div>
                <Button
                  disabled={activeStep === 0 || submitting}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                {this.isStepOptional(activeStep) && (
                  <Button
                    variant="raised"
                    color="primary"
                    onClick={this.handleSkip}
                    className={classes.button}
                  >
                    Skip
                  </Button>
                )}
                <Button
                  variant="raised"
                  color="primary"
                  type="submit"
                  form={formNames.Clients}
                  disabled={submitting}
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
    }
}

const StepperComponent = withStyles(styles)(HorizontalLinearStepper);
function mapDispatchToProps(dispatch) {
    // const customActions ={
    //     submit: ()=>{
    //         return submit('createClients')
    //     }
    // }
    return bindActionCreators({...Actions.loading,
                            ...Actions.stepper,  ...Actions.clients, reset ,submit, destroy },dispatch);
}
const mapStateToProps = (state)=>{
    return {...state,
            syncErrors: {...getFormSyncErrors(formNames.Clients)(state), ...getFormAsyncErrors(formNames.Clients)(state)},
            submitting: isSubmitting(formNames.Clients)(state),
            activeStep:state.stepper.stepId,
            loading:state.loading.loading,
            lastLoanCreated:state.clients.lastLoanCreated,
        } 
}

export default connect(mapStateToProps,mapDispatchToProps)(StepperComponent);