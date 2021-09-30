import { useState, useEffect } from 'react'
import Link from 'next/link'
import { API } from 'aws-amplify'
import { listEmployees } from '../graphql/queries'

export default function Home() {
  const [employees, setEmployees] = useState([])
  useEffect(() => {
    fetchEmployees()
  }, [])
  async function fetchEmployees() {
    const employeeData = await API.graphql({
      query: listEmployees,
			authMode: "AMAZON_COGNITO_USER_POOLS"
    })
    setEmployees(employeeData.data.listEmployees.items)
  }
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">List of all Employees and their info:</h1>
      {
        employees.map((employee, index) => (
        <Link key={index} href={`/posts/${employee.id}`}>
          <div className="cursor-pointer border-b border-gray-300	mt-8 pb-4">
            <h2 className="text-xl font-semibold">{employee.firstname}</h2>
						<h2 className="text-xl font-semibold">{employee.lastname}</h2>
						<h2 className="text-xl font-semibold">{employee.position}</h2>
						<h2 className="text-xl font-semibold">{employee.email}</h2>
						<h2 className="text-xl font-semibold">{employee.cardbalance}</h2>
						<h2 className="text-xl font-semibold">{employee.cardnumber}</h2>
						<h2 className="text-xl font-semibold">{employee.Admin}</h2>
						<p className="text-gray-500 mt-2">Created by: {employee.username}</p>
          </div>
        </Link>)
        )
      }
    </div>
  )
}