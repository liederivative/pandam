import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { Field, reduxForm ,getFormValues  } from 'redux-form';
import moment from '../../utils/date';
import math from '../../utils/math';

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
import validate from '../Clients/Create/ContentStepper/validate';
import renderField from '../Clients/Create/ContentStepper/renderField';

import Paper from 'material-ui/Paper';
import DatePicker from 'rc-calendar/lib/Picker';
import Calendar from 'rc-calendar';
import Input, { InputLabel } from 'material-ui/Input';

import {upper, normalizePhone,onlyNums, parseOnBlur, onlyDigits,nationalID} from '../../utils/normalizer';
import {loanFrequency,loanMapping,gastoCierre} from '../../utils/const';

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
    componentWillUnmount(){
    	console.log('unmounting ...')
    }
    componentDidMount(){
    	const {initializeForm, initValues, formName} = this.props;
    	
    	initializeForm(initValues)
    }

    calculateEndTime=()=>{
        let {loan_type,loan_start_date} = this.props;
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
        const {loan_type, loan_rate,loan_amount, loan_gasto_cierre, loan_applied_cierre } = this.props;
        console.log(this.props)
        if(loanMapping[loan_type]){
        let freq =  loanMapping[loan_type][0];

        let amount = loan_amount;

        if(!loan_applied_cierre) amount = math.Big(amount).plus(loan_gasto_cierre); 

        return math.calcTotalFee( amount,loan_rate, freq )
    	}else{return 0}
    }
  render() {
    const { classes,expanded,loan_rate,loan_amount,loan_type,
                loan_gasto_cierre,loan_applied_cierre, form} = this.props;
    
    const sumLoan = math.sumRate( loan_amount, loan_rate );
    console.log(sumLoan)
    return(
    <form onSubmit={this.props.handleSubmit(this.handleFormSubmit).bind(this)}>
	    <Paper>
	      	<Grid container alignItems={'center'}
	            direction={'row'}
	            justify={'flex-start'} spacing={0} className={classes.root}>
	          
	            
	            <Grid item xs={12} >
	                <Grid container>
	                    <Grid item xs={6}>
	                        <div className="make-space-sizes">   
	                            <Field name="loan_type"  component={renderField} 
	                                  type="select" array={loanFrequency}
	                                  label="Préstamo" />
	                        </div>
	                        <div style={{padding:'0 30px'}}>
	                            <Field name="loan_amount" component={renderField} 
	                                  type="text" normalize={onlyDigits}
	                                  onBlur={ e=>parseOnBlur(e,this) }
	                                  label="Monto Préstamo" value={0.0} startAdornment={
	                                                <InputAdornment position="start">RD$</InputAdornment>
	                                } />
	                        </div>
	                        <div style={{padding:'0 30px'}}>
	                            <Field name="loan_gasto_cierre" component={renderField} 
	                                  type="text" normalize={onlyDigits}
	                                  onBlur={ e=>parseOnBlur(e,this) }
	                                  label="Gasto Cierre" value={0.0} startAdornment={
	                                                <InputAdornment position="start">RD$</InputAdornment>
	                                } />
	                        </div>
	                        <div className="make-space-sizes">   
	                            <Field name="loan_applied_cierre"  component={renderField} 
	                                  type="select" array={gastoCierre}
	                                  label="Aplicar cierre" />
	                        </div>
	                        <div style={{padding:'0 30px'}}>
	                            <Field name="loan_rate" style={{width:150}} component={renderField} 
	                                  className={classes.selectEmpty} type="text" 
	                                  onBlur={ e=>parseOnBlur(e,this) } normalize={onlyDigits}
	                                  label="Tasa Préstamo" value={2.0} endAdornment={
	                                                <InputAdornment position="end">%</InputAdornment>
	                                } />
	                        </div>
	                        <div style={{padding:'0 30px'}}>
	                            <Field name="loan_start_date" component={renderField} 
	                                  type="date"   defaultValue={ moment() } value={moment()}
	                                  disabledDate={(current)=>current.startOf('day').isBefore(moment().startOf('day'))}
	                                  endAdornment={
	                                                <InputAdornment position="end"><Icon >today</Icon></InputAdornment>
	                                    }
	                                  label="Inicio Préstamo" animation="slide-up"  />
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
	                                <Typography>{`RD$ ${ (loan_applied_cierre)? sumLoan: `${math.Big(sumLoan).plus(loan_gasto_cierre?loan_gasto_cierre:0)}`  }` }</Typography>
	                                { (loan_applied_cierre)?<Typography>
	                                    {` + Cierre RD$ ${ loan_gasto_cierre }` }
	                                    </Typography>:null}
	                            </div>
	                            <div className="make-space-around">
	                                <div className={classes.typo}>Monto de cuotas pagar</div>
	                                <Typography>{`RD$ ${this.calculatePayments()}` }</Typography>
	                            </div>
	                            <div className="make-space-around">
	                                <div className={classes.typo}>Cantidad de cuotas</div>
	                                <Typography>{`${(loanMapping[loan_type])?loanMapping[loan_type][0]:0}` }</Typography>
	                            </div>
	                        </Paper>
	                        
	                    </Grid>
	                    
	                </Grid>

	                
	                    
	            </Grid>

	            
	            
	            
	            <Grid item xs={12}>
	                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')} >
	                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
	                        <Grid container direction={'row'} >
	                            <Grid item>
	                                <Icon >bookmark_border</Icon>
	                            </Grid>
	                            <Grid item>
	                                <Typography variant="title" color="inherit" noWrap>
	                                Descripcón de garantía
	                                </Typography>
	                            </Grid>
	                        </Grid>
	                    </ExpansionPanelSummary>
	                    <ExpansionPanelDetails>
	                        <Grid container direction={'row'} alignItems={'center'} justify={'space-around'}>
	                            
	                            <Grid item>
	                                <Field name="loan_warranty_description" rows="5" cols="80"
	                                      component={renderField} type="textarea" 
	                                      className={classNames(classes.description,classes.typo)}
	                                      placeholder="Describir artículo(s)" normalize={upper}/>
	                            </Grid>
	                            
	                            
	                            
	                        </Grid>
	                    </ExpansionPanelDetails>

	                </ExpansionPanel>

	            </Grid>

	      	</Grid>
	    </Paper>    	
    </form>

      )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...Actions.stepper,...Actions.loading, ...Actions.clients}, dispatch);
}

let stylesThemeComponent= withStyles(styles)(LoanWizard);
let BaseLoan = reduxForm({ 
                             
                             validate:(v)=>validate(v,requiredFields),
                           })(stylesThemeComponent)

// const selector = formValueSelector('createClients')

const mapStateToProps = (state, props) => {
	const {formName} = props;
	console.log(formName)
	
  // const { loan_start_date,
  //         loan_type,
  //         loan_amount,
  //         loan_rate,
  //         loan_gasto_cierre,
  //         loan_applied_cierre
  //            } = selector(state, 
  //       'loan_start_date',
  //       'loan_type',
  //       'loan_amount',
  //       'loan_rate',	
  //       'loan_gasto_cierre',
  //       'loan_applied_cierre'

  //   )
    const {panels,expanded} = state.stepper;
    return {
    authenticated: state.auth.authenticated,
    loading: state.loading.loading,
    form:formName,
    ...getFormValues(formName)(state),
    panels,
    expanded,
    // loan_start_date,
    // loan_type,
    // loan_amount,
    // loan_rate,
    // loan_gasto_cierre,
    // loan_applied_cierre
  };
};



export default connect(mapStateToProps,mapDispatchToProps)(BaseLoan);