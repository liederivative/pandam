import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { editProvider , createProvider } from '../Clients/List/formatters';
import {userMapping} from '../../utils/const';
import {upper} from '../../utils/normalizer';
import moment from '../../utils/date';
import GridUI from 'material-ui/Grid';
import Tooltip from 'material-ui/Tooltip';

import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';

import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
  TableSelection,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import {
  SortingState,
  IntegratedSelection,
  SelectionState,
  EditingState,
  DataTypeProvider
} from '@devexpress/dx-react-grid';

class HeaderButtons extends Component {

	componentWillMount(){
		
	}
	onClickHandler=( event,execute, icon )=>{

		const {idEditing, canSave, row, isEditing,isNew } = this.props;
		execute(event)
		
	}
    render() {
    	
    	const {children, row} = this.props;
    	let icon;
    	let component;
    	if(children[0]){
    		icon = 'edit';
    		component = children[0];
    	}else{
    		icon='save';
    		component = children[2];
    	}
    	
        return (
        	<Table.Cell
			    style={{ padding:0, width:50 }}
			  >
			 <Button onClick={ event=>this.onClickHandler(event,component.props.onExecute,icon) } variant="flat" color="primary" size="small">
                    <Icon>{icon}</Icon>
              </Button>
              {children[1] && 
              	<Tooltip  title='eliminar' placement="right">
              	<Button onClick={ event=>this.onClickHandler(event,children[1].props.onExecute) } variant="flat" color="primary" size="small">
                    <Icon>delete</Icon>
              	</Button>
              	</Tooltip>
              }
              {children[3] &&  <Button onClick={ event=>this.onClickHandler(event,children[3].props.onExecute) } variant="flat" color="primary" size="small">
                    <Icon>cancel</Icon>
              </Button>}
        	</Table.Cell>
        );
    }
}


const Buttons = connect(state=>({idEditing:state.users.idEditing, canSave:state.users.canSave}),
	dispatch=>bindActionCreators({...Actions.users},dispatch) )(HeaderButtons);

class Header extends Component {
	onClickHandler=(event)=>{
		const addBtn = this.props.children.props;
		addBtn.onExecute(event);
		// const {canSave, idEditing} =this.props;
		// if(canSave && idEditing){
		// 	addBtn.onExecute(event);

		// }
	}
	render(){
		
		return (<Table.Cell>
				<Button onClick={this.onClickHandler} variant="flat" color="primary" size="small">
                    <Icon>add</Icon>
              	</Button>
				</Table.Cell>)
	}
}

const HeaderBtn = connect(state=>({idEditing:state.users.idEditing, canSave:state.users.canSave}),
	dispatch=>bindActionCreators({...Actions.users},dispatch) )(Header);

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        height:4
    },
});

class ContentUsers extends Component {
	state ={
		data:[],
		columns: [
	       
	        { name: 'description', title: 'Concepto'}, 
	        { name: 'amount', title: 'Cantidad' },
	        { name: 'expense_date', title: 'Fecha' },
	      ],
		tableColumnExtensions: [
        	// { columnName: 'first_name', width: 90 },
        	
      	],
      	selectCompt:[],
      	editingStateColumnExtensions: [
	         // { columnName: 'created_date', editingEnabled: false },
	         { columnName: 'id', editingEnabled: false },
	       
	     ],
		editingRowIds: [],
		addedRows: [],
		rowChanges: {},
		loading:false,
		
	}
	componentDidMount(){	
		
	}
	componentWillMount(){
		
	}
	changeAddedRows=(addedRows)=> {
		// const {idEditing, setIdEditing} = this.props;
		console.log(addedRows)
		// addedRows[0].modules = ['MODULE0','MODULE1'];
		// addedRows[0].comission = 1;
		const initialized = addedRows.map(row => (Object.keys(row).length ? row : { description: 'LUZ',
															expense_date:moment(),
															group:'debt', rxid: `DEBT_${new Date().getTime()}`, 
															amount:0, id:`DEBT_${new Date().getTime()}`, }));
		// if(initialized.length) setIdEditing('')
		this.setState({ addedRows:initialized });
	}
	changeRowChanges=(rowChanges)=> {
		
		console.log(rowChanges)
		this.setState({ rowChanges });
	}
	changeEditingRowIds=(editingRowIds)=> {
		console.log(editingRowIds)
		this.setState({ editingRowIds });
	}
	commitChanges({ added, changed, deleted }){
		const {addExpense, deleteExpense, updateCollection, resetPagination, data} = this.props;
		console.log({ added, changed, deleted })

		if(added){
			resetPagination([null])
			added.map(expense=>{ 
				expense.expense_date = expense.expense_date.toISOString();
				addExpense(expense) 
			})
		}
		if(changed){
			Object.keys(changed).map(i=>{ 
				if(changed[i].expense_date) changed[i].expense_date = changed[i].expense_date.toISOString();
				updateCollection( {row:data[i], fields:changed[i]} ) 
			} )
		}
		if(deleted){
			deleted.map(i=>deleteExpense(data[i].id))
		}
	}
	
	handleReset=(userId)=>{
		console.log(userId);
		
	}
	
	
	
    render() {
        const { classes, detail, loading, data  } = this.props;
	    const { hoverValue} = this.state;
	    const { handleSubmit, pristine, reset, submenu, dates, 
	    	rowsPerPage, page, submitting, columns,
	    	 selection , tableColumnExtensions } = this.state
	    const count = page*rowsPerPage;
	   	const key = (data[0])?data[0].id:'no-data'; 
        return (

        	<div>
        	
    		<Paper>
    		      {loading && <LinearProgress/>}
                <Grid
                  rows={data}
                  columns={columns}
                >

                 
                  { editProvider('numbers', ['amount'] , {},key ) }
                  { editProvider('upper', ['description'] , {}, key ) }
                  
                  { editProvider('date', ['expense_date'] , {disablePast:false}, key) }
                  
                 
                  <EditingState
		            editingRowIds={this.state.editingRowIds}
		            onEditingRowIdsChange={this.changeEditingRowIds}
		            rowChanges={this.state.rowChanges}
		            onRowChangesChange={this.changeRowChanges}
		            addedRows={this.state.addedRows}
		            onAddedRowsChange={this.changeAddedRows}
		            onCommitChanges={this.commitChanges.bind(this)}
		            columnExtensions={this.state.editingStateColumnExtensions}
		          />
                  
                  <Table
                    columnExtensions={tableColumnExtensions}
                    
                  />
                   <TableHeaderRow  />

                   <TableEditRow />
		          <TableEditColumn
		          	cellComponent={props=><Buttons {...props} />}
		          	headerCellComponent={props=><HeaderBtn {...props} />}
		          	showAddCommand
		            showEditCommand
		            showDeleteCommand
		          />


                </Grid>
    		                
    		          
    		</Paper>
    		</div>
        	
          
        );
    }
}
const comp =  withStyles(styles)(ContentUsers);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...Actions.loading, ...Actions.debts, ...Actions.clients}, dispatch);
}
const mapStateToProps = (state) => {
    return {
    	loading: state.loading.loading,
    	data: state.debts.data,
    		
    		
    }
}
const connectedComponet = connect(mapStateToProps,mapDispatchToProps)(comp);
export default connectedComponet ;
