import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import moment from '../../utils/date';
import Typography from 'material-ui/Typography';
import _ from '../../utils/_';


const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    }
});
const db = require('electron').remote.getGlobal('db');

class TableCashFlow extends Component {
	state={
		debts:[],
		payments:[],
		totalDebts:0
	}
	async componentDidMount(){
		const {dates} = this.props;
		let debts = await db.debt.find().where('expense_date').lte(dates[1].fromDRtoISO().toISOString())
									.where('expense_date').gte(dates[0].fromDRtoISO().toISOString()).exec()
		let totalDebts = _.sum(debts,'amount');

		this.setState({totalDebts})
	}

    render() {
        const {loading} = this.props;
        return (
        	<Paper>
        		<Grid container>
	        		<Grid item>
		        		<Typography>
		        			{this.state.totalDebts}
		        		</Typography>
	        		</Grid>
        		</Grid>
        	</Paper>
        	
          
        );
    }
}
const comp =  withStyles(styles)(TableCashFlow);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...Actions.loading}, dispatch);
}
const mapStateToProps = (state) => {
    return {loading: state.loading.loading,
    		dates:state.debts.dates
    }
}
const connectedComponet = connect(mapStateToProps,mapDispatchToProps)(comp);
export default connectedComponet ;
