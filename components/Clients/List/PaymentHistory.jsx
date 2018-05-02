import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../actions';
import { withStyles } from 'material-ui/styles';
const GridUI =  require('material-ui/Grid').Grid;
import { LinearProgress } from 'material-ui/Progress';

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

import { RowDetailState } from '@devexpress/dx-react-grid';

import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';
import {
  SortingState,
} from '@devexpress/dx-react-grid';


const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  }
});


class TableApproved extends Component {
    state={
        columns: [
        { name: 'client_id', title: 'Cédula' },
        { name: 'created_date', title: 'Fecha' },
        { name: 'amount', title: 'Monto' },
        { name: 'approved', title: 'Aprobar' },
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
      // loading: true,
    }
    setStateAsync(state) {
      return new Promise((resolve) => {
        this.setState(state, resolve)
      });
    }
    async componentDidMount(){
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
    
    rowDetail = ({ row }) =>{ 
      
      
       console.log('return rowDetail')
        
        return ( [<Client row={row} key='client12' start="true" />,
                <Ref row={row} key="ref_client" headerTitle="Referencia Cliente" foreinKey="client_id_" />,
                <Business row={row} key="business_client" headerTitle="Negocio Cliente" foreinKey="client_id_.ref_negocio_" />,
                <Guarantor row={row} key='guarantor' />,
                <Ref row={row} key="ref_guarantor"  headerTitle="Referencia Fiador" foreinKey="guarantor_" />,
                <Business row={row} halt="true" key="business_guarantor" headerTitle="Negocio Fiador" foreinKey="guarantor_.business_" />

                ] )
      
    }

    render() {
        const {loading, data, classes,sorting, detail} = this.props;
        const {
          rows,
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
                <div>Payment</div>
                <Grid
                  rows={data}
                  columns={columns}
                >
                  { createProvider('numbers', ['amount'] ) }
                  { createProvider('date', ['created_date'] ) }
                  

                  { detail && <RowDetailState
                    expandedRowIds={expandedRowIds}
                    onExpandedRowIdsChange={this.changeExpandedDetails}
                  /> }
                  <Table
                    columnExtensions={tableColumnExtensions}
                    
                  />
                  <TableHeaderRow  />
                  {detail &&<TableRowDetail
                    contentComponent={this.rowDetail}
                    
                  />}
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
