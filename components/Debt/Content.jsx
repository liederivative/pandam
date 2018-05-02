import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';

import {userMapping} from '../../utils/const';
import {upper} from '../../utils/normalizer';
import Grid from 'material-ui/Grid';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import es_ES from 'rc-calendar/lib/locale/es_ES';
import DateRange from '../custom/DateRange';
import {TablePagination } from 'material-ui/Table';

import moment from '../../utils/date';
import TableExpenses from './TableExpenses';
import TableCashFlow from './TableCashFlow';

import Input, { InputLabel, InputAdornment } from 'material-ui/Input';



const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        height:4
    },
    queries: {
    width: 500,
  
  }
});

class ContentUsers extends Component {
	state ={
		submenu:0,
		selection: [],
		hoverValue: [],
		// dates:[moment().subtract(7,'days'), moment().add(1, 'days')],
		page: 1,
	    query:0,
	    sort:'-expense_date'
		
	}
	componentDidMount(){
		const { getListExpenses, dates} = this.props;
		getListExpenses({id:null , cond:'gte', });
	}
	componentWillMount(){
		const {resetPagination, setUnsubscribeExpenses}= this.props;
		resetPagination([null])
		setUnsubscribeExpenses();
	}
	
	onHoverChange = (hoverValue) => {
	    this.setState({ hoverValue });
	 }
	onChange = (event,submenu) => {
		this.setState({submenu})
	    // console.log(this);
	    // const {setPropertie} = this.props;

	    // setPropertie('SET_SUBMENU',submenu)
	    // this.queryOfSubmenu(submenu);
	    // this.getSubmenu(submenu);
	    
	  }
	onChangeCalendar = dates=>{ this.props.setDatesExpenses(dates) }
	onSearch=event=>{
		const {resetPagination, getListExpenses, dates} = this.props;
		resetPagination([null])
		getListExpenses({id:null , cond:'gte', });
	}
	handleChangePage=(event, nextPage)=>{
		let {sort} = this.state;
		const {getListExpenses, page, setPageExpenses, indexes, data, rowPerPage} =  this.props;
		console.log(indexes, nextPage)
		// if(data.length < rowPerPage){
		// 	this.setState({sort:'expense_date'});
		// 	sort = 'expense_date';
		// }
		if(nextPage === 0){
			getListExpenses({id:null ,cond:'gte', sort });
		}else if(page > nextPage){
			console.log('back', sort)
			getListExpenses({id:indexes[nextPage] ,cond:'lt', sort });
		}else{
			console.log('forward', sort)
			getListExpenses({id:indexes[nextPage] , cond:'lt', sort });
		}
		setPageExpenses(nextPage);
		console.log(nextPage)
	}
	handleChangeRowsPerPage=event => {
		console.log(event.target.value)
		const {setRowExpenses, indexes, resetPagination, getListExpenses} = this.props;
		const {sort} = this.state;
		setRowExpenses(event.target.value);
		resetPagination([null])
		getListExpenses({id:null , cond:'gte', sort });

	}
	getSubmenu=(page,data)=>{
		switch(page){
			case 0:

			return <TableExpenses data={data} ></TableExpenses>
			case 1:

			return <TableCashFlow data={data} ></TableCashFlow>
		}
	}
    render() {
        const { classes, detail, loading, dates,page, rowPerPage, data } = this.props;
	    const { hoverValue} = this.state;
	    const {  submenu,  columns } = this.state
	    // const count = page*rowsPerPage;
	    
	    const calendar = (<RangeCalendar
                hoverValue={hoverValue}
                onHoverChange={this.onHoverChange}
                showWeekNumber={false}
                dateInputPlaceholder={['start', 'end']}
                defaultValue={[moment(), moment().add(1, 'months')]}
                locale={es_ES}
                
              />)
	    console.log(this)
        return (

        	<div>
        	<Grid container>
        		<Grid item>
	                <DateRange calendar={ calendar } value={dates}  onChange={ this.onChangeCalendar } />
	            </Grid>
	            <Grid item>
	                <Button onClick={this.onSearch} variant="raised" color="primary" size="small">
	                    <Icon>search</Icon>
	                </Button>
	            </Grid>
				<Grid item xs={12}>
	                <BottomNavigation
	                    value={submenu}
	                    onChange={this.onChange}
	                    showLabels
	                    className={classes.queries}
	                  >
	                    <BottomNavigationAction value={0} label="Egresos"  />
	                    <BottomNavigationAction value={1} label="Flujo Neto"  />
	                </BottomNavigation>
	            </Grid>
	            <Grid item >
	        		<TablePagination
		              component="div"
		              count={page*rowPerPage + data.length + 1 }
		              rowsPerPage={rowPerPage}
		              labelRowsPerPage={"Filas"}
		              rowsPerPageOptions={[5,10,15]}
		              labelDisplayedRows={()=>{return ''}}
		              page={page}
		              backIconButtonProps={{
		                'aria-label': 'Previous Page',
		              }}
		              nextIconButtonProps={{
		                'aria-label': 'Next Page',
		              }}
		              onChangePage={this.handleChangePage}
		              onChangeRowsPerPage={this.handleChangeRowsPerPage}
		            />
	        	</Grid>
        	</Grid>
        	
        	{this.getSubmenu(submenu,data)}
 			
    		</div>
        	
          
        );
    }
}
const comp =  withStyles(styles)(ContentUsers);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...Actions.loading, ...Actions.debts, ...Actions.clients}, dispatch);
}
const mapStateToProps = (state) => {
    return {loading: state.loading.loading,
    		data:state.debts.data,
    		indexes:state.debts.indexes,
    		rowPerPage:state.debts.rowPerPage,
    		dates:state.debts.dates,
    		page:state.debts.page,
    		
    		
    }
}
const connectedComponet = connect(mapStateToProps,mapDispatchToProps)(comp);
export default connectedComponet ;
