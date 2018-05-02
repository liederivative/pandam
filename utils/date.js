
const moment  = require('moment-timezone');

const holidays = require('./moment-holidays') ;
holidays();

moment.modifyHolidays.add("dominicana");

// console.log( moment('2018-12-25').isHoliday() );
//  Africa/Accra
moment.tz('2018-05-01T02:57:08.501Z','America/Santo_Domingo').format
moment.fn.getNextWorkDays = function (count, format) {
    // console.log(this)
    if (!count) { count = 5; }
    if (!format) { format = 'dddd, MMMM Do YYYY'; }

    let days = [];
    let d = this.startOf('day');
  
    for (let i = 0; i < count; i++) {
      d.add(1, 'day');
  
      if (d.day() === 0 || d.day() === 6 || d.isHoliday()) {
        count++;
        continue;
      }
      // days.push( (format)?moment(d).format(format):moment(d) );
    }
  
  // return days;
  return d;
}
moment.fn.fromISOtoDR = function (){
  let d = this;
  return moment.tz(d,'America/Santo_Domingo')
}
moment.fn.fromDRtoISO = function (){
  let d = this;
  return moment.tz(d,'Africa/Accra')
}
// console.log( moment('2018-12-21').getNextWorkDays().toString() );
moment.locale('es');

module.exports = moment;