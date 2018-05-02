import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import Menu, { MenuItem } from 'material-ui/Menu';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import AccountCircle from 'material-ui-icons/AccountCircle';
import { Field, reduxForm, getFormValues, initialize, destroy } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {nationalID} from '../../../utils/normalizer';
import * as Actions from '.../../../actions';
import { formNames } from '../../../utils/const';
import moment from '../../../utils/date';


const validate = (values,requiredFields)=>{
    console.log(values)
    const errors = {};
    const search_id = values.searchString('search_id',1,1);

    if(search_id.length){
    for (var i = search_id.length - 1; i >= 0; i--) {
        if (values[search_id[i]].length < 13 ) {
        errors[search_id[i]] = "Cédula incorrecta";
      }
    }
     
    }

    return errors;

}


const styles = theme => ({

	margin: {
    	margin: theme.spacing.unit,
 	 },
 	 textField: {
	    flexBasis: 200,
	  },
    button: {
        marginRight: theme.spacing.unit,
    },
 })
class SearchClientsBar extends Component {
  

  renderField = (fields)=>{
    console.log
    const { input, label, type, disabledProps,array, meta: { touched, error }, ...rest } = fields;
      return (<FormControl >
                  <InputLabel htmlFor="adornment-search" style={{color:'white'}}
                  className={classNames(rest.classes.margin, rest.classes.textField)}>Search</InputLabel>
                  <Input
                    {...input}
                    style={{color:'white'}}
                    endAdornment={
                      <InputAdornment position="end">
                        <Icon>search</Icon>
                      </InputAdornment>
                    }
                  />
                  
              </FormControl>)
  }
  // handleOnChange = prop => event => {
  // 	this.setState({ [prop]: event.target.value })
  // }
  handleClick = ()=>{
    const {dispatch, resetStep} = this.props;
    dispatch(initialize(formNames.Clients,formNames.initialValues ) ); 
    dispatch({type:'CLEAR_DISABLED_FIELDS', meta:{scope:'local'}})
    resetStep(1);
  }
  handleOnSubmit = () =>{
        const {getClients, formValues} = this.props;

        getClients({ client:formValues.search_id, disabled:true, form:formNames.Clients });
  }
  render() {
    const { classes } = this.props;
    const { handleSubmit, pristine, reset, submitting } = this.props

    return(
        
            <form name={formNames.clientsBar} style={{width:'100%'}} onSubmit={ handleSubmit(this.handleOnSubmit).bind(this)}>
              	<Grid container alignItems={'center'}
                    direction={'row'}
                    justify={'space-between'}>
                    
                    <Grid item xs={5}  >
                    	<Typography variant="title" color="inherit" noWrap>
                        	Solicitud Préstamos
                    	</Typography>
                    </Grid>
                    <Grid item xs={4}>

                      <Field
                      classes = {classes}
                        name="search_id"
                        type="text"
                        component={this.renderField}
                        label="Buscar Cliente"
                        normalize={nationalID}
                      />


                    </Grid>
                    <Grid item xs={3}>
                        <Button
                          variant="raised"
                          color="primary"
                          
                          onClick={this.handleClick}
                          
                        >
                          Borrar campos
                        </Button>
                    </Grid>
                      
              	</Grid>
            </form>
        

      )
  }
}

const middleFunc = reduxForm({
                      form: formNames.clientsBar,
                      initialValues: {search_id:''},
                      validate,
                    })(withStyles(styles)(SearchClientsBar))



const mapStateToProps = (state) => {
    
    return {formValues: getFormValues(formNames.clientsBar)(state)};
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({...Actions.clients, ...Actions.stepper}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)( middleFunc );