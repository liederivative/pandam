const path = require('path');
const {remote, ipcRenderer, shell} = require('electron');
const fs = require('fs');
// const constFile = path.resolve('app/utils/const')
// const dateFile = path.resolve('app/utils/date')

const moment = remote.require('./utils/date');
const {estadoCivil, local} = remote.require('./utils/const');
// const moment = require('moment');
const store = remote.getGlobal('reduxStore');

let db;
try{
	db = remote.getGlobal('db');
}catch(e){
	console.log(e)
}

let names = [
		'date', 'client_name', 'client_address', 'client_phone','client_city', 'client_sector',
		"client_local_status", 'client_marital_status','client_national_id', 'loan_amount',
		"client_rent" ,"client_familiy_name", "client_address", "client_wife" ,"client_workplace",
		"client_work_phone", "business_name", "business_sales" ,"business_address", "business_sector",
		"business_city", "business_local_status", "business_owner" ,"business_time_living",
		"business_rent", "client_ref_1_name", "client_ref_1_address" ,"client_ref_2_name",
		"client_ref_2_address", "client_ref_2_phone", "client_ref_1_phone", "client_ref_3_name",
		"client_ref_3_address" ,"client_ref_3_phone", "guarantor_name", "guarantor_age",
		"guarantor_national_id", "guarantor_marital_status", "guarantor_business_address",
		"guarantor_business_phone" ,"guarantor_business_local_status", "guarantor_business_owner",
		"guarantor_business_rent", "guarantor_ref1_name" ,"guarantor_ref1_address", "guarantor_ref1_phone",
		"guarantor_ref2_name" ,"guarantor_ref2_address", "guarantor_ref2_phone", 
		"loan_warranty_description"
	]

let fields = {
	client:{}, guarantor:{}, business:{}, guarantor_business:{},guarantor_ref1:{},guarantor_ref2:{},
	client_ref1:{}, client_ref2:{},client_ref3:{},loan:{}
}
for (var i = names.length - 1; i >= 0; i--) {
	switch(true){
		case  (names[i].indexOf('client_') === 0 && names[i].indexOf('client_ref') !== 0):
			var newName = names[i].replace('client_','') 
			fields.client[newName] = document.getElementById(names[i]);
			continue;
		case  (names[i].indexOf('guarantor_') === 0 && names[i].indexOf('guarantor_business') !== 0 && names[i].indexOf('guarantor_ref') !== 0 ):
			var newName = names[i].replace('guarantor_','') 
			fields.guarantor[newName] = document.getElementById(names[i]);
			continue;
		case  (names[i].indexOf('business_') === 0):
			var newName = names[i].replace('business_','') 
			fields.business[newName] = document.getElementById(names[i]);
			continue;
		case  (names[i].indexOf('guarantor_business_') === 0):
			var newName = names[i].replace('guarantor_business_','') 
			fields.guarantor_business[newName] = document.getElementById(names[i]);
			continue;
		case  (names[i].indexOf('guarantor_ref1_') === 0):
			var newName = names[i].replace('guarantor_ref1_','') 
			fields.guarantor_ref1[newName] = document.getElementById(names[i]);
			continue;
		case  (names[i].indexOf('guarantor_ref2_') === 0):
			var newName = names[i].replace('guarantor_ref2_','') 
			fields.guarantor_ref2[newName] = document.getElementById(names[i]);
			continue;
		case  (names[i].indexOf('client_ref_1_') === 0):
			var newName = names[i].replace('client_ref_1_','') 
			fields.client_ref1[newName] = document.getElementById(names[i]);
			continue;
		case  (names[i].indexOf('client_ref_2_') === 0):
			var newName = names[i].replace('client_ref_2_','') 
			fields.client_ref2[newName] = document.getElementById(names[i]);
			continue;
		case  (names[i].indexOf('client_ref_3_') === 0):
			var newName = names[i].replace('client_ref_3_','') 
			fields.client_ref3[newName] = document.getElementById(names[i]);
			continue;
		case  (names[i].indexOf('loan_') === 0):
			var newName = names[i].replace('loan_','') 
			fields.loan[newName] = document.getElementById(names[i]);
			continue;
	}
	// fields[names[i]] = document.getElementById(names[i]);
}
fields.date = document.getElementById('date');
console.log(fields)
const un2null = s=>(s)?s:'';
const mapToArray = (array,value)=> {
	return array.find( e=>value===e.value ).text;
}
const assignValue = (collection,array)=>{
	Object.keys(array).forEach(key=>{
			if(key ==='first_name'){
				key = 'name'
			}
			if(fields[collection][key]){
				let value;
				if(key === 'name' && collection==='client'){					
					value = `${un2null(array.first_name)} ${un2null(array.second_name)} ${un2null(array.first_surname)} ${un2null(array.second_surname)}`
				}else if(key === 'marital_status'){
					value = mapToArray( estadoCivil, array[key])
				}else if(key === 'local_status'){
					value = mapToArray( local, array[key])
				}else {
					value = un2null(array[key])
				}
			 fields[collection][key].innerHTML = value;
			}
		})
}
const assignValueArray = (name,limit,array)=>{
	[...Array(limit).keys()].forEach(num=>{
		num += 1;
		const collection = name+'_ref'+num;
		assignValue(collection,array);
	})
}

const id = store.getState().clients.lastLoanCreated;

db.loan.find().where('id').eq(id).exec().then(loan=>{
	console.log(loan)
	if(!loan.length) return;

	fields.loan.amount.innerHTML = loan[0].amount.toLocaleString(navigator.language);
	fields.date.innerHTML = moment(loan[0].created_date).format('DD/MMMM/YYYY');
	loan[0].client_id_.then(client=>{
		console.log(client)

		assignValue('client',client);
		

		client.refs_.then(client_refs=>{
			console.log(client_refs)
			assignValueArray('client',3,client_refs);
			loan[0].guarantor_.then(guarantor=>{
				console.log(guarantor)
				assignValue('guarantor',guarantor)
				guarantor.refs_.then(guarantor_refs=>{
					console.log(guarantor_refs)
					assignValueArray('guarantor',2,guarantor_refs);

					client.ref_negocio_.then(client_business=>{
						assignValue('business',client_business)
						guarantor.business_.then(guarantor_business=>{
							assignValue('guarantor_business',guarantor_business)
							console.log(guarantor_business)

						})
					})
				})
			})
		})
	})

})


const printBtn = document.getElementById('print-btn');
const saveBtn = document.getElementById('save-btn');

// {date,prefix, title, pageSize}
const args = {
	date:moment().format('DD-MM-YYYY-SS'),
	prefix: 'Solicitud',
	title:'Guardar Solicitud',
	id:'printSolicitud'
}
const printFile = (event, filename)=>{
		console.log(filename)
		if (typeof filename === "undefined") return;
		let win = remote.getCurrentWebContents();
	
		win.printToPDF({
                    marginsType: 0,
                    pageSize:{height:297,width:210}, //Object containing height and width in microns.
                    //landscape: false // portrait @page make ignore this one
                }, (error, data) => {
                	console.log(error)
                    if (error) throw error
                    fs.writeFile(filename, data, (error) => {
                    	if(error){ console.log(error.message); throw error }
                        console.log('printing...')

                        shell.openExternal(`file://${filename}`)

                    })
                })
	}
printBtn.addEventListener('click',event=>window.print())


saveBtn.addEventListener('click',event=>ipcRenderer.send('dialogSave',args))

ipcRenderer.on(`filename${args.id}`, printFile)

