import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../actions';
import { withStyles } from 'material-ui/styles';
const GridUI =  require('material-ui/Grid').Grid;
import { LinearProgress } from 'material-ui/Progress';
// import Table, {TablePagination, TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { CircularProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import moment from '../../../utils/date';
import Paper from 'material-ui/Paper';
import NumbersDisplay from '../../custom/NumbersDisplay';
import Client from './ClientTable';
import Guarantor from './GuarantorTable';
import Ref from './RefTable';
import Business from './BusinessTable';
import Button from 'material-ui/Button';
import {createProvider} from './formatters';
import Icon from 'material-ui/Icon';
import Loan from '../../custom/BaseLoan';
import { RowDetailState } from '@devexpress/dx-react-grid';
import { getFormValues  } from 'redux-form';

import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
  TableSelection
} from '@devexpress/dx-react-grid-material-ui';
import {
  SortingState,
  IntegratedSelection,
  SelectionState
} from '@devexpress/dx-react-grid';
// import {
//   SortingState,
//   IntegratedSorting,
// } from '@devexpress/dx-react-grid';


const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  }
});
// const SaleAmountCell = ({ value }) => (
//   <Table.Cell
//     style={{ textAlign: 'right' }}
//   >
//     ${value}
//   </Table.Cell>
// );
// const Cell = (props) => {
//   if (props.column.name === 'SaleAmount') {
//     return <SaleAmountCell {...props} />;
//   }
//   return <Table.Cell {...props} />;
// };


class TableApproved extends Component {
    state={
        columns: [
        { name: 'client_id', title: 'Cédula' },
        { name: 'created_date', title: 'Fecha' },
        { name: 'amount', title: 'Monto' },
        { name: 'approved', title: 'Estado' },
        { name: 'no', title: 'Editar' },
      ],
      tableColumnExtensions: [
        // { columnName: 'id', width:130 },
        { columnName: 'SaleAmount', align: 'right' },
      ],
      sorting: [{ columnName: 'id', direction: 'asc' }],
      totalCount: 5,
      pageSize: 10,
      pageSizes: [5, 10, 15],
      currentPage: 0,
      expandedRowIds: [],
      rowValue:[],
      checked:[],
      selection: [],
      // loading: true,
    }
    setStateAsync(state) {
      return new Promise((resolve) => {
        this.setState(state, resolve)
      });
    }
    async componentDidMount(){
      const {data} =  this.props;
      const checked = data.map(r=>r.id);
      this.setState({checked})
        console.log('mounted ...')
        
    }
    componentDidUpdate(){
        console.log('updated ...')
       
    }
    
    changeSorting(sorting) {
        const{setSelector,setPropertie,setSubscribe} = this.props;
        // setPropertie('SET_SORTING',sorting);
        
    }
    changeExpandedDetails=(expandedRowIds)=>{
        this.setState({ expandedRowIds });
    }

    handleApproval = (value)=>{

        const {approveLoan} = this.props;
        // console.log(value)
        approveLoan(value)
    }
    handleEditLoan = (value)=>{

      const { checked } = this.state;
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      this.setState({
        checked: newChecked,
      });
      this.rowDetail
      
    }
    newRow = ({ row })=>{
      return <div>Prestamo</div>
    }
    getTableRowDetail=()=>{



    }
    changeSelection=(selection)=>{
      console.log(selection)
      this.setState({ selection })
    }
    rowDetail = ({ row }) =>{ 
        const {checked} = this.state;
        const {initializeForm, updateCollection } = this.props;
        console.log(this)
        const form = `editLoan.${row.id}`;
        const {applied_cierre, created_date, gasto_cierre, amount, type,rate ,start_date,warranty_description} = row;

        const initValues = {form:form, 
          data:{loan_applied_cierre:applied_cierre, 
            created_date, 
            loan_gasto_cierre:gasto_cierre,
            loan_amount:amount,
            loan_type:type,
            loan_rate:rate,
            loan_start_date:start_date,
            loan_warranty_description:warranty_description}  
          }
       console.log('return rowDetail');
       const currentIndex = !(checked.indexOf(row.id) !== -1);
        
        return (currentIndex)?( [<Client row={row} key='client12' start="true" />,
                <Ref row={row} key="ref_client" headerTitle="Referencia Cliente" foreinKey="client_id_" />,
                <Business row={row} key="business_client" headerTitle="Negocio Cliente" foreinKey="client_id_.ref_negocio_" />,
                <Guarantor row={row} key='guarantor' />,
                <Ref row={row} key="ref_guarantor"  headerTitle="Referencia Fiador" foreinKey="guarantor_" />,
                <Business row={row} halt="true" key="business_guarantor" headerTitle="Negocio Fiador" foreinKey="guarantor_.business_" />

                ] ):(<div>
                     
                      <div>
                        <Button onClick={()=>{
                            
                            updateCollection({row,form});
                        }
                        } >
                          <Icon>save</Icon>
                        </Button>
                      </div>
                       <Loan initValues={ initValues } formName={form}></Loan>
                    </div>)
      
    }

