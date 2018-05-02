import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../actions';
import {estadoCivil, local} from '../../../utils/const';
import {editProvider} from './formatters';

import { withStyles } from 'material-ui/styles';


import Paper from 'material-ui/Paper';
import { DataTypeProvider, EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';

import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Menu, { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';

const db = require('electron').remote.getGlobal('db');

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    }
});


class Buttons extends Component {

	onClickHandler=( event,execute )=>{
		console.log('execute')
		execute(event)
	}
    render() {
    	// console.log(this)
    	const {children} = this.props;
    	const icon = (children[0])?'edit':'save';
    	const component = (children[0])?children[0]:children[2];
        return (
        	<Table.Cell
			    style={{ textAlign: 'center' }}
			  >
			 <Button onClick={ event=>this.onClickHandler(event,component.props.onExecute) } variant="flat" color="primary" size="small">
                    <Icon>{icon}</Icon>
              </Button>
              {children[3] &&  <Button onClick={ event=>this.onClickHandler(event,children[3].props.onExecute) } variant="flat" color="primary" size="small">
                    <Icon>cancel</Icon>
              </Button>}
        	</Table.Cell>
        );
    }
}
class Header extends Component {
	render(){
		return (<Table.Cell>{this.props.name}</Table.Cell>)
	}
}
const getRowId = row => row.id;

class EditBaseTable extends Component {

	state={
		loading:true
	}
	constructor(props){
		super(props);
	}

	
	commitChanges({ added, changed, deleted }) {
		console.log('commiting change', changed)
		const {updateCollection, row } = this.props;

		const keys = Object.keys(changed);
		const fields = changed[keys[0]];

		const srow = row.find(r=>r.id === keys[0])
		console.log(srow);


		
		if(!fields) return;
		
		updateCollection({ row:srow,fields })
		
		
		
			
		


	}


    render() {
        const {loading, row, headerTitle, fieldProviders} = this.props;
        
        const { rows, columns, tableColumnExtensions,
        	editingStateColumnExtensions , selectCompt,
        	editingRowIds, rowChanges, addedRows, changeEditingRowIds, 
        	changeRowChanges, changeAddedRows
    			} = this.props;
        // console.log(row)
        return (
        	<Paper>
		      <Grid
		          rows={row}
		          columns={columns}
		          getRowId={getRowId}
		        >
		          {fieldProviders}
		     	
		          <EditingState
		            editingRowIds={editingRowIds}
		            onEditingRowIdsChange={changeEditingRowIds}
		            rowChanges={rowChanges}
		            onRowChangesChange={changeRowChanges}
		            addedRows={addedRows}
		            onAddedRowsChange={changeAddedRows}
		            onCommitChanges={this.commitChanges.bind(this)}
		            columnExtensions={editingStateColumnExtensions}
		          />
		          <Table
		            columnExtensions={tableColumnExtensions}
		          />
		          <TableHeaderRow />
		          <TableEditRow />
		          <TableEditColumn
		          	cellComponent={props=><Buttons {...props} />}
		          	headerCellComponent={props=><Header name={headerTitle} {...props} />}
		            showEditCommand
		            showDeleteCommand
		          />
		        </Grid>
		    
	      </Paper>
          	
        );
    }
}
const comp =  withStyles(styles)(EditBaseTable);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...Actions.loading, ...Actions.clients}, dispatch);
}
const mapStateToProps = (state) => {
    return {loading: state.loading.loading}
}
const connectedComponet = connect(mapStateToProps,mapDispatchToProps)(comp);
export default connectedComponet ;
