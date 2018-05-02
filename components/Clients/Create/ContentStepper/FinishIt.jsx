import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../../actions';
import { Field, reduxForm ,getFormValues  } from 'redux-form';
import moment from '../../../../utils/date';
import math from '../../../../utils/math';
import '../../../../utils/helpers';

import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';

import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';


import Icon from 'material-ui/Icon';
import { InputAdornment } from 'material-ui/Input';
import Divider from 'material-ui/Divider';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import validate from './validate';
import renderField from './renderField';

import Paper from 'material-ui/Paper';
import DatePicker from 'rc-calendar/lib/Picker';
import Calendar from 'rc-calendar';
import Input, { InputLabel } from 'material-ui/Input';

import {upper, normalizePhone,onlyNums, onlyDigits,nationalID} from '../../../../utils/normalizer';
import {loanFrequency,loanMapping, formNames} from '../../../../utils/const';


const requiredFields = [
    // 'guarantor_name',
    

  ]


const styles = theme => ({

	margin: {
    	margin: theme.spacing.unit,
 	 },
    textField: {
        flexBasis: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    root: {
        flexGrow: 1,
    },
    typo:theme.typography.button,
    description: {
        resize: 'none',
    }
 })
class LoanWizard extends React.Component {
  
    state = {
    	search:''
    }

    handleOnChange = prop => event => {
    	this.setState({ [prop]: event.target.value })
    }
    handleSelect = event => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleFormSubmit = (values) => {
        console.log(values)

        // this.props.startLoading();
      }
    handleChange = panel => (event, expanded) => {

        (expanded)?this.props.expandPanel(panel):this.props.contractPanel(panel);
        
    }
    handleCalendar = (event) => {

        console.log(event)
        
    }

    calculateEndTime=()=>{
        const {formValues} = this.props;
        let {loan_type,loan_start_date} = formValues;
        if(!loan_start_date) return;
        loan_start_date = moment(loan_start_date);
        let end_date;
        if(loanMapping[loan_type]){
            let freq =  loanMapping[loan_type][0];
            let period =  loanMapping[loan_type][1];


            end_date = (loan_type === 0 )?loan_start_date.getNextWorkDays(freq):loan_start_date.add(freq,period )
        }
        
        return end_date.format('DD-MMM-YYYY')
    }
    calculatePayments=()=>{
        const {formValues} = this.props;
        const {loan_type, loan_rate,loan_amount, loan_gasto_cierre, loan_applied_cierre } = formValues;

        let freq =  loanMapping[loan_type][0];

        let amount = loan_amount;

        if(!loan_applied_cierre) amount = math.Big(amount).plus(loan_gasto_cierre); 

        return math.calcTotalFee( amount,loan_rate, freq )
    }
  render() {
    const { classes,expanded, formValues } = this.props;
    const {loan_rate,loan_amount,loan_type,loan_applied_cierre, loan_gasto_cierre} = formValues;
    console.log(formValues)
    const sumLoan = math.sumRate( loan_amount, loan_rate );
    
    return(
    <form  name={formNames.Clients} onSubmit={this.props.handleSubmit(this.handleFormSubmit).bind(this)}>
    <Paper>
      	<Grid container alignItems={'center'}
            direction={'row'}
            justify={'flex-start'} spacing={0} className={classes.root}>
            
            
            <Grid item xs={12}>
                <Grid container style={{ padding: 10 }} alignItems={'center'} justify={'center'} spacing={8}>
                    <Grid item >
                        <Typography variant="subheading">Resumen de Solicitud de Préstamo</Typography>
                    </Grid>
                </Grid>
            </Grid>
            
            <Grid item xs={12} >
                <Grid container>
                    <Grid item xs={6}>

                       <div className="make-space-around">
                            <div className={classes.typo}>Cliente</div>
                            <Typography>{`${formValues.first_name} ${formValues.first_surname}`}</Typography>
                        </div>
                        <div className="make-space-around">
                            <div className={classes.typo}>Dirección Cliente</div>
                            <Typography>{formValues.address }</Typography>
                        </div>
                        <div className="make-space-around">
                            <div className={classes.typo}>Cédula</div>
                            <Typography>{`${formValues.national_id}` }</Typography>
                        </div> 
                        <div className="make-space-around">
                            <div className={classes.typo}>Tipo de Prestamo</div>
                            <Typography>{ loanFrequency.find((r)=>{return r.value === loan_type}).text }</Typography>
                        </div>

                    </Grid>
                    <Grid item xs={6}>
                        <Paper>

                            <div className="make-space-around">
                                <div className={classes.typo}>Fecha Final Préstamo</div>
                                <Typography>{this.calculateEndTime()}</Typography>
                            </div>
                            <div className="make-space-around">
                                <div className={classes.typo}>Monto total que deberá pagar</div>
                                <Typography>{`RD$ ${ (loan_applied_cierre)? sumLoan: `${math.Big(sumLoan).plus(loan_gasto_cierre)}`  }` }</Typography>
                                { (formValues.loan_applied_cierre)?<Typography>
                                    {` + Cierre RD$ ${ formValues.loan_gasto_cierre }` }
                                    </Typography>:null}
                            </div>
                            <div className="make-space-around">
                                <div className={classes.typo}>Monto de cuotas pagar</div>
                                <Typography>{`RD$ ${this.calculatePayments()}` }</Typography>
                            </div>
                            <div className="make-space-around">
                                <div className={classes.typo}>Cantidad de cuotas</div>
                                <Typography>{`${loanMapping[loan_type][0]}` }</Typography>
                            </div>
                        </Paper>
                        
                    </Grid>
                    
                </Grid>

                
                    
            </Grid>

            <Grid item xs={12}>
                <Grid container >
                    <Grid item xs={6}>

                       <div className="make-space-around">
                            <div className={classes.typo}>Fiador</div>
                            <Typography>{formValues.guarantor_name}</Typography>
                        </div>
                        <div className="make-space-around">
                            <div className={classes.typo}>Referencias Personales</div>
                            <Typography>{ formValues.guarantor_ref1_name }</Typography>
                            <Typography>{ formValues.guarantor_ref2_name }</Typography>
                        </div>

                    </Grid>
                    <Grid item xs={6}>

                       <div className="make-space-around">
                            <div className={classes.typo}>Edad Fiador</div>
                            <Typography>{formValues.guarantor_age}</Typography>
                        </div>
                        <div className="make-space-around">
                            <div className={classes.typo}>Negocio Fiador</div>
                            <Typography>{ formValues.guarantor_business_name }</Typography>
                            <Typography>{ (formValues.guarantor_business_phone)?`Tel:. ${formValues.guarantor_business_phone}`:undefined }</Typography>
                        </div>
                        

                    </Grid>
                    <Grid item xs={12}>
                        <div className="make-space-around">
                            <div className={classes.typo}>Garantia</div>
                            <Typography>{formValues.loan_warranty_description }</Typography>
                        </div> 
                    </Grid>

                </Grid>
                

            </Grid>

      	</Grid>
    </Paper>
    </form>

      )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...Actions.stepper,...Actions.loading}, dispatch);
}

let stylesThemeComponent= withStyles(styles)(LoanWizard);
let FormFields = reduxForm({ form: formNames.Clients,
                             destroyOnUnmount: false,
                             forceUnregisterOnUnmount: true, 
                             validate:(v)=>validate(v,requiredFields),
                           })(stylesThemeComponent)


const mapStateToProps = (state) => {

    const {panels,expanded} = state.stepper;
    return {
    authenticated: state.auth.authenticated,
    loading: state.loading.loading,
    panels,
    expanded,
    formValues: getFormValues(formNames.Clients)(state)
  };
};

const WizardGuarantor = connect(mapStateToProps,mapDispatchToProps)(FormFields);

export default WizardGuarantor ;