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
		ref:[],
		columns: [
	        { name: 'name', title: 'Nombre'}, //getCellValue:row=>`${row.first_name} ${row.second_name} ${row.first_surname} ${row.second_surname}` },
	        { name: 'address', title: 'Dirección' },
	        { name: 'phone', title: 'Teléfono' },
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
			const ref_ = await row[foreinKey];
			const ref = await ref_.refs_;
			console.log(ref)
			// if(Object.keys(this.subs).length) this.state.subscription.unsubscribe();
			ref.forEach( ref=>{
				const subscription = ref.$.subscribe(async change=>{
					console.log(change)

					const ref = await ref_.refs_;
					console.log('leak ref', ref)
					this.setState({ref})
				})
				this.subs.push(subscription)
			});
			
			this.setState({ loading:false})
			if(this.props.halt) this.props.stopLoading();
		}catch(e){
			this.props.stopLoading();

			console.log(e);
			this.props.openModal({msg:'Al parecer hubo un error en la data. :-('})
			this.setState({ref:[], loading:false})
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
        const {ref} = this.state;
        const { rows, columns, tableColumnExtensions,
        	editingStateColumnExtensions , selectCompt,
        	editingRowIds, rowChanges, addedRows,
    			} = this.state;
        // console.log(row)
        const key = (typeof ref !== 'undefined')?( (ref.length)?ref[0].id:ref ):ref
        return (
        	<EditBaseTable
		          row={ref}
		          collection="personalref"
		          headerTitle={headerTitle}
		          changeAddedRows={this.changeAddedRows.bind(this)}
		          changeEditingRowIds={this.changeEditingRowIds.bind(this)}
		          changeRowChanges={this.changeRowChanges.bind(this)}
		          {...this.state}
                  fieldProviders={ [ 
                  					 editProvider('phone', ['phone'] , key ), 

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
