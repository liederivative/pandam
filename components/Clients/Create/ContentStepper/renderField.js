import React from 'react';
import Grid from 'material-ui/Grid';
import Select from 'material-ui/Select';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import Menu, { MenuItem } from 'material-ui/Menu';
import DatePicker from 'rc-calendar/lib/Picker';
import Calendar from 'rc-calendar';
import es_ES from 'rc-calendar/lib/locale/es_ES';
import moment from '../../../../utils/date';

const selectField = ({input,rest,array, disabled})=>{
    // console.log(input,array)
    
    return(
        <Select
            {...input}
            displayEmpty
            
            {...rest}
            disabled = { disabled }
          >
            {array.map( item =>
                        <MenuItem key={item.text+item.value} value={item.value}>{item.text}</MenuItem>
            )}
          </Select>

        )
} 

const datePicker = ({input,rest})=>{
  
    const {disabledDate}  = rest;
    
    const calendar = (<Calendar disabledDate={disabledDate}  locale={es_ES} />)
    let { value} = input;
    let onChange = (value)=>{ input.onChange( (value === null)?moment():value ) }
    console.log(value)
    if(!value || typeof value === 'string'){
        value = moment();
    }
    
    return (<DatePicker {...rest}  calendar={ calendar } value={value}  onChange={ onChange } >
        { ({value})=>{
            return (
                
                <Input

                  style={{ width: 150 }}
                  
                  readOnly
                  endAdornment={rest.endAdornment}
                  className=""
                  value={value && value.format('DD-MMM-YYYY' || '')}
                />
                
                )}
        } 
        </DatePicker>
    )
}
const textArea = ({input,rest})=>{
    return (                  
            <textarea {...input} {...rest} ></textarea>
        )

}   



const renderField = (fields) => {
    // console.log(fields)
    const { input, label, type, disabledProps,array, meta: { touched, error }, ...rest } = fields;
      let renderComponent = {};
      let firstField;
      if(rest.syncerrors){
        firstField = Object.keys(rest.syncerrors)[0];
        // console.log(firstField,input.name,error,(error && firstField === input.name  ));
      }
      const disabled = (rest.arraydis)?rest.arraydis.searchString(input.name):false;

        switch (type) {
            case 'select':
                renderComponent = selectField({rest,array,input, disabled});
                break;
            case 'date':
                renderComponent = datePicker({input,rest});
                break;
            case 'textarea':
                renderComponent = textArea({input,rest});
                break;
            default:
                // console.log(rest,input,disabledProps)
                
                renderComponent =  (<Input {...rest}
                  disabled={ (disabledProps || disabled )?true:false} 
                  id={label} {...input}  autoFocus={ (error && firstField === input.name  )?true:false } type={type} />)


        }

      return (
      <Grid container spacing={8} alignItems="center">
        
        <Grid item>
          <FormControl  error={ ( error)?true:false } aria-describedby="text-field">
            <InputLabel htmlFor={label}>{label}</InputLabel>
            { renderComponent }

            <FormHelperText id="name-helper-text">{ (error && <span>{error}</span>) }</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      )
    }

export default renderField;