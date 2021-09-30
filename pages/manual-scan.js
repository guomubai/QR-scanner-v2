import { useState, useEffect } from 'react'
import Link from 'next/link'
import { API, Auth } from 'aws-amplify'
import { employeesByUsername } from '../graphql/queries'
import { updateEmployee } from '../graphql/mutations'

export default function ManualScan() {
//First, let's lay out a basic search function. We want to bring up the first item in the objects array
const [employees, setEmployees] = useState(' ')
// const [newCardBalance, setNewCardBalnce] = useState([])
const [deductionAmount, setNewCardBalance] = useState(' ')

useEffect(() => {
	fetchEmployees()
	updateCardBalance()
}, [])

// function onChange(e) {
// 	setEmployee(() => ({ ...employee, [e.target.name]: e.target.value }))
// }

async function fetchEmployees() {
	const { username } = await Auth.currentAuthenticatedUser()
	const employeeData = await API.graphql({
		query: employeesByUsername, 
		variables: { username },
		authMode: "AMAZON_COGNITO_USER_POOLS"
	})
	setEmployees(employeeData.data.employeesByUsername.items)
	console.log("All the employee data: " + employeeData)
	console.log("First Name: " + employeeData.data.employeesByUsername.items[0].firstname)
	console.log("Last Name: " + employeeData.data.employeesByUsername.items[0].lastname)
	console.log("ID: " + employeeData.data.employeesByUsername.items[0].id)
	console.log("Card Number: " + employeeData.data.employeesByUsername.items[0].cardnumber)
	console.log("Card Balance: " + employeeData.data.employeesByUsername.items[0].cardbalance)
	


	// console.log(employees)
	// console.log(employees[0])
	// console.log(employeeData[0].cardbalance)
	// console.log(employeeData[0].id)

	
	}

async function updateCardBalance() {
	// const { username } = await Auth.currentAuthenticatedUser()
	console.log("Before I hit the updatecardBalance button, the employees variable shows: " + JSON.stringify(employees))
	
	const updatedCardBalance = {
				id: employees[0].id,
				cardbalance: employees[0].cardbalance - deductionAmount
					}
		
		console.log("Card Balance in the middle of the function: " + employees[0].cardbalance)

		await API.graphql({ 
			query: updateEmployee, 
			variables: {input: updatedCardBalance},
			authMode: "AMAZON_COGNITO_USER_POOLS"});

			console.log("After I hit the updatecardBalance button, the employees variable shows: " + JSON.stringify(employees))
			console.log("Updated Card Balance: " + employees[0].cardbalance)
	}



return (
	<div>
		
		<h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">My Employee Profiles</h1>
			
			{/* <h2 className="text-xl font-semibold">{employees[0].firstname}</h2>
			<h2 className="text-xl font-semibold">{employees[0].lastname}</h2>
					<h2 className="text-xl font-semibold">{employees[0].email}</h2>
					<h2 className="text-xl font-semibold">{employees[0].title}</h2>
					<h2 className="text-xl font-semibold">{employees[0].cardnumber}</h2>
					<h2 className="text-xl font-semibold">{employees[0].cardbalance}</h2>
					<h2 className="text-xl font-semibold">{employees[0].username}</h2> */}
		
		<h2 className="text-xl font-semibold">Your name is: {employees[0].firstname}</h2>
		<h2 className="text-xl font-semibold">Your card balance is: {employees[0].cardbalance}</h2>

			
			<input
        onChange={event => setNewCardBalance(event.target.value)}
        name="cardbalnce"
        placeholder="How much do you want to deduct?"
        value={deductionAmount}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      /> 
				
			<button onClick={updateCardBalance} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Deduct that amount!</button>
		
							
	</div>
	)



}