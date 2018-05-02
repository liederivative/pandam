import React, { Component } from 'react';

import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import DatePicker from 'rc-calendar/lib/Picker';
import moment from '../../utils/date';



class DateRange extends Component {

    
    isValidRange(v) {
        return v && v[0] && v[1];
    }

    render() {
        const {calendar, onChange, value} = this.props;


    	return (<DatePicker  calendar={ calendar } value={ value}  onChange={ onChange }>
        {
          ({ value }) => {
            return (<span className="ant-calendar-picker" tabIndex="0">
                <span className="ant-calendar-picker-input ant-input">
                    <Grid container spacing={0} justify={'flex-start'} alignItems={'center'} direction={'row'} >
                        <Grid item >
                            <input
                            tabIndex="-1"
                            placeholder="Fecha Incial"
                            

                            readOnly
                            className="ant-calendar-range-picker-input"
                            value={this.isValidRange(value) && `${value[0].format('DD-MMM-YYYY')}` || ''}
                            />
                        </Grid>
                        
                        <Grid item>
                            <span>~</span>
                        </Grid>
                        <Grid item>
                            <input
                                tabIndex="-1"
                                placeholder="Fecha Final"
                                
                              
                                readOnly
                                className="ant-calendar-range-picker-input"
                                value={this.isValidRange(value) && `${value[1].format('DD-MMM-YYYY')}` || ''}
                            />
                        </Grid>
                        <Grid item >
                            <Icon style={{position:'relative',top:3, right:4}}>today</Icon>
                        </Grid>
                    </Grid>
                    
                </span>
                
                </span>);
          }
        }
        </DatePicker>)
    }
}


export default DateRange;