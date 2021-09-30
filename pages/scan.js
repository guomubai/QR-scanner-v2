import { useState, useEffect } from 'react'
import Link from 'next/link'
import { API, Auth } from 'aws-amplify'
import { getEmployee } from '../graphql/queries'
import { updateEmployee } from '../graphql/mutations'
import AltModal from '../components/basics/AltModal'

//QR Stuff
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false }); //this is necessary to put server side rendering to false
import dynamic from "next/dynamic";

export default function scanCode() {
//First, let's lay out a basic search function. We want to bring up the first item in the objects array
const [employeeData, setEmployees] = useState(' ')

const [deductionAmount, setNewCardBalance] = useState([ ])
const [data, setSearchId] = useState([ ]) 

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

useEffect(() => {
	fetchEmployee()
	updateCardBalance()
}, [])

// function onChange(e) {
// 	setEmployee(() => ({ ...employee, [e.target.name]: e.target.value }))
// }

async function fetchEmployee() {
	// const searchId = useState(' ')
	const { username } = await Auth.currentAuthenticatedUser()
	const employeeData = await API.graphql({
		query: getEmployee, 
		variables: { id: data },
		authMode: "AMAZON_COGNITO_USER_POOLS"
	})
	// setEmployees(employeeData.data.getEmployee.item)
	// console.log(setEmployees(employeeData.data.getEmployee.item))
	console.log(employeeData)
	console.log(employeeData.data.getEmployee.firstname)
	console.log(employeeData.data.getEmployee.cardbalance)
	console.log(employeeData.data.getEmployee.id)

	
	}

	async function updateCardBalance() {
		// const { username } = await Auth.currentAuthenticatedUser()
		
		const employeeData = await API.graphql({
			query: getEmployee, 
			variables: { id: data },
			authMode: "AMAZON_COGNITO_USER_POOLS"
		})
			
		const updatedCardBalance = {
					id: employeeData.data.getEmployee.id,
					cardbalance: employeeData.data.getEmployee.cardbalance - deductionAmount
						}
			
			console.log(employeeData.data.getEmployee.cardbalance- 50)
	
			await API.graphql({ 
				query: updateEmployee, 
				variables: {input: updatedCardBalance},
				authMode: "AMAZON_COGNITO_USER_POOLS"});
	
			console.log("End of function Card Balance: " + employeeData.data.getEmployee.cardbalance)
		
	
		}



return (
	<div>

<>
				
				<p> The QR code says: {data}</p>
					<QrReader delay={300}
					onError={(err) => setSearchId(err)}
					onScan={(data) => setSearchId(data)}
					style={{ width: "50vw"}}
					
					/>
					
			</>

			<button onClick={toggleModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Find that employee!</button>

		

		<div> ---- </div>

		
					

		<AltModal {...configAltModal}>

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