import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../../actions';
import { Field, reduxForm ,formValueSelector , getFormSyncErrors  } from 'redux-form';

import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';

import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';


import Icon from 'material-ui/Icon';

import Divider from 'material-ui/Divider';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import validate from './validate';
import renderField from './renderField';

import Paper from 'material-ui/Paper';

import scrollToInvalid from './scrollToInvalid';
import {upper, normalizePhone,onlyNums,parseOnBlur, onlyDigits,nationalID} from '../../../../utils/normalizer';
import {estadoCivil,local} from '../../../../utils/const';
import { formNames } from '../../../../utils/const';

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
 })
class CreateClientsContent extends Component {
  
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
        
    };
    

  render() {
    const { classes, guarantor_place_status ,guarantor_marital_status,expanded, errors} = this.props;
    // console.log(this.props)

    return(
    <form  name={formNames.Clients} onSubmit={this.props.handleSubmit(this.handleFormSubmit).bind(this)}>
      	<Grid container alignItems={'center'}
            direction={'row'}
            justify={'space-around'} spacing={0} className={classes.root}>
            
            
            <Grid item xs={12}>
                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')} >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Grid container direction={'row'} >
                            <Grid item>
                                <Icon >face</Icon>
                            </Grid>
                            <Grid item>
                                <Typography variant="title" color="inherit" noWrap>
                                Datos del Fiador
                                </Typography>
                            </Grid>
                        </Grid>
                    </ExpansionPanelSummary>
                    { (expanded === 'panel1') && <ExpansionPanelDetails>
                        <Grid container direction={'row'} alignItems={'center'} justify={'space-around'}>
                            
                            <Grid item>
                                <Field name="guarantor_name" component={renderField} 
                                      classess={classes} type="text" syncerrors={errors} 
                                      label="Nombre(s) y Apellido(s)" icon="perm_identity" normalize={upper}/>
                            </Grid>
                            <Grid item>
                                <Field name="guarantor_age" component={renderField} 
                                       classess={classes} type="text" syncerrors={errors} 
                                       onBlur={ e=>parseOnBlur(e,this) }
                                       label="Edad" icon="perm_identity" normalize={onlyNums}/>
                            </Grid>
                            <Grid item>
                                <Field name="guarantor_national_id" component={renderField} 
                                       classess={classes} type="text" syncerrors={errors} 
                                       label="Cédula" icon="perm_identity" normalize={nationalID}/>
                            </Grid>
                            <Grid item>
                                <Field name="guarantor_address" component={renderField} 
                                      classess={classes} type="text" syncerrors={errors} 
                                      label="Dirección"  normalize={upper}/>
                            </Grid>
                            <Grid item>
                                <Field name="guarantor_marital_status" component={renderField} 
                                       classess={classes} type="select" array={estadoCivil} 
                                       label="Estado Civil"  />
                            </Grid>
                            <Grid item>
                                <Field name="guarantor_place_status" component={renderField} 
                                       classess={classes} type="select" array={local}
                                       label="Local"  />
                            </Grid>
                            <Grid item>
                                <Field disabledProps={!guarantor_place_status || guarantor_place_status === 2} 
                                        name="guarantor_rent_price" component={renderField} 
                                        onBlur={ e=>parseOnBlur(e,this) }
                                       classess={classes} type="text" syncerrors={errors} normalize={onlyDigits}
                                       label="Precio Alquiler"  />
                            </Grid>
                            <Grid item>
                                <Field name="guarantor_business_name" component={renderField} 
                                       classess={classes} type="text" syncerrors={errors} normalize={upper}
                                       label="Nombre Negocio"  />
                            </Grid>
                            <Grid item>
                                <Field name="guarantor_business_phone" component={renderField} 
                                       classess={classes} type="text" syncerrors={errors} normalize={normalizePhone}
                                       label="Teléfono Negocio"  />
                            </Grid>
                            <Grid item>
                                <Field name="guarantor_business_address" component={renderField} 
                                       classess={classes} type="text" syncerrors={errors} normalize={upper}
                                       label="Dirección Negocio"  />
                            </Grid>
                            <Grid item>
                                <Field name="guarantor_business_owner" component={renderField} 
                                       classess={classes} type="text" syncerrors={errors} normalize={upper}
                                       label="Propietario del Negocio"  />
                            </Grid>
                            
                        </Grid>
                    </ExpansionPanelDetails>}

                </ExpansionPanel>

            </Grid>
            <Grid item xs={12}>
                <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Grid container direction={'row'} >
                            <Grid item>
                                <Icon >assignment_ind</Icon>
                            </Grid>
                            <Grid item>
                                <Typography variant="title" color="inherit" noWrap>
                                Referencia Personales del Fiador
                                </Typography>
                            </Grid>
                        </Grid>
                    </ExpansionPanelSummary>
                    {(expanded === 'panel2') && <ExpansionPanelDetails>
                        <Grid container direction={'row'} alignItems={'center'} justify={'space-around'}>
                            
                            <Grid item>
                                <Field name="guarantor_ref1_name" component={renderField} 
                                      classess={classes} type="text" 
                                      label="Nombre(s) y Apellido(s) Referencia1"  normalize={upper}/>
                            </Grid>
                            <Grid item>
                                <Field name="guarantor_ref1_address" component={renderField} 
                                       classess={classes} type="text" 
                                       label="Dirección Referencia1" normalize={upper}/>
                            </Grid>
                            <Grid item>
                                <Field name="guarantor_ref1_phone" component={renderField} 
                                       classess={classes} type="text" 
                                       label="Teléfono Referencia1"  normalize={normalizePhone}/>
                            </Grid>
                            <Grid item>
                                <Field name="guarantor_ref2_name" component={renderField} 
                                      classess={classes} type="text" 
                                      label="Nombre(s) y Apellido(s) Referencia2"  normalize={upper}/>
                            </Grid>
                            <Grid item>
                                <Field name="guarantor_ref2_address" component={renderField} 
                                       classess={classes} type="text" 
                                       label="Dirección Referencia2" normalize={upper}/>
                            </Grid>
                            <Grid item>
                                <Field name="guarantor_ref2_phone" component={renderField} 
                                       classess={classes} type="text" 
                                       label="Teléfono Referencia2"  normalize={normalizePhone}/>
                            </Grid>
                            
                            
                        </Grid>
                    </ExpansionPanelDetails>}

                </ExpansionPanel>

            </Grid>
      	</Grid>
    </form>

      )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...Actions.stepper,...Actions.loading}, dispatch);
}

let stylesThemeComponent= withStyles(styles)(CreateClientsContent);
let FormFields = reduxForm({ form: formNames.Clients,                         
                             destroyOnUnmount: false,
                             forceUnregisterOnUnmount: true, 
                             validate:(v)=>validate(v,requiredFields),
                             onSubmitFail: (errors,dispatch,submitError,props) => {scrollToInvalid({errors,dispatch,props},formNames.Clients)},
                           })(stylesThemeComponent)

const selector = formValueSelector(formNames.Clients)

const mapStateToProps = (state) => {
  const { guarantor_marital_status,
            guarantor_place_status,
             } = selector(state, 
        'guarantor_marital_status',
        'guarantor_place_status',

    )
    const {panels,expanded} = state.stepper;
    return {
    authenticated: state.auth.authenticated,
    loading: state.loading.loading,
    guarantor_marital_status,
    guarantor_place_status,
    panels,
    expanded,
    errors: getFormSyncErrors(formNames.Clients)(state)
  };
};

const WizardGuarantor = connect(mapStateToProps,mapDispatchToProps)(FormFields);

export default WizardGuarantor ;