
import Big from './big';

function un2Int(obj) {
    return obj ? obj : 0;
}
function round2(num){
   return Math.ceil(num * 100) / 100;
}
const shift = function (number, precision, reverseShift) {
	    if (reverseShift) {
	      precision = -precision;
	    }  
	    let numArray = ("" + number).split("e");
	    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
	  }
const round = function (number, precision) {
	  
	  return shift(Math.round(shift(number, precision, false)), precision, true);
	}

Big.Big.prototype.rate= function (){ return this.div(100) }

const checkifValid=(array)=>{
	try{
		for (var i = array.length - 1; i >= 0; i--) {
			parseFloat(array[i]) 
		}
		return true;
	}catch(e){
		console.log(e)
		return false 
	}
} 

const calcFee=(amount = 0, freq = 1)=>{ 

	if (!checkifValid([amount,freq])) return 0;
	
	return parseFloat( Big(amount).div(freq).round(2,3) ) 
}

const sumRate=(amount = 0, rate = 1)=>{

	if (!checkifValid([amount,rate])) return 0;
	
	return parseFloat( Big(rate).rate().plus(1).times(amount) )
}

const calcTotalFee=(amount=0,rate =1,freq =1)=>{

	console.log(amount,freq,rate)

	// if (!checkifValid([amount,freq,rate]) return 0;

	return parseFloat( calcFee( sumRate(amount,rate) , freq ) )
}

const math = {
	
	Big,
	calcFee,
	sumRate,
	calcTotalFee

}




module.exports = math;