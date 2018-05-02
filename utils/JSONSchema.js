const schema = {
	
	client:{
		name:'client',

		schema:{

			disableKeyCompression: true,
			title: "client schema",
			version: 0,
			description: "describes clients",
			type: "object",
			properties: {
				group:{type:'string'},
				first_name:{"type":"string"},
				second_name:{"type":"string"},
				first_surname:{"type":"string"},
				second_surname:{"type":"string"},
				marital_status:{"type":"integer"},
				rxid:{"type":"string","primary":true},
				id:{"type":"string"},
				"national_id":{"type":"string"},
				address:{"type":"string"},
				sector:{"type":"string"},
				city:{"type":"string"},
				phone:{"type":"string"},
				loan_no:{type:'number'},
				place_status:{"type":"integer"},
				rent_price:{"type":"number"},
				relative_fullname:{"type":"string"},
				relative_address:{"type":"string"},
				wife_fullname:{"type":"string"},
				workplace:{"type":"string"},
				workplace_phone:{"type":"string"},
				created_date:{"type":"string", index:true },
				modified_date:{"type":"string"},
				loans:{"type":"array", ref:'loan', items:{type:'string'}},
				refs:{"type":"array", ref:'personalref', items:{type:'string'}}, //2
				ref_negocio:{type:'string',ref:'business'}
			},
			"additionalProperties":true
		}
		
	},
	personalref:{
		name:'personalref',
		schema:{
			disableKeyCompression: true,
			title: "personalref schema",
			version: 0,
			description: "describes personalref",
			type: "object",
			properties:{
				group:{type:'string'},
				rxid: {"type":"string","primary":true},
				id:{"type":"string"},
				name:{"type":"string"},
				address:{"type":"string"},
				phone:{"type":"string"},
				created_date:{"type":"string", index:true },
				modified_date:{"type":"string"},
			},
			"additionalProperties":true
		}
		
	},
	loan:{
		name:'loan',
		schema:{
			disableKeyCompression: true,
			title: "loan schema",
			version: 0,
			description: "describes loan",
			type: "object",
			properties:{
				group:{type:'string'},
				id:{"type":"string"},
				"rxid":{type:'string',primary:true},     // method to increase loan_no to 1 after create loan
				type:{type:'integer'}, // Diario - 0, Semanal -1, Qincenal-2,mensual -3
				amount:{type:'number'},
				rate:{type:'number'},
				no:{type:'number'},
				start_date:{type:'string'},
				warranty_description:{type:'string'},
				client_id:{type:'string',ref:'client'},
				gasto_cierre:{type:'number'},
				applied_cierre:{type:'integer'},
				payed_cierre:{type:'boolean'},
				//
				mora_rate: {type:'number'},
				check_run:{type:'integer',default:1},
				false_count:{type:'integer',default:0},
				finished:{type:'boolean',default:false},
				approved:{type:'boolean',default:false},
				notify:{type:'boolean',default:false},
				created_date:{"type":"string", index:true },
				modified_date:{"type":"string"},
				guarantor:{ref:'guarantor',type:'string'},
				payments:{ref:'payment',type:'array', items:{type:'string'}},


			},
			required:['type','amount','rate','start_date'],
			"additionalProperties":true
		}
		
	},
	business:{
		name:'business',
		
		schema:{
			disableKeyCompression: true,
			title: "business schema",
			version: 0,
			description: "describes business",
			type: "object",
			properties:{
				group:{type:'string'},
				id:{"type":"string"},
				rxid:{type:'string',primary:true},
				name:{"type":"string"},
				sales:{"type":"string"},                             // ventas diarias
				address:{"type":"string"},
				sector:{"type":"string"},
				city:{"type":"string"},
				phone:{"type":"string"},
				time_living:{type:'string'},
				owner:{"type":"string"},
				place_status:{"type":"integer"},
				rent_price:{"type":"number"},
				created_date:{"type":"string", index:true },
				modified_date:{"type":"string"},

			}
		},
		
	},
	guarantor:{
		name:'guarantor',
		schema:{
			disableKeyCompression: true,
			title: "guarantor schema",
			version: 0,
			description: "describes guarantor",
			type: "object",
			properties: {
				group:{type:'string'},
				id:{"type":"string"},
				"rxid":{type:'string',primary:true},
				name:{"type":"string"},
				age:{"type":"integer"},
				national_id:{"type":"string"},
				address:{"type":"string"},
				marital_status:{"type":"integer"},
				place_status:{"type":"integer"},
				rent_price:{"type":"number"},
				created_date:{"type":"string", index:true },
				modified_date:{"type":"string"},
				business:{ref:'business',type:'string'},
				loan:{"type":"string", ref:'loan'},
				refs:{"type":"array", ref:'personalref', items:{type:'string'}}
			},
			"additionalProperties":true
		},
		
	},
	morarate:{
		name:'morarate',
		schema:{
			disableKeyCompression: true,
			title: "mora_rate schema",
			version: 0,
			description: "describes mora_rate",
			type: "object",
			properties:{
				group:{type:'string'},
				id:{"type":"string"},
				rxid:{"type":"string", primary:true},
				rate:{"type":"number"},
				created_date:{"type":"string", index:true },
				modified_date:{"type":"string"},
			},
			required:['rate']
			
		},
		
		
	},
	loantype:{
		name:'loantype',
		schema:{
			disableKeyCompression: true,
			title: "loantype schema",
			version: 0,
			description: "describes loantype",
			type: "object",
			properties:{
				group:{type:'string'},
				id:{"type":"string"},
				rxid:{"type":"string", primary:true},
				payments:{"type":"number"}, // 46 -0,13 -2,6 -2,30 -3
				frequency:{"type":"number"}, // frequencia en dias para chequeo de mora
				created_date:{"type":"string", index:true },
				modified_date:{"type":"string"},
			},
			required:['frequency','payments']
		}
		
	},
	mora:{
		name:'mora',
		schema:{
			disableKeyCompression: true,
			title: "mora schema",
			version: 0,
			description: "describes mora",
			type: "object",
			properties:{
				group:{type:'string'},
				id:{"type":"string"},
				rxid:{"type":"string", primary:true},
				payment:{'type':'string',ref:'payment'},
				amount:{"type":"number"},
				created_date:{"type":"string", index:true },
				modified_date:{"type":"string"},
			}
		}
		
	},
	payment:{
		name:'payment',

		schema:{
			disableKeyCompression: true,
			title: "payment schema",
			version: 0,
			description: "describes payment",
			type: "object",
			properties:{
				group:{type:'string'},
				id:{"type":"string"},
				rxid:{"type":"string", primary:true},
				amount:{"type":"number", final:true},
				user:{'type':'string',ref:'user'},
				loan:{'type':'string',ref:'loan'},
				mora:{'type':'string',ref:'mora'},  // a que mora pagó
				created_date:{"type":"string", index:true },
				modified_date:{"type":"string"}
			},
			required:['amount']
		},
		
	},
	debt:{
		name:'debt',
		schema:{
			disableKeyCompression: true,
			title: "debt schema",
			version: 0,
			description: "describes debt",
			type: "object",
			properties:{
				group:{type:'string', index:true},
				id:{"type":"string"},
				rxid:{"type":"string", primary:true},
				description:{"type":"string", index:true},
				amount:{"type":"number"},
				expense_date:{"type":"string", index:true },
				created_date:{"type":"string"},
				modified_date:{"type":"string"}
			}
		},
		"additionalProperties":true
		
	},
	user:{
		name:'user',
		schema:{
			
			title: "user schema",
			version: 0,
			description: "describes user",
			type: "object",
			properties:{
				group:{type:'string', index:true},
				id:{"type":"string"},
				rxid:{"type":"string", primary:true},
				name:{"type":"string"},
				description:{"type":"string"},
				pwd:{type:'string'},
				reset:{type:'number'},
				salt:{type:'string'},
				modules:{"type":"array", items:{type:'string'}, ref:'module' },
				comission:{type:'number'},
				created_date:{"type":"string", index:true },
				modified_date:{"type":"string"},
			}
		}
		
	},
	module:{
		name:'module',
		schema:{
			
			title: "module schema",
			version: 0,
			description: "describes module",
			properties:{
				group:{type:'string'},
				id:{"type":"string"},
				description:{"type":"string"},
				rxid:{"type":"string", primary:true},
				route:{type:'string'}
			}
		},
	
	},



}


module.exports = schema;