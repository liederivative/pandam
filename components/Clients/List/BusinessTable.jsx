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


class RefTable extends Component {
	
	state ={
		business:[],
		columns: [
	        { name: 'name', title: 'Nombre'}, //getCellValue:row=>`${row.first_name} ${row.second_name} ${row.first_surname} ${row.second_surname}` },
	        { name: 'address', title: 'Dirección' },
	        { name: 'phone', title: 'Teléfono' },
	        { name: 'sector', title: 'Sector' },
	        { name: 'city', title: 'Ciudad' },
	        { name: 'owner', title: 'Propietario' },
	        { name: 'place_status', title: 'Local' },
	        { name: 'rent_price', title: 'Renta' },


	      ],
		tableColumnExtensions: [
        	// { columnName: 'first_name', width: 90 },
        	
      	],
      	selectCompt:[],
      	editingStateColumnExtensions: [
	        
	     ],
		editingRowIds: [],
		addedRows: [],
		rowChanges: {},
		loading:true
	}
	constructor(props){
		super(props);
		this.subs = []
	}
	setStateAsync(state) {
	    return new Promise((resolve) => {
	      this.setState(state, resolve)
	    });
	}
	componentWillUnmount(){
		 this.subs.forEach(sub => sub.unsubscribe());
	}
	async componentDidMount(){
		const {row, foreinKey} = this.props;
		try{
			const steps = foreinKey.split('.');
			
			const business_ = await row[steps[0]];
			
			let business = await business_[steps[1]];
			
			if(this.props.halt) this.props.stopLoading();

			if(!business){ this.setState({business:[],loading:false}); return }
			 
			// if(Object.keys(this.state.subscription).length) this.state.subscription.unsubscribe();
			const subscription = business.$.subscribe(business=>{
				console.log('leak business', business)
				this.setState({business:[business]})
			})
			this.subs.push(subscription);
			business = (!business)?[]:[business];
			
			console.log(business)


			this.setState({loading:false})

			
			
		}catch(e){
			this.setState({business:[], loading:false}); 
			this.props.stopLoading();

			console.log(e);
			this.props.openModal({msg:'Al parecer hubo un error en la data. :-('})
			
			return;
		}
		
		
		
		
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
        const {loading, row, headerTitle} = this.props;
        const {business} = this.state;
        const { rows, columns, tableColumnExtensions,
        	editingStateColumnExtensions , selectCompt,
        	editingRowIds, rowChanges, addedRows,
    			} = this.state;
        // console.log(this.state)
        const key = (business.length)?business[0].id:business;
        return (
        	<EditBaseTable
		          row={business}
		          collection="business"
		          headerTitle={headerTitle}
		          changeAddedRows={this.changeAddedRows.bind(this)}
		          changeEditingRowIds={this.changeEditingRowIds.bind(this)}
		          changeRowChanges={this.changeRowChanges.bind(this)}
		          {...this.state}
                  fieldProviders={ [ 
                  					 editProvider('phone', ['phone'] ,key ), 
                  					 editProvider('select', ['place_status'], {array:local}, key ),
                  					 editProvider('numbers', ['rent_price'] , key ) ,

                  					]
                  				}
            />
          	
        );
    }
}
const comp =  withStyles(styles)(RefTable);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...Actions.loading, ...Actions.modal}, dispatch);
}
const mapStateToProps = (state) => {
    return {loading: state.loading.loading}
}
const connectedComponet = connect(mapStateToProps,mapDispatchToProps)(comp);
export default connectedComponet ;
