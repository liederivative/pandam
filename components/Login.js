import React, { Component } from 'react';

import Button from 'antd/lib/button';
import { Link } from 'react-router-dom';
import styles from './Login.css';
import TextField from 'material-ui/TextField';


type Props = {};

class Login extends Component<Props> {
  props: Props;

   handleChange = (e) => {
    e.preventDefault();
    
  }

  render() {
  	<div>
  	<Link to="/">
        <i className="fa fa-arrow-left fa-3x" />
      </Link>
      
      <form action="">
      <TextField
      	value="test"
          onChange={this.handleChange.bind(this)}
          	label="User"/>
      </form>
     </div>
  }
}


export default Login;