import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../../actions';
import { Field, reduxForm ,formValueSelector, getFormSyncErrors  } from 'redux-form';
import moment from '../../../../utils/date';

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
import scrollToInvalid from './scrollToInvalid';

import Paper from 'material-ui/Paper';

import {upper, normalizePhone, parseOnBlur, onlyNums, onlyDigits,nationalID} from '../../../../utils/normalizer';
import {estadoCivil,local} from '../../../../utils/const';
import { formNames } from '../../../../utils/const';
import asyncValidate from './asyncValidate';

const requiredFields = [
    'first_name',
    // 'second_name',
    'first_surname',
    // 'second_surname',
    'national_id',
    'phone',
    'sector',
    'city',
    'address',
    'marital_status',

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
    	search:'',
        _expanded: null,

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
        // console.log(expanded);
        (expanded)?this.props.expandPanel(panel):this.props.contractPanel(panel);
        // this.setState({
        //   _expanded: expanded ? panel : false,
        // });
    };
    

    

  render() {
    // console.log(this.props)
    const { classes,  place_status, marital_status,
            business_place_status, onSubmit,expanded,
            errors,disabledFields  } = this.props;
    onSubmit(this.handleSubmit);
    // const {expanded} = this.state;
    return(
    <form  name={formNames.Clients} onSubmit={this.props.handleSubmit(this.handleFormSubmit).bind(this)}>
      	<Grid container alignItems={'center'}
            direction={'row'}
            justify={'space-around'} spacing={0} className={classes.root}>
            
            <Grid item xs={12}>
                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                        <Grid container direction={'row'} >
                            <Grid item>
                                <Icon >perm_identity</Icon>
                            </Grid>
                            <Grid item>
                                <Typography variant="title" color="inherit" noWrap>
                                Datos de Cliente
                                </Typography>
                            </Grid>
                        </Grid>
                        
                    </ExpansionPanelSummary>
                    { (expanded === 'panel1') && <ExpansionPanelDetails>
                        <Grid container direction={'row'} alignItems={'center'} justify={'space-around'}>
                            
                            <Grid item>
                                <Field name="first_name" component={renderField} 
                                      classess={classes} type="text" syncerrors={errors} arraydis={disabledFields}
                                      label="Primer Nombre" icon="perm_identity" normalize={upper}/>
                            </Grid>
                            <Grid item>
                                <Field name="second_name" component={renderField} 
                                       classess={classes} type="text" syncerrors={errors} arraydis={disabledFields}
                                       label="Segundo Nombre" icon="perm_identity" normalize={upper}/>
                            </Grid>
                            <Grid item>
                                <Field name="first_surname" component={renderField} 
                                       classess={classes} type="text" syncerrors={errors} arraydis={disabledFields}
                                       label="Primer Apellido" icon="perm_identity" normalize={upper}/>
                            </Grid>
                            <Grid item>
                                <Field name="second_surname" component={renderField} 
                                       classess={classes} type="text" syncerrors={errors} arraydis={disabledFields}
                                       label="Segundo Apellido" icon="perm_identity" normalize={upper}/>
                            </Grid>
                            <Grid item>
                                <Field name="address" component={renderField} 
                                       classess={classes} type="text" syncerrors={errors} arraydis={disabledFields}
                                       label="Dirección" icon="perm_identity" normalize={upper}/>
                            </Grid>
                            <Grid item>
                                <Field name="sector" component={renderField} 
                                       classess={classes} type="text" syncerrors={errors} arraydis={disabledFields}
                                       label="Sector" icon="perm_identity" normalize={upper}/>
                            </Grid>
                            <Grid item>
                                <Field name="city" component={renderField} 
                                       classess={classes} type="text" syncerrors={errors} arraydis={disabledFields}
                                       label="Ciudad" icon="perm_identity" normalize={upper}/>
                            </Grid>
                            <Grid item>
                                <Field name="national_id" component={renderField} 
                                      classess={classes} type="text" syncerrors={errors} arraydis={disabledFields}
                                      label="Cédula" icon="perm_identity" normalize={nationalID}/>
                            </Grid>
                            <Grid item>
                                <Field name="phone" component={renderField} 
                                      classess={classes} type="text" syncerrors={errors} arraydis={disabledFields}
                                      label="Teléfono" icon="perm_identity" normalize={normalizePhone}/>
                            </Grid>
                            <Grid item>
                                <Field name="marital_status" component={renderField} 
                                      classess={classes} type="select" syncerrors={errors} arraydis={disabledFields}
                                      array={estadoCivil} 
                                      label="Estado Civil" />
                            </Grid>
                            <Grid item>
                                <Field name="place_status" component={renderField} 
                                      classess={classes} type="select" syncerrors={errors} arraydis={disabledFields}
                                      array={local} 
                                      label="Casa" />
                            </Grid>
                            <Grid item>
                                <Field disabledProps={!place_status || place_status === 2} name="rent_price" component={renderField} 
                                      classess={classes} type="text" syncerrors={errors} arraydis={disabledFields} 
                                      onBlur={ e=>parseOnBlur(e,this) }
                                      label="Precio Alquiler" icon="perm_identity" normalize={onlyDigits}/>
                            </Grid>
                            <Grid item>
                                <Field name="relative_fullname" component={renderField} 
                                      classess={classes} type="text" syncerrors={errors} arraydis={disabledFields}
                                      label="Nombre de Familiar" icon="perm_identity" normalize={upper}/>
                            </Grid>
                            <Grid item>
                                <Field name="relative_address" component={renderField} 
                                      classess={classes} type="text" syncerrors={errors} arraydis={disabledFields}
                                      label="Dirección de Familiar" icon="perm_identity" normalize={upper}/>
                            </Grid>
                            <Grid item>
                                <Field disabledProps={!marital_status} name="wife_fullname" component={renderField} 
                                      classess={classes} type="text" syncerrors={errors} arraydis={disabledFields}
                                      label="Nombre de Conyugue" icon="perm_identity" normalize={upper}/>
                            </Grid>
                            <Grid item>
                                <Field name="workplace" component={renderField} 
                                      classess={classes} type="text" syncerrors={errors} arraydis={disabledFields}
                                      label="Lugar donde trabajo" icon="perm_identity" normalize={upper}/>
                            </Grid>
                            <Grid item>
                                <Field name="workplace_phone" component={renderField} 
                                      classess={classes} type="text" syncerrors={errors} arraydis={disabledFields}
                                      label="Tel. de trabajo" icon="perm_identity" normalize={normalizePhone}/>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>}
                </ExpansionPanel>
            </Grid>
            <Divider/>
            <Grid item xs={12}>
                <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Grid container direction={'row'} >
                            <Grid item>
                                <Icon >account_balance</Icon>
                            </Grid>
                            <Grid item>
                                <Typography variant="title" color="inherit" noWrap>
                                Datos Negocio
                                </Typography>
                            </Grid>
                        </Grid>
                        
                    </ExpansionPanelSummary>
                    { (expanded === 'panel2') && <ExpansionPanelDetails>
                        <Grid container direction={'row'} alignItems={'center'} justify={'space-around'}>
                            
                            <Grid item>
                                <Field name="business_name" component={renderField} 
                                      classess={classes} type="text" 
                                      label="Nombre Negocio" icon="perm_identity" normalize={upper}/>
                            </Grid>
                            <Grid item>
                                <Field name="business_sales" component={renderField} 
                                       classess={classes} type="text" onBlur={ e=>parseOnBlur(e,this) }
                                       label="Ventas diarias RD$" icon="perm_identity" normalize={onlyDigits}/>
                            </Grid>
                            <Grid item>
                                <Field name="business_address" component={renderField} 
                                       classess={classes} type="text" 
                                       label="Dirección Negocio" icon="perm_identity" normalize={upper}/>
                            </Grid>
                            <Grid item>
                                <Field name="business_sector" component={renderField} 
                                       classess={classes} type="text" 
                                       label="Sector" icon="perm_identity" normalize={upper}/>
                            </Grid>
                            <Grid item>
                                <Field name="business_city" component={renderField} 
                                       classess={classes} type="text" 
                                       label="Ciudad" icon="perm_identity" normalize={upper}/>
                            </Grid>
                            <Grid item>
                                <Field name="business_phone" component={renderField} 
                                       classess={classes} type="text" 
                                       label="Tel." icon="perm_identity" normalize={normalizePhone}/>
                            </Grid>
                            <Grid item>
                                <Field name="business_owener_name" component={renderField} 
                                       classess={classes} type="text" 
                                       label="Nombre(s) Propietario" icon="perm_identity" normalize={upper}/>
                            </Grid>
                            <Grid item>
                                <Field name="business_time_living" component={renderField} 
                                      classess={classes} type="text" 
                                      label="Tiempo que lo habita" icon="perm_identity" normalize={upper}/>
                            </Grid>

                            <Grid item>
                                <Field name="business_place_status" component={renderField} 
                                      classess={classes} type="select" 
                                      value={'0'} array={local} 
                                      label="Local" />
                            </Grid>
                            <Grid item>
                                <Field disabledProps={!business_place_status || business_place_status === 2} name="business_rent_price" component={renderField} 
                                      classess={classes} type="text" onBlur={ e=>parseOnBlur(e,this) }
                                      label="Precio Alquiler" icon="perm_identity" normalize={onlyDigits}/>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>}
                </ExpansionPanel>
            </Grid>
            <Grid item xs={12}>
                <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Grid container direction={'row'} >
                            <Grid item>
                                <Icon >assignment_ind</Icon>
                            </Grid>
                            <Grid item>
                                <Typography variant="title" color="inherit" noWrap>
                                Referencias Personales Cliente
                                </Typography>
                            </Grid>
                        </Grid>
                    </ExpansionPanelSummary>
                    { (expanded === 'panel3') && <ExpansionPanelDetails>
                            <Grid container direction={'row'} alignItems={'center'} justify={'space-around'}>
                                
                                <Grid item>
                                    <Field name="ref_1_name" component={renderField} 
                                           type="text" 
                                          label="Nombre Referencia 1" icon="perm_identity" normalize={upper}/>
                                </Grid>
                                <Grid item>
                                    <Field name="ref_1_address" component={renderField} 
                                           classess={classes} type="text" 
                                           label="Dirección Referencia 1" icon="perm_identity" normalize={upper}/>
                                </Grid>
                                <Grid item>
                                    <Field name="ref_1_phone" component={renderField} 
                                           classess={classes} type="text" 
                                           label="Teléfono Referencia 1" icon="perm_identity" normalize={normalizePhone}/>
                                </Grid>
                                <Grid item>
                                    <Field name="ref_2_name" component={renderField} 
                                          classess={classes} type="text" 
                                          label="Nombre Referencia 2" icon="perm_identity" normalize={upper}/>
                                </Grid>
                                <Grid item>
                                    <Field name="ref_2_address" component={renderField} 
                                           classess={classes} type="text" 
                                           label="Dirección Referencia 2" icon="perm_identity" normalize={upper}/>
                                </Grid>
                                <Grid item>
                                    <Field name="ref_2_phone" component={renderField} 
                                           classess={classes} type="text" 
                                           label="Teléfono Referencia 2" icon="perm_identity" normalize={normalizePhone}/>
                                </Grid>
                                <Grid item>
                                    <Field name="ref_3_name" component={renderField} 
                                          classess={classes} type="text" 
                                          label="Nombre Referencia 3" icon="perm_identity" normalize={upper}/>
                                </Grid>
                                <Grid item>
                                    <Field name="ref_3_address" component={renderField} 
                                           classess={classes} type="text" 
                                           label="Dirección Referencia 3" icon="perm_identity" normalize={upper}/>
                                </Grid>
                                <Grid item>
                                    <Field name="ref_3_phone" component={renderField} 
                                           classess={classes} type="text" 
                                           label="Teléfono Referencia 3" icon="perm_identity" normalize={normalizePhone}/>
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
  return bindActionCreators({...Actions.loading,...Actions.stepper}, dispatch);
}

let stylesThemeComponent= withStyles(styles)(CreateClientsContent);
let FormFields = reduxForm({ form: formNames.Clients,
                              fields:['marital_status',
                                        'place_status',
                                        'business_place_status',
                                        'guarantor_marital_status',
                                        'guarantor_place_status'],
                             initialValues:{marital_status:0,
                                            place_status:0,
                                            business_place_status:0,
                                            guarantor_marital_status:0,
                                            guarantor_place_status:0,
                                            loan_type:0,
                                            loan_gasto_cierre:100,
                                            loan_applied_cierre:0,
                                            loan_start_date:moment(),
                                            loan_rate:2,
                                            loan_amount:100,
                                        },
                             
                             destroyOnUnmount: false,
                             forceUnregisterOnUnmount: true, 
                             asyncValidate,
                             asyncBlurFields: ['national_id'],
                             validate:(v)=>validate(v,requiredFields),
                             onSubmitFail: (errors,dispatch,submitError,props) => {scrollToInvalid({errors,dispatch,props},formNames.Clients)},
                           })(stylesThemeComponent)

const selector = formValueSelector(formNames.Clients)

const mapStateToProps = (state) => {
    const { marital_status,
            place_status,
            business_place_status, } = selector(state, 
        'marital_status',
        'place_status',
        'business_place_status',

    )
    const {panels,expanded} = state.stepper;
    return {
    authenticated: state.auth.authenticated,
    loading: state.loading.loading,
    disabledFields: state.clients.disabled,
    marital_status,
    place_status,
    business_place_status,
    panels,
    expanded,
    errors: getFormSyncErrors(formNames.Clients)(state)


  };
};

const WizardClients = connect(mapStateToProps,mapDispatchToProps)(FormFields);

export default WizardClients ;