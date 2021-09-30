// pages/my-posts.js
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { API, Auth } from 'aws-amplify'
import { employeesByUsername } from '../graphql/queries'
import * as React from 'react';
import { QRCode } from 'react-qrcode-logo';

export default function myProfiles() {
  const [employees, setEmployees] = useState([])
  useEffect(() => {
    fetchEmployees()
  }, [])
  async function fetchEmployees() {
    const { username } = await Auth.currentAuthenticatedUser()
    const employeeData = await API.graphql({
      query: employeesByUsername, 
			variables: { username },
			authMode: "AMAZON_COGNITO_USER_POOLS"
    })
    setEmployees(employeeData.data.employeesByUsername.items)
		
  }
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">My Employee Profile:</h1>
      {
        employees.map((employee, index) => (
        <Link key={index} href={`/employees/${employee.id}`}>
          <div className="cursor-pointer border-b border-gray-300	mt-8 pb-4">
            <h2 className="text-xl font-semibold">First Name: {employee.firstname}</h2>
            <h2 className="text-xl font-semibold">last Name: {employee.lastname}</h2>
						<h2 className="text-xl font-semibold">Email: {employee.email}</h2>
						<h2 className="text-xl font-semibold">Title: {employee.title}</h2>
						<h2 className="text-xl font-semibold">Card Number: {employee.cardnumber}</h2>
						<h2 className="text-xl font-semibold">Card Balance: {employee.cardbalance}</h2>
            <p className="text-gray-500 mt-2">Author: {employee.username}</p>

						<QRCode 
							qrStyle = "squares" 
							logoImage = "../public/siglogo.png" 
							value={employee.id.toString()} />

          </div>
        </Link>)
        )
      }
    </div>
  )
}
