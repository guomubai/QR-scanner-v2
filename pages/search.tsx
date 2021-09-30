import { useState, useEffect } from 'react'
import Link from 'next/link'
import { API, Auth } from 'aws-amplify'
import { getEmployee } from '../graphql/queries'
import { updateEmployee } from '../graphql/mutations'
import SweetAlert from 'react-bootstrap-sweetalert';
import AltModal from '../components/basics/AltModal'

// const initialState = { id: ' ', firstname: ' ', lastname:  ' ', email: ' ', title: ' ', cardnumber: ' ', cardbalance: ' ', Admin: ' '}

export default function ManualScan() {
//First, let's lay out a basic search function. We want to bring up the first item in the objects array
const [employeeData, setEmployee] = useState(' ')

const [deductionAmount, setNewCardBalance] = useState(' ')
const [searchId, setSearchId] = useState(' ') 

useEffect(() => {
	fetchEmployee()
	updateCardBalance()
}, [])

//------- MODAL functions-----------------------------------------------------------------------------------------
const [hideModal, setHideModal] = useState(true);
const [hideAltModal, setHideAltModal] = useState(true);

	const toggleModal = () => {
			setHideModal(!hideModal);
	setHideAltModal(!hideAltModal);
	}
const toggleAltModal = () => {
			setHideAltModal(!hideAltModal);
	}
	const configAltModal = {
	hideAltModal,
	toggleAltModal
}
// ---------------------------------------------------------------------------------------------------------------

// function onChange(e) {
// 	setEmployee(() => ({ ...employee, [e.target.name]: e.target.value }))
// }

async function fetchEmployee() {
	// const searchId = useState(' ')
	// const { username } = await Auth.currentAuthenticatedUser()
	const employeeData: any = await API.graphql({
		query: getEmployee, 
		variables: { id: searchId },
		authMode: "AMAZON_COGNITO_USER_POOLS"
	})
	// setEmployee(employeeData.data.getEmployee)
	console.log(employeeData)
	console.log("employeeData looks like this: " + JSON.stringify(employeeData))
	// console.log("employee looks like this: " + employee)
	// console.log("employee First Name: " + employee.firstname)
	// console.log("employee Card Balance: " + employee.cardbalance)
	// console.log("employee ID: " + employee.id)
	// console.log("employee Email: " + employee.email)

	
	
	}

async function updateCardBalance() {
	// const { username } = await Auth.currentAuthenticatedUser()
	
	const employeeData = await API.graphql({
		query: getEmployee, 
		variables: { id: searchId },
		authMode: "AMAZON_COGNITO_USER_POOLS"
	})

	console.log(employeeData)
	
		
	const updatedCardBalance = {
				id: employeeData.data.getEmployee.id,
				cardbalance: employeeData.data.getEmployee.cardbalance - deductionAmount
					}
		
		console.log("Middle of function card balance: " + employeeData.data.getEmployee.cardbalance)
		

		const newEmployeeCardBalance = await API.graphql({ 
			query: updateEmployee, 
			variables: {input: updatedCardBalance},
			authMode: "AMAZON_COGNITO_USER_POOLS"});

		console.log("End of function Card Balance: " + newEmployeeCardBalance.data.updateEmployee.cardbalance)
	

	}


return (
	<div>
		
		<h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2"> Search Employee profile (by ID):</h1>
			
		
		<div> ---- </div>
		
		<input
        onChange={event => setSearchId(event.target.value)}
        name="searchid"
        placeholder="Which ID do you want to find?"
        value={searchId}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      /> 
				
			
			<button onClick={toggleAltModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Find that employee!</button>


		<AltModal hideAltModal={hideAltModal} toggleAltModal={toggleModal} zFocus={50}>

			<h1>How much do you want to deduct from this employee?</h1>

			<input
        onChange={event => setNewCardBalance(event.target.value)}
        name="cardbalnce"
        placeholder="How much do you want to deduct?"
        value={deductionAmount}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      /> 
				
			<button onClick={updateCardBalance} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Deduct that amount!</button>

		</AltModal>


	
			
		
	
							
	</div>
	)



}