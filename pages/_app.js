import '../styles/globals.css'
import '../configureAmplify'
import Link from 'next/link'

import { useState, useEffect } from 'react'
import { Auth, Hub } from 'aws-amplify'


function MyApp({ Component, pageProps }) {
	const [signedInUser, setSignedInUser] = useState(false)

	useEffect(() => {
		authListener()
	})
	async function authListener() {
		Hub.listen('auth', (data) => {
			switch (data.payload.event) {
				case 'signIn':
					return setSignedInUser(true)
				case 'signOut':
					return setSignedInUser(false)
			}
		})
		try {
			await Auth.currentAuthenticatedUser()
			setSignedInUser(true)
		} catch (err) {}
	}

	return (
		<div>
			<nav className="p-6 border-b border-gray-300">
				<Link href="/">
					<span className="mr-6 cursor-pointer">Main</span>
				</Link>
				
				<Link href="/profile">
					<span className="mr-6 cursor-pointer">Profile</span>
				</Link>

				<Link href="/create-employee">
					<span className="mr-6 cursor-pointer">Create Employee</span>
				</Link>

				<Link href="/manual-scan">
					<span className="mr-6 cursor-pointer">Manual Scan</span>
				</Link>

				<Link href="/scan">
					<span className="mr-6 cursor-pointer">Scan</span>
				</Link>

				<Link href="/search">
					<span className="mr-6 cursor-pointer">Search</span>
				</Link>

				{/* This will only show if user is logged in */}
				{
  				signedInUser && (
    				<Link href="/my-profile">
      				<span className="mr-6 cursor-pointer">My Employee Profiles</span>
    				</Link>
 					)
				}

				
			</nav>
			<div className="py-8 px-16">
				<Component {...pageProps} />
			</div>
		</div>
		)
}

export default MyApp
