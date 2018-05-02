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
import Icon from 'material-ui/Icon';
import AccountCircle from 'material-ui-icons/AccountCircle';

const styles = theme => ({

	margin: {
    	margin: theme.spacing.unit,
 	 },
 	 textField: {
	    flexBasis: 200,
	  },
 })
class SearchClientsBar extends Component {
  
  state = {
  	search:''
  };

  handleOnChange = prop => event => {
  	this.setState({ [prop]: event.target.value })
  }

  render() {
    const { classes } = this.props;

    return(

      	<Grid container alignItems={'center'}
            direction={'row'}
            justify={'space-around'}>
            
            <Grid item xs={3}  >
            	<Typography variant="title" color="inherit" noWrap>
                	List Clients
            	</Typography>
            </Grid>
            <Grid item xs={3}>

	            <FormControl >
	                <InputLabel htmlFor="adornment-search" style={{color:'white'}}
	                className={classNames(classes.margin, classes.textField)}>Search</InputLabel>
	                <Input
	                  style={{color:'white'}}
	                  id="adornment-search"
	                  type={'text'}
	                  value={this.state.search}
	                  onChange={this.handleOnChange('search')}
	                  endAdornment={
	                    <InputAdornment position="end">
	                      <Icon>search</Icon>
	                    </InputAdornment>
	                  }
	                />
	            </FormControl>

            </Grid>
              
      	</Grid>

      )
  }
}


export default withStyles(styles)(SearchClientsBar);