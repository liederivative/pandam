import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';

import Menu, { MenuItem } from 'material-ui/Menu';
import Grid from 'material-ui/Grid';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';


import Button from 'material-ui/Button';
import { MenuItems, mailFolderListItems, otherMailFolderListItems } from '../components/MenuItems';

const drawerWidth = 60;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,


  },
  drawerPaper: {
    position: 'relative',
    // width: drawerWidth,
    overflow:'hidden',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
    'margin-left': 50,
  },
  toolbar: theme.mixins.toolbar,
  button: {
    margin: theme.spacing.unit,
  },
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
    auth: true,
    anchorEl: null,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  
  

  render() {
    const { classes, theme } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const children = React.Children.toArray(this.props.children)

    return (
      <div className={classes.root}>
        <AppBar position="fixed"
                className={classNames(classes.appBar)} >
          <Toolbar >
            
            {children[0]}
          </Toolbar>
        </AppBar>
            {MenuItems}

        <div className={classes.content}>
          <div className={classes.toolbar} />
           {children[1]}
        </div>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);