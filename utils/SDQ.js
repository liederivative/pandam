//! moment-holiday.js locale configuration
//! locale : Argentina
//! author : NahuelOvejero : https://github.com/NahuelOvejero


function SDQ(moment) {

  moment.holidays = {};

  moment.holidays.dominicana = {
    "Año Nuevo": {
      date: '1/1',
      keywords: ['ano', 'new', 'year']
    },
    "Día de los Santos Reyes":{
      date: '1/6',
      keywords: ['festividad', 'cristina']
    },
    "Día de la Altagracia":{
      date: '1/21',
      keywords: ['festividad', 'cristina']
    },
    "Día de Duarte":{
      date: '1/29',
      keywords: ['patria', 'national']
    },
    "Día de la Independencia":{
      date: '2/27',
      keywords: ['independence']
    },
    "Día del Trabajo":{
      date: '5/1',
      keywords: ['independence']
    },
    "Día de la Restauración":{
      date: '8/16',
      keywords: ['independence']
    },
    "Día de las Mercedes":{
      date: '9/24',
      keywords: ['festividad', 'cristina']
    },
    "Día de la Constitución":{
      date: '11/5',
      keywords: ['independence']
    },
    "Viernes Santo": {
      date: 'easter-2',
      keywords: ['festividad', 'cristina']
    },
    "Día del Trabajador": {
      date: '5/1',
      keywords: ['labor', 'labour']
    },
    "Corpus Christi": {
      date: 'easter+60',
      keywords: ['festividad', 'cristina']
    },
    "Navidad": {
      date: '12/25',
      keywords: ['christmas']
    }
  };

}

module.exports = SDQ;