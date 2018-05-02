import React, { Component } from 'react';
import {printFile} from '../../print/printManager';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';

export default class PrintButton extends Component {

    render() {

        return (
        	<Tooltip  title='Ver Solicitud' placement="bottom">
	            <Button  onClick={event=>printFile({type:'solicitud'})} mini variant="fab" color="primary" aria-label="add">
	              <Icon>visibility</Icon>
	            </Button>
	        </Tooltip>
        );
    }
}
