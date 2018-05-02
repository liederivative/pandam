const moment = require('./date');
module.exports = {

	formNames: {

		Clients:'createClients',
		login:'login',
		clientsBar:'clientsBar',
		editLoan:'editLoan',
		initialValues: {marital_status:0,
                        place_status:0,
                        business_place_status:0,
                        guarantor_marital_status:0,
                        guarantor_place_status:0,
                        loan_type:0,
                        loan_start_date:moment(),
                        loan_rate:2,
                        loan_amount:100,
                        loan_gasto_cierre:100,
                        loan_applied_cierre:0,
                    }
	},

	estadoCivil: [
		{ text: 'Soltero/a',value:0 },
		{ text: 'Casado/a',value:1 },
		{ text: 'Divorciado/a',value:2 },
		{ text: 'Viudo/a',value:3 },
	],
	local:[
		{text:'N/A',value:0},
		{text:'Alquilado/a',value:1},
		{text:'Propio/a',value:2},


	],
	loanFrequency:[
		{ text: 'Diario',value:0 },
		{ text: 'Semanal',value:1 },
		{ text: 'Quincenal',value:2 },
		{ text: 'Mensual',value:3 },
	],
	gastoCierre:[
		{ text: 'Cuotas',value:0 },
		{ text: 'Final',value:1 },
	],
	loanMapping:{
		0:[46,'days'],
		1:[13,'weeks'],
		2:[3,'weeks'],
		3:[1,'month'],
		},
	userMapping:{
		MODULE0:'admin',
		MODULE1:'print',
		MODULE2:'aprobación préstamos',
		MODULE3:'pendientes cobros',
		MODULE4:'historial pagos',
		MODULE5:'control usuarios',
		MODULE6:'finanzas'
	}

} 