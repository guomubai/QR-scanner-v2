import { withAuthenticator } from '@aws-amplify/ui-react'
import { useState } from 'react'
import { API } from 'aws-amplify'
import { v4 as uuid } from 'uuid'
import { useRouter } from 'next/router' //this is back now
// import SimpleMDE from "react-simplemde-editor"
// import "easymde/dist/easymde.min.css"
import { createEmployee } from '../graphql/mutations'

const initialState = { firstname: '', lastname: '', email: '', title: '', cardnumber: 0, cardbalance:0, Admin:'' }

function CreateEmployee() {
	const [employee, setEmployee] = useState(initialState)
	const {firstname, lastname, email, title, cardnumber, cardbalance, Admin} = employee
	const router = useRouter() //don;t forget this

	function onChange(e) {
    setEmployee(() => ({ ...employee, [e.target.name]: e.target.value }))
  }
	async function createNewEmployee() {
		if (!firstname || !lastname || !email || !title || !cardnumber || !cardbalance || !Admin) return
    const id = uuid()
    employee.id = id

		await API.graphql({
      query: createEmployee,
      variables: { input: employee },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    })
		router.push(`/employees/${id}`) //never mind ,we are adding this
	}
	return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6">Create your Employee profile</h1>
      <input
        onChange={onChange}
        name="firstname"
        placeholder="First Name"
        value={employee.firstname}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      /> 
			<input
        onChange={onChange}
        name="lastname"
        placeholder="Last Name"
        value={employee.lastname}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      /> 
			<input
        onChange={onChange}
        name="email"
        placeholder="Email"
        value={employee.email}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      /> 
			<input
        onChange={onChange}
        name="title"
        placeholder="Title"
        value={employee.title}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      /> 
			<input
        onChange={onChange}
        name="cardnumber"
        placeholder="Card Number"
        value={employee.cardnumber}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      /> 
			<input
        onChange={onChange}
        name="cardbalance"
        placeholder="Card Balance"
        value={employee.cardbalance}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      /> 
			<input
        onChange={onChange}
        name="Admin"
        placeholder="Administrator? True or False"
        value={employee.Admin}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      /> 
      <button
        type="button"
        className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
        onClick={createNewEmployee}
      >Create New Employee Profile</button>
    </div>
  )
		
}

export default withAuthenticator(CreateEmployee)