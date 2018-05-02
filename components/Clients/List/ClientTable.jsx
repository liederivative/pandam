import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../actions';
import {estadoCivil} from '../../../utils/const';
import {editProvider} from './formatters';
import EditBaseTable from './EditBaseTable';

import { withStyles } from 'material-ui/styles';



const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    }
});


class ClientTable extends Component {

	state ={
		client:{},
		columns: [
	        { name: 'first_name', title: 'P. Nombre'}, //getCellValue:row=>`${row.first_name} ${row.second_name} ${row.first_surname} ${row.second_surname}` },
	        { name: 'second_name', title: 'S. N' },
	        { name: 'first_surname', title: 'P. Apellido' },
	        { name: 'second_surname', title: 'S. Apellido' },
	        { name: 'marital_status', title: 'Estado civil' },
	        { name: 'phone', title: 'Telefono' },
	        { name: 'loan_no', title: 'Prestamo No' },
	      ],
		tableColumnExtensions: [
        	{ columnName: 'first_name', width: 90 },
        	
      	],
      	selectCompt:['marital_status'],
      	editingStateColumnExtensions: [
	        { columnName: 'national_id', editingEnabled: false },
	        { columnName: 'loan_no', editingEnabled: false },
	        { columnName: 'marital_status'} //,createRowChange: (r)=>console.log(r) },
	     ],
		editingRowIds: [],
		addedRows: [],
		rowChanges: {},
		loading:true
	}
	constructor(props){
		super(props);
		console.log('constructing ...')
		this.subs=[];
	}
	// setStateAsync(state) {
	//     return new Promise((resolve) => {
	//       this.setState(state, resolve)
	//     });
	// }
	componentWillMount(){
		this._mounted=false
		// if(this.props.start) this.props.startLoading();
	}
	componentWillUnmount(){
		console.log(this.subs);
		this.subs.forEach(sub =>sub.unsubscribe());
	}
	update=client=>{
		console.log('leak client',client,this.subs)

		this.setState({client})
	}
	componentDidMount(){
		this._mounted=true
		console.log('mounting ...')
		const {row} = this.props;
		row.client_id_.then(client=>{
			console.log('getting client_id_',this.subs,this)
			this.subs.push(client.$.subscribe(this.update))
			this.setState({ loading:false})
		});
		
		
		
		
	}
	changeAddedRows(addedRows) {
	}
	changeEditingRowIds(editingRowIds) {
		console.log('rowChanges')
		this.setState({ editingRowIds });
	}
	changeRowChanges(rowChanges) {
		
		console.log('rowChanges')
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
        	!this.state.loading && <EditBaseTable
		          row={[client]}
		          collection="client"
		          headerTitle="Cliente"
		          changeAddedRows={this.changeAddedRows.bind(this)}
		          changeEditingRowIds={this.changeEditingRowIds.bind(this)}
		          changeRowChanges={this.changeRowChanges.bind(this)}
		          {...this.state}
		        
		        
                  fieldProviders={ [editProvider('select', ['marital_status'], {array:estadoCivil}, client.id ) ,
                  					
                  					editProvider('phone', ['phone'] , client.id) 
                  				] }
                />
	     
          	
        );
    }
}
const comp =  withStyles(styles)(ClientTable);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...Actions.loading}, dispatch);
}
const mapStateToProps = (state) => {
    return {loading: state.loading.loading}
}
const connectedComponet = connect(mapStateToProps,mapDispatchToProps)(comp);
export default connectedComponet ;
