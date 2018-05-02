
// Redux Form Normalizers
import math from './math';

export const upper = value => value && value.toUpperCase();

export const lower = value => value && value.toLowerCase();

export const lessThan = otherField =>
  (value, previousValue, allValues) => value < allValues[otherField] ? value : previousValue ;

export const greaterThan = otherField =>
  (value, previousValue, allValues) => value > allValues[otherField] ? value : previousValue ;

export const normalizePhone = (value, previousValue) => {
  if (!value) {
    return ""
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 3) {
      return onlyNums + '-'
    }
    if (onlyNums.length === 6) {
      return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3) + '-'
    }
  }
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 6) {
    return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3)
  }
  return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3, 6) + '-' + onlyNums.slice(6, 10)
} ;

export const onlyNums = value => value.replace(/[^\d]/g, '');

export const parseOnBlur = (event,self) =>{ 
	const {form, change} = self.props;
	const field = `${event.target.name}`;
	// console.log(self,field); 
	event.preventDefault(); 
	const value = parseFloat(event.target.value);
	change(field, (isNaN(value))?0:value )  
}

export const onlyDigits = value => {
	value = value.replace(/[^0-9.]/g, '') // Remove all chars except numbers and .

	// Create an array with sections split by .
  if(!value) return 0;
	const sections = value.split('.')

	// Remove any leading 0s apart from single 0
	if (sections[0] !== '0' && sections[0] !== '00') {
		sections[0] = sections[0].replace(/^0+/, '')
	} else {
		sections[0] = '0'
	}

	// If numbers exist after first .
	if (sections[1]) {
	// Join first two sections and truncate end section to length 2
		return sections[0] + '.' + sections[1].slice(0, 2)
	// If original value had a decimal place at the end, add it back
	} else if (value.indexOf('.') !== -1) {
		return sections[0] + '.'
	// Otherwise, return only section
	} else {
		return sections[0]
	}
}
export const nationalID = (value, previousValue) =>{
	if (!value) {
    return ""
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 3) {
      return onlyNums + '-'
    }
    if (onlyNums.length === 10) {
      return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3) + '-'
    }
  }
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 10) {
    return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3)
  }
  return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3, 10) + '-' + onlyNums.slice(10, 11)
}