import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../actions';
import {estadoCivil, local} from '../../../utils/const';
import {editProvider} from './formatters';
import EditBaseTable from './EditBaseTable';

import { withStyles } from 'material-ui/styles';


const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    }
});


class GurarantorTable extends Component {

	state ={
		guarantor:{},
		columns: [
	        { name: 'name', title: 'Nombre'}, //getCellValue:row=>`${row.first_name} ${row.second_name} ${row.first_surname} ${row.second_surname}` },
	        { name: 'age', title: 'Edad' },
	        { name: 'national_id', title: 'Cédula' },
	        { name: 'address', title: 'Dirección' },
	        { name: 'marital_status', title: 'Estado civil' },
	        { name: 'place_status', title: 'Local' },
	        { name: 'rent_price', title: 'Alquiler' },
	      ],
		tableColumnExtensions: [
        	// { columnName: 'first_name', width: 90 },
        	
      	],
      	selectCompt:['marital_status'],
      	editingStateColumnExtensions: [
	        { columnName: 'laon_no', editingEnabled: false },
	        { columnName: 'marital_status'} //,createRowChange: (r)=>console.log(r) },
	     ],
		editingRowIds: [],
		addedRows: [],
		rowChanges: {},
		loading:true,
		subscription:{}
	}
	constructor(props){
		super(props);
		this.subs = [];
	}
	setStateAsync(state) {
	    return new Promise((resolve) => {
	      this.setState(state, resolve)
	    });
	}
	componentWillUnmount(){
		this.subs.forEach(sub=>sub.unsubscribe());
	}
	componentWillMount(){
		
	}

	async componentDidMount(){
		const {row} = this.props;
		const guarantor = await row.guarantor_;
		// if(Object.keys(this.state.subscription).length) this.state.subscription.unsubscribe();
		const subscription = guarantor.$.subscribe(guarantor=>{
			console.log('leak guarantor',guarantor)
			this.setState({guarantor, loading:false})
		})
		this.subs.push(subscription)

	}
	changeAddedRows(addedRows) {
	}
	changeEditingRowIds(editingRowIds) {
		this.setState({ editingRowIds });
	}
	changeRowChanges(rowChanges) {

		this.setState({ rowChanges });
	}
    render() {
        const {loading, row} = this.props;
        const {client, guarantor} = this.state;
        const { rows, columns, tableColumnExtensions,
        	editingStateColumnExtensions , selectCompt,
        	editingRowIds, rowChanges, addedRows,
    			} = this.state;
        // console.log(row)
        return (
        	<EditBaseTable
		          row={[guarantor]}
		          collection="guarantor"
		          headerTitle="Fiador"
		          changeAddedRows={this.changeAddedRows.bind(this)}
		          changeEditingRowIds={this.changeEditingRowIds.bind(this)}
		          changeRowChanges={this.changeRowChanges.bind(this)}
		          {...this.state}
                  fieldProviders={ [ editProvider('select', ['marital_status'], {array:estadoCivil} , guarantor.id ),
                  					 editProvider('select', ['place_status'], {array:local} , guarantor.id ),
                  					 editProvider('integer', ['age'] , guarantor.id ),
                  					 editProvider('phone', ['phone'] , guarantor.id ), 
                  					 editProvider('id', ['national_id'] , guarantor.id ), 
                  					 editProvider('numbers', ['rent_price'] , guarantor.id ), 

                  					]
                  				}
            />
          	
        );
    }
}
const comp =  withStyles(styles)(GurarantorTable);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...Actions.loading}, dispatch);
}
const mapStateToProps = (state) => {
    return {loading: state.loading.loading}
}
const connectedComponet = connect(mapStateToProps,mapDispatchToProps)(comp);
export default connectedComponet ;
