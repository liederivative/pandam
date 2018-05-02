import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm  } from 'redux-form';
import * as Actions from '../actions';
import path from 'path';

import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import {upper} from '../utils/normalizer';

// import Spinner from '../components/Spinner';

const validate = values => {
  const errors = {};

  if (!values.user) {
    errors.user = "Falta su nombre de usuario.";
  } else if (/[^a-zA-Z0-9]/.test(values.user)) {
    errors.user = 'Nombre de usuario inválido'
  }

  if (!values.password) {
    errors.password = "Falta tu contraseña.";
  }

  return errors;
};

const logo = 'img://logo.png' ;


const styles = theme =>({
  root: {
    width: 390,

  },
  card: {
    maxWidth: 400,
    // height:610
  },
  media: {
    height: 120,
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  buttonProgress: {
    position: 'absolute',
  },
});

class LoginPage extends Component {

	state = {
	    name: 'Composed TextField',
	    loading:false,
	  }


	renderField = ({ input, label, type,icon,onChange, meta: { touched, error } }) => {
    	
    	return (
	    <Grid container spacing={8} alignItems="center">
	      <Grid item>
	        <Icon >{icon}</Icon>
	      </Grid>
	      <Grid item>
	        <FormControl  error={ (touched && error)?true:false } aria-describedby="text-field">
	          <InputLabel htmlFor={label}>{label}</InputLabel>
	          <Input id={label} {...input} type={type} />
	          <FormHelperText id="name-helper-text">{touched && (error && <span>{error}</span>) }</FormHelperText>
	        </FormControl>
	      </Grid>
	    </Grid>
	    )
	  }

	handleChange = (event)=>{
		console.log(event.target);
	}
	handleFormSubmit = (values) => {
		console.log(values)
		const {createclient, signInUser, history} = this.props;
		
	    signInUser(values);
	    history.push('/menu/createclients');
	    // this.props.openModal({title:'Error en Login',
	    // 					  msg:'Favor revisar su usuario y contraseña e intentar nuevamente.',
	    // 					  type:'YesOrNo'});

	    // this.props.startLoading();
	  };

  	render() {
	  	let { classes,authenticated,loading } = this.props;
	  	console.log(this.props)
	    return (
	    <Grid container  alignItems="center" >
	    
	      <form onSubmit={this.props.handleSubmit(this.handleFormSubmit).bind(this)}>
	      	<Card className={classes.card}>
	      	  <CardMedia
	      	    className={classes.media}
	      	    image={logo}
	      	    title="Logo"
	      	  />
	      	  <CardContent style={{height:300}}>
		        <Grid container  direction="column" alignItems="center" justify="center"> 
		    		<Grid item>
			    		<Field name="user" component={this.renderField} 
			    			  classes={classes} type="text" 
			    			  label="User" icon="perm_identity" normalize={upper}/>
            
		    		</Grid>
		    		<Grid item>
		    			<Field name="password" component={this.renderField} 
		    			 	   classess={classes} type="password" 
		    			 	   label="Password" icon="lock_outline" />
		    			
			    		
		    		</Grid>
		    		
		    	</Grid>
	      	  </CardContent>
	      	  <CardActions>
	      	  <Grid container  direction="column" alignItems="center" justify="center">
	      			          <Button disabled={loading} type="submit" size="small" color="primary" >
	      			            Login
	      			          </Button>
	      			          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
	      	  </Grid>
	      	  </CardActions>
	      	</Card>
	      	{authenticated.toString()}
	      </form>
	    </Grid>
	    	
	      
	    );
  }


}

const mapStateToProps = (state) => {
    return {
    authenticated: state.auth.authenticated,
    loading: state.loading.loading,
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({...Actions.auth,...Actions.modal,...Actions.loading,...Actions.clients}, dispatch);
}


var  stylesThemeComponent= withStyles(styles)(LoginPage);
var reduxLogin = reduxForm({ form: 'login', validate });
var reduxComponet = reduxLogin(stylesThemeComponent);


export default connect(mapStateToProps,mapDispatchToProps)(reduxComponet);