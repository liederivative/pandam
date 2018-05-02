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
import GridUI from 'material-ui/Grid';
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
			    style={{ textAlign: 'center' }}
			  >
			 <Button onClick={ event=>this.onClickHandler(event,component.props.onExecute,icon) } variant="flat" color="primary" size="small">
                    <Icon>{icon}</Icon>
              </Button>
              {children[1] && <Button onClick={ event=>this.onClickHandler(event,children[1].props.onExecute) } variant="flat" color="primary" size="small">
                    <Icon>delete</Icon>
              </Button>}
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
		const {canSave, idEditing} =this.props;
		if(canSave && idEditing){
			addBtn.onExecute(event);

		}
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
    }
});

class ContentUsers extends Component {
	state ={
		data:[],
		columns: [
	        { name: 'id', title: 'Login'}, 
	        { name: 'name', title: 'Nombre'}, 
	        { name: 'comission', title: 'Comisión %' },
	        { name: 'created_date', title: 'Fecha Creación' },
	        { name: 'modules', title: 'Permisos' },
	        { name: 'not', title: 'Contraseña' },
	      ],
		tableColumnExtensions: [
        	// { columnName: 'first_name', width: 90 },
        	
      	],
      	selectCompt:[],
      	editingStateColumnExtensions: [
	         { columnName: 'created_date', editingEnabled: false },
	         { columnName: 'id', editingEnabled: false },
	         { columnName: 'not', editingEnabled: false },
	     ],
		editingRowIds: [],
		addedRows: [],
		rowChanges: {},
		loading:false,
		selection: [],
		
	}
	componentDidMount(){
		this.props.getListUsers();
	}
	componentWillMount(){
		this.props.setUnsubscribeUsers();
	}
	changeAddedRows=(addedRows)=> {
		const {idEditing, setIdEditing} = this.props;
		console.log(addedRows)
		// addedRows[0].modules = ['MODULE0','MODULE1'];
		// addedRows[0].comission = 1;
		const initialized = addedRows.map(row => (Object.keys(row).length ? row : { modules: ['MODULE1','MODULE3'],
															group:'user', rxid: idEditing, 
															comission:0, id:idEditing, }));
		if(initialized.length) setIdEditing('')
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
		const {addUser, deleteUser, updateCollection, data} = this.props;
		console.log({ added, changed, deleted })

		if(added){
			added.map(user=>addUser(user))
		}
		if(changed){
			Object.keys(changed).map(i=>updateCollection( {row:data[i], fields:changed[i]} ) )
		}
		if(deleted){
			deleted.map(i=>deleteUser(data[i].id))
		}
	}
	onInputChage=(event)=>{
		const {setIdEditing, searchUser} = this.props;
		const newId = upper(event.target.value) 
		setIdEditing(newId);
		searchUser(newId);
		

	}
	onInputBlur=(event)=>{
		console.log(this)
		const {searchUser, idEditing} = this.props;
		if(idEditing) searchUser(idEditing);
	}
	handleReset=(userId)=>{
		console.log(userId);
		this.props.resetPwd(userId);
	}
    render() {
        const { classes, detail, loading, searchUser, canSave, data, idEditing } = this.props;
	    const { hoverValue} = this.state;
	    const { handleSubmit, pristine, reset, submenu, dates, 
	    	rowsPerPage, page, submitting, columns,
	    	 selection , tableColumnExtensions } = this.state
	    // const count = page*rowsPerPage;
	    let advise;
	    if(!canSave && idEditing ) advise = "Usuario ya existe"
	    if(!idEditing ) advise = "Necesita un usuario antes de añadir"
	    
        return (
        	<div>
        	<GridUI container >
        		<GridUI item xs={3}>
        			<FormControl   error={ ( !canSave) } aria-describedby="text-field">
	            		<InputLabel htmlFor="newId">ID Nuevo Usuario</InputLabel>
			            <Input value={idEditing} 

			            onChange={ this.onInputChage } />

			            <FormHelperText id="name-helper-text"><span>{advise}</span></FormHelperText>
			         
		          </FormControl>
        		</GridUI>
        	</GridUI>
    		<Paper>
    		                {loading && <LinearProgress/>}
                <Grid
                  rows={data}
                  columns={columns}
                >

                  { editProvider('multipleSelect', ['modules'] , {array:userMapping} ,'lakdlkja' ) }
                  { editProvider('numbers', ['comission'] , 'uiuri' ) }
                  { createProvider('login', ['id']  ) }
                  { createProvider('date', ['created_date'] ) }
                  { createProvider('button', ['not'] ,{ title:'Reset', onClick:this.handleReset } ) }
                 
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
    return bindActionCreators({...Actions.loading, ...Actions.users, ...Actions.clients}, dispatch);
}
const mapStateToProps = (state) => {
    return {loading: state.loading.loading,
    		canSave:state.users.canSave,
    		idEditing:state.users.idEditing,
    		data:state.users.data,
    		
    }
}
const connectedComponet = connect(mapStateToProps,mapDispatchToProps)(comp);
export default connectedComponet ;
