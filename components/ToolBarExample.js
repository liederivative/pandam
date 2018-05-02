import React, { Component } from 'react';

import Typography from 'material-ui/Typography';
import Menu, { MenuItem } from 'material-ui/Menu';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Icon from 'material-ui/Icon';
import AccountCircle from 'material-ui-icons/AccountCircle';


class ToolBarExample extends Component {
  state = {
    open: false,
    anchorEl: null,
  };
  handleClose = () => {
    this.setState({ anchorEl: null ,open:false});
  };
  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget,open:true });
  };

  render() {
    const { open, anchorEl } = this.state;

    return(

      <Grid container alignItems={'center'}
            direction={'row'}
            justify={'space-between'}>
            <Grid item xs={3}>
                <IconButton
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            </Grid>
             <Grid item xs={3}  >
               <Typography variant="title" color="inherit" noWrap>
                Sherlock Holmes
              </Typography>
             </Grid>
             <Grid item xs={3}>
              <FormControl >
                <InputLabel htmlFor="adornment-search">Search</InputLabel>
                <Input
                  id="adornment-search"
                  type={'text'}
                  value={this.state.password}
                  onChange={()=>{}}
                  endAdornment={
                    <InputAdornment position="end">
                      <Icon>search</Icon>
                    </InputAdornment>
                  }
                />
              </FormControl>
             </Grid>
              <Grid item xs={3}>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  > 
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>Cerrar Sesión</MenuItem>
                    
                  </Menu>
              </Grid>
      </Grid>

      )
  }
}


export default ToolBarExample;