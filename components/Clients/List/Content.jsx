import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import Menu, { MenuItem } from 'material-ui/Menu';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import AccountCircle from 'material-ui-icons/AccountCircle';
import { Field, reduxForm, getFormValues, initialize, destroy } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {nationalID} from '../../../utils/normalizer';
import * as Actions from '../../../actions';
import { formNames } from '../../../utils/const';
import moment from '../../../utils/date';

import Table, {TablePagination, TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import es_ES from 'rc-calendar/lib/locale/es_ES';
import DateRange from '../../custom/DateRange';
import { LinearProgress } from 'material-ui/Progress';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import TableApproved from './TableApproved';
import PaymentHistory from './PaymentHistory';



const styles = theme => ({
  root: {
    width: '100%',
    // marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  msg: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    textAlign: 'center',
    fontWeight: 'bold',
  }),
  queries: {
    width: 500,
  }
});


class ListClientsBar extends Component {
  
  // handleOnChange = prop => event => {
  //  this.setState({ [prop]: event.target.value })
  // }
  state = {
    value: [moment().subtract(7,'days'), moment().add(1, 'days')],
    hoverValue: [],
    page: 0,
    query:0,
    rowsPerPage: 5,
    indexes:[null]
  }
  componentDidUpdate(){
    console.log('updated ...')
  }
  componentWillMount(){
    // submenu according to user 


    console.log('will mount ...')


  }
  componentWillUnmount() {
    this.props.setUnsubscribe();
  }
  componentDidMount() {

    const {submenu} = this.props;
    this.queryOfSubmenu(submenu);
    
    
}
  
  handleClick = ()=>{
    const {dispatch} = this.props;
    dispatch(initialize(formNames.Clients,formNames.initialValues ) ); 
    dispatch({type:'CLEAR_DISABLED_FIELDS', meta:{scope:'local'}})
  }
  handleOnSubmit = () =>{
        const {getClients, formValues} = this.props;
        getClients({ client:formValues.search_id, disabled:true, form:formNames.Clients });
  }
  onHoverChange = (hoverValue) => {
    this.setState({ hoverValue });
  }
  queryOfSubmenu=(submenu)=>{
    const {setSubscribe, setPropertie} = this.props;
      switch(submenu){
        case 0:
        // if(admin) setPropertie('SET_DETAIL',true)
            setPropertie('SET_DETAIL',true)
            setSubscribe({unsubscribe:1,query:{approved:{$eq:false}},addDate:1 } )
        break;
        case 1:
            setPropertie('SET_DETAIL',false)
            setSubscribe( {unsubscribe:1,query:{notify:{$eq:true}}, addDate:0 } )
        break;
        case 2:
            setPropertie('SET_DETAIL',false)
            setSubscribe( {unsubscribe:1,query:{group:{$eq:'payment'}}, collection:'payment',addDate:1 } )
        break;
    }
  }
  onChange = (event,submenu) => {
    // console.log(this);
    const {setPropertie} = this.props;

    setPropertie('SET_SUBMENU',submenu)
    this.queryOfSubmenu(submenu);
    this.getSubmenu(submenu);
    
  }
  onChangeCalendar = value=>{ this.props.setPropertie('SET_DATE', value) }

  onSearch=()=>{
    const {selector} = this.props;
    

    this.props.setSubscribe({unsubscribe:1,query:{}, addDate:1 });

  }
  getSubmenu=(data)=>{
    switch(this.props.submenu){

      case 0:
        return <TableApproved data={data} ></TableApproved>
      
      case 1:
        return <PaymentHistory data={data} ></PaymentHistory>
      case 2:
        return <TableApproved data={data} ></TableApproved>
    }
  }
  handleChangeRowsPerPage = event => {
    this.props.setPropertie('SET_INDEXES', [null]);
    this.props.setPropertie('SET_ROWSPERPAGE', event.target.value );
    this.props.setPropertie('SET_PAGE', 0 );
    this.manageChanges()

    // this.setState({ indexes:[null],rowsPerPage: event.target.value,page:0 }, );
  };
  manageChanges=()=>{
    
        const {selector, unsubscribe, collection, addDate} = this.props;
        console.log('wtf')
        
        this.props.setSubscribe({unsubscribe,query:selector, addDate, collection })
  }
  handleChangePage = (event, page) => { 
        this.props.setPropertie('SET_PAGE',page)
        this.manageChanges();
    
  };
  
  render() {
    const { classes, detail } = this.props;
    const { hoverValue} = this.state;
    const { handleSubmit, pristine, reset, submenu, dates, rowsPerPage, page, submitting, data, loading } = this.props
    const count = page*rowsPerPage;
    // console.log(this.state)
    const calendar = (<RangeCalendar
                hoverValue={hoverValue}
                onHoverChange={this.onHoverChange}
                showWeekNumber={false}
                dateInputPlaceholder={['start', 'end']}
                defaultValue={[moment(), moment().add(1, 'months')]}
                locale={es_ES}
                
              />)
    return(
        <Grid container >
            
            <Grid item>
                <DateRange calendar={ calendar } value={dates}  onChange={ this.onChangeCalendar } />
            </Grid>
            <Grid item>
                <Button onClick={this.onSearch} variant="raised" color="primary" size="small">
                    <Icon>search</Icon>
                </Button>
            </Grid>
            <Grid item xs={12}>
                <BottomNavigation
                    value={submenu}
                    onChange={this.onChange}
                    showLabels
                    className={classes.queries}
                  >
                    <BottomNavigationAction value={0} label="Pendientes Aprobación"  />
                    <BottomNavigationAction value={1} label="Pendientes Cobro"  />
                    <BottomNavigationAction value={2} label="historial pagos" />
                </BottomNavigation>
            </Grid>
            <TablePagination
              component="div"
              count={count + data.length}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage={"Filas"}
              rowsPerPageOptions={[5,10,15]}
              labelDisplayedRows={()=>{return ''}}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
            <div style={{width:'100%'}} >
                {this.getSubmenu(data)}
            </div>
            
        </Grid>

      )
  }
}

// const middleFunc = reduxForm({
//                       form: formNames.clientsBar,
//                       initialValues: {search_id:''},
//                       validate,
//                     })(withStyles(styles)(SearchClientsBar))

const comp =  withStyles(styles)(ListClientsBar);

const mapStateToProps = (state) => {
    
    return {
        data: state.clients.listOfClients,
        selector:state.clients.selector,
        unsubscribe:state.clients.unsubscribe,
        submenu:state.clients.submenu,
        detail:state.clients.detail,
        collection:state.clients.collection,
        dates:state.clients.dates,
        page:state.clients.page,
        rowsPerPage:state.clients.rowsPerPage,
        addDate:state.clients.selector,
        loading:state.loading.loading,
    };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({...Actions.clients}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)( comp );