const schema = {

	client:{
		id:String, // cedula
		first_name:String,
		second_name:String,
		first_surname:String,
		second_surname:String,
		marital_status:String,
		address:String,
		sector:String,
		city:String,
		phone:String,
		place_status:Number,
		rent_price:Number,
		relative_fullname:String,
		relative_address:String,
		wife_fullname:String,
		workplace:String,
		workplace_phone:String,
		type:'CLIENT',
		loan_no:0

	},
	guarantor:{
		id:`${client.id}_GUARANTOR${client.loan_no}`,
		guarantor_name:String,
		guarantor_age:Number,
		guarantor_national_id:String,
		guarantor_address:String,
		guarantor_marital_status:Number,
		guarantor_place_status:String,
		guarantor_rent_price:Number,
		guarantor_business_name:String,
		guarantor_business_phone:String,
		guarantor_business_address:String,
		guarantor_business_owner:String,
		type:'GUARANTOR'
	},
	guarantor_ref:{
		id:`${client.id}_GUARANTOR_REF${client.loan_no}`,
		guarantor_ref1_name:String,
		guarantor_ref1_address:String,
		guarantor_ref1_phone:String,
		guarantor_ref2_name:String,
		guarantor_ref2_address:String,
		guarantor_ref2_phone:String,
		type:'REF_GUARANTOR'
	}
	business:{
		id:`${client.id}_BUSINESS`,
		business_name:String,
		business_sales:String,                             // ventas diarias
		business_address:String,
		business_sector:String,
		business_city:String,
		business_phone:String,
		business_owener_name:String,
		business_time_living:String,
		business_place_status:Number,
		business_rent_price:Number,
		type:'BUSINESS'
	}
	ref:{
		id: `${client.id}_REF`,
		ref_1_name:String,
		ref_1_address:String,
		ref_1_phone:String,
		ref_2_name:String,
		ref_2_address:String,
		ref_2_phone:String,
		ref_3_name:String,
		ref_3_address:String,
		ref_3_phone:String,
		type:'REF',
	},
	loan:{
		id:`${client.id}_LOAN${client.loan_no}`,     // method to increase loan_no to 1 after create loan
		loan_type:0 // Diario - 0, Semanal -1, Qincenal-2,mensual -3
		loan_amount:0,
		loan_rate:0,
		loan_start_date:Date,
		loan_warranty_description:String,
		//
		type:'LOAN',
		mora_rate: `${mora_rate.rate}`,
		check_run:1,
		false_count:0,
		finished:false,
		approved:false,
		notify:false,
	},
	mora_rate:{
		id:'MORA_RATE',
		rate:0.03,
		created_date:Date,
		modified_date:Date,
	}
	loan_type:{
		id:`LOAN_TYPE${loan.loan_type}`,
		type:'LOAN_TYPE',
		payments:46, // 46 -0,13 -2,6 -2,30 -3
		frequency:1, // frequencia en dias para chequeo de mora
	},
	mora{
		id:`MORA${loan.check_run}_${loan.id}`,
		loan_id:`${loan.id}`,
		amount:Number,
		created_date:Date,
		type:'MORA'
	},
	payment:{
		id:`PAYMENT_${loan.id}`,
		amount:Number,
		user:`${user.id}`,
		created_date:Date,
		type:'PAYMENT'
	},
	debt:{
		id:`DEBT_${new Date().getTime()}`,
		description:String,
		amount:Number,
		created_date:Date,
		type:'DEBT'
	}
	//// Users ////
	user:{
		id:String,
		name:String,
		'|c':String,
		chmod:`${role.id}`,
		created_date:Date,
		last_login_date:Date,
	},
	module:{
		id:'MAPPER'
		0:'/print',
		1:'/login',
		2:'/menu/searchusers',
		3:'/menu/createclients'
	},
	role:{
		id:`ROLE${Number}`,
		modules:[0,1],
	}




}