    render() {
        const {loading, data, classes,sorting, detail} = this.props;
        const {
          rows, checked, selection,
          columns,
          tableColumnExtensions,
          pageSize,
          pageSizes,
          currentPage,
          totalCount,
          expandedRowIds
        } = this.state;
        
        return (
            <Paper>
                {loading && <LinearProgress/>}
                <Grid
                  rows={data}
                  columns={columns}
                >
                  { createProvider('numbers', ['amount'] ) }
                  { createProvider('date', ['created_date'] ) }
                  { createProvider('button', ['approved'] ,{ title:'Aprobar', onClick:this.handleApproval } ) }
                  { createProvider('check', ['no'] ,{ onChange:this.handleEditLoan, checked } ) }

                  { detail && <RowDetailState
                    expandedRowIds={expandedRowIds}
                    onExpandedRowIdsChange={this.changeExpandedDetails}
                  /> }
                  <SelectionState
                    selection={selection}
                    onSelectionChange={this.changeSelection}
                  />
                  <IntegratedSelection />
                  <Table
                    columnExtensions={tableColumnExtensions}
                    
                  />
                  <TableHeaderRow  />
                  {detail &&<TableRowDetail
                    contentComponent={this.rowDetail.bind(this)} />}
                    <TableSelection showSelectAll />
                </Grid>
                
          
        </Paper> 
        );
    }
}
const comp =  withStyles(styles)(TableApproved);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...Actions.loading,...Actions.clients}, dispatch);
}
const mapStateToProps = (state) => {
  return {
    loading: state.loading.loading,
    sorting:state.clients.sorting,
    detail:state.clients.detail

}
}
const connectedComponet = connect(mapStateToProps,mapDispatchToProps)(comp);
export default connectedComponet ;


// <Paper  className={classes.root}>
//             {loading && <LinearProgress/>}
//             { data && 
//             (data.length)?<Table component="div" className={classes.table}>
//                 <TableHead component="div">
                
//                     <TableRow component="div">
//                         <TableCell  component="div">Cédula</TableCell>
//                         <TableCell  component="div">Nombre</TableCell>
//                         <TableCell  component="div">Monto</TableCell>
//                         <TableCell  component="div"></TableCell>
//                         <TableCell  component="div">Ver Detalles</TableCell>
//                     </TableRow>
                
                  
//                 </TableHead>
//                 <TableBody component="div">
//                   { data.map(n => {
//                     return (
                        
//                       <TableRow component="div" key={n.id}>
//                         <TableCell component="div">{n.id}</TableCell>
//                         <TableCell component="div" >{n.created_date && moment(n.created_date).format('DD-MMM-YYYY') }</TableCell>
//                         <TableCell component="div" numeric><NumbersDisplay>{n.amount}</NumbersDisplay></TableCell>
//                         <TableCell component="div" >
//                             <Button variant="raised" color="primary" size="small"> Aprobar </Button>
//                         </TableCell>
//                         <TableCell component="div" ></TableCell>
//                       </TableRow>
                      
//                     );
//                   })}

//                 </TableBody>
//             </Table>: (!loading && <Typography className={classes.msg} component="p">
//                       Vaya, no hubo resultado ...
//                     </Typography>)
//             }
//         </Paper>   