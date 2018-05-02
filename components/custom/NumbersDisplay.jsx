import React, { Component } from 'react';


export default class NumberDisplay extends Component {

  render() {

    const children = React.Children.toArray(this.props.children);

    return (
    	<span>
    		{ children[0] && children[0].toLocaleString(navigator.language) }
    	</span>
    );
  }
}
