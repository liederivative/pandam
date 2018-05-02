
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import NumbersDisplay from '../../custom/NumbersDisplay';
import React, { Component } from 'react';
import Button from 'material-ui/Button';
import moment from '../../../utils/date';
import {onlyDigits,normalizePhone,nationalID, onlyNums, upper} from '../../../utils/normalizer';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import Menu, { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Switch from 'material-ui/Switch';
import Checkbox from 'material-ui/Checkbox';
import Icon from 'material-ui/Icon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DatePicker from 'rc-calendar/lib/Picker';
import Calendar from 'rc-calendar';
import es_ES from 'rc-calendar/lib/locale/es_ES';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';
import {searchUser, setIdEditing} from '../../../actions/users';


// const store = require('electron').remote.getGlobal('reduxStore');

// class loginInput extends Component {

//     render() {
//     	const {value, onChangeHandler, idEditing, isNew, canSave,row, setIdEditing, searchUser} = this.props
//     	console.log(value)
//         return (
//         	<FormControl  style={{width:'100%'}} error={ ( !canSave) } aria-describedby="text-field">
	            
// 	            <Input value={value} onBlur={ event=>{ console.log('blur') } } 

// 	            onChange={event=>{ onChangeHandler(event)} } />

// 	            <FormHelperText id="name-helper-text">{ ( (!canSave && idEditing === row.id && !isNew ) && <span>Usuario ya existe</span>) }</FormHelperText>
// 	          </FormControl>
//         );
//     }
// }
// const LoginInput = connect(state=>{ return {idEditing:state.users.idEditing, canSave:state.users.canSave} } ,
// 	dispatch=>bindActionCreators({setIdEditing,searchUser},dispatch) )(loginInput)

const cases = {

	numbers: function ( param ){
		let value = param.value;

		return (<b>
				<NumbersDisplay>{value}</NumbersDisplay>
			</b>)
	},
	date: function ( param ){
		// console.log(param)
		let value = moment( param.value );

		return (<span>
				{ value && value.fromISOtoDR().format('DD-MMM-YYYY') }
			</span>)
	},
	button: function ( {value, row, column} ){
		
		const {onClick, title } = propsComponent[column.name];
		// console.log(propsComponent,row.id)
		return ( <Button onClick={ ()=>{onClick(row.id)}   } >
				{title}
				</Button>)
	},
	select: ({value, row, column })=>{ 
		const {array} = propsComponent[column.name] ; 

		let obj = (typeof value !== 'undefined')?array.find( e=>value===e.value ):{text:''} 
		
		return (<div>{`${obj.text}`}</div>)
	},
	phone: ({value, row, column })=> (<div>{value}</div>) ,
	id: ({value})=> (<div>{value}</div>) ,
	integer:({value})=> (<div>{value}</div>),
	check: ({value, row, column})=>{
		return (<Switch
                checked={propsComponent[column.name].checked.indexOf(row.id) !== -1}
                onChange={ event=>{ propsComponent[column.name].onChange(row.id, event.target.checked)} }
                tabIndex={-1}
                disableRipple
              />)
	},
	multipleSelect: ({value, row, column})=>{
		const {array} = propsComponent[column.name]; 
		return( <div> {value.map(module=><div key={module}>{array[module]}</div>) } </div> ) 
	},
	upper: ({value, row, column})=>{
		return (<div><strong>{value}</strong></div>)
	}
}

const editors = {

	select: function ( { value, onValueChange, column, row } ){

		const {array} = propsComponent[column.name]; 

		if(typeof value ==='undefined') value = 0;
		return (<Select
			input={<Input/>}
			value={value}
			onChange={ event=>{ onValueChange( event.target.value )} }
			style={{width:'100%'}}
		>
			{array.map( item =>
                        <MenuItem key={item.text+item.value} value={item.value}>{item.text}</MenuItem>
            )}
		</Select>)
	},
	numbers: function ( {value, onValueChange } ) {
		const onChangeHandler =event=> onValueChange( parseFloat(onlyDigits(event.target.value)) )
		return editingInput(onChangeHandler, value)

	},
	phone: function ( {value, onValueChange } ) {
		const onChangeHandler =event=> onValueChange( normalizePhone(event.target.value) )
		return editingInput(onChangeHandler, value)

	},
	id: function ( {value, onValueChange } ) {
		const onChangeHandler =event=> onValueChange( nationalID(event.target.value) )
		return editingInput(onChangeHandler, value?value:' ')

	},
	integer: function ( {value, onValueChange } ) {
		const onChangeHandler =event=> onValueChange( parseFloat( onlyNums(event.target.value) ) )
		return editingInput(onChangeHandler, value?value:' ')

	},
	multipleSelect: function ({value, onValueChange, column, row}) {
		
		let {array} = propsComponent[column.name];
		if(!value) value = [];
		// console.log(value, array)
		let modules = Object.keys(array).sort();
		// value.sort();
		// console.log(value, modules)
		let shadowArray = {};
		for (var i = modules.length - 1; i >= 0; i--) {
			shadowArray[ modules[i] ] = value.indexOf(modules[i]) > -1 
		}
		
		
		
		const processChecks = (event,module)=>{
			var clone = [...value]
			var idx = clone.indexOf(module);
	        if (idx > -1) {
	          clone.splice(idx, 1);
	        }
	        else {
	          clone.push(module);
	        }
			onValueChange(clone);
		}
		return(
			<div style={{display:'flex'}}>
			<FormControl component="fieldset">
				<FormGroup>
				{modules.map( (module,i)=>(
								
							          <FormControlLabel
							          key={module}
							            control={
							              <Checkbox
							                checked={ shadowArray[module] }
							                onChange={ event=>processChecks(event,module) }
							                value={module}
							              />
							            }
							            label={array[module]}
							          />
							    	
								)
				)}
				</FormGroup>
			</FormControl>
			</div>

			)
	},
	upper: ({value, onValueChange, column, row})=>{

		const onChangeHandler =event=> onValueChange( upper(event.target.value) )
		return editingInput(onChangeHandler, value?value:' ')
	},
	date: ({value, onValueChange, column, row})=>{
		value = moment(value);
		let {disablePast} = propsComponent[column.name];
		// let {endAdornment , disabledDate } = propsComponent[column.name];
		const disabledDate = (!disablePast)?()=>{}:(current)=>current.startOf('day').isBefore(moment().startOf('day'));
		let onChange = (value)=>{onValueChange( (value === null)?moment():value ) }
		const calendar = (<Calendar disabledDate={disabledDate}  locale={es_ES} />)

		return (<DatePicker calendar={ calendar } value={value}  onChange={ onChange } >
        { ({value})=>{
            return (
                
                <Input
                  style={{ width: '100%' }}
                  readOnly
                  endAdornment={<InputAdornment position="end"><Icon >today</Icon></InputAdornment>}
                  className=""
                  value={value && value.format('DD-MMM-YYYY' || '')}
                />
                
                )}
        } 
        </DatePicker>)
	}
}
const editingInput=(onChangeHandler,value)=><div> <Input style={{width:'100%'}} value={value} onChange={event=>onChangeHandler(event)} /> </div>
let propsComponent={};

export const createProvider = function (type,field, props, key){
		propsComponent[field[0]] = props;
		return (<DataTypeProvider
						key={`${key}.${type}.${field}`}
						formatterComponent={ cases[type] }
						 for={field}
						 	{...props}
						  />)
}

export const editProvider = function (type, field, props,key) {
	propsComponent[field[0]] = props;
		return (<DataTypeProvider
						{...props}
						key={`${key}.${type}.${field}`}
						formatterComponent={ cases[type] }
						for={field}
						editorComponent={ editors[type] }
						 	
						  />)
	
}