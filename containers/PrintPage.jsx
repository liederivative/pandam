// @flow
import React, { Component } from 'react';

import {printFile} from '../print/printManager';

export default class PrintPage extends Component {

	handleClick=()=>{
		this.props.history.goBack()
	}
	render() {
		console.log(this.props,'Print')
		return (
			<div>
				<button onClick={event=>printFile({})}>Print</button>
				<button onClick={ this.handleClick.bind(this) }>Go Back</button>
			</div>
			
		);
	}
}
