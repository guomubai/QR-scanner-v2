import { API } from 'aws-amplify'
import { useRouter } from 'next/router'
import '../../configureAmplify'
import { listEmployees, getEmployee } from '../../graphql/queries'

export default function Employee({ employee }) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <p className="text-sm font-light my-4">by {employee.firstname}</p>
      <p className="text-sm font-light my-4">by {employee.lastname}</p>
			<p className="text-sm font-light my-4">by {employee.email}</p>
			<p className="text-sm font-light my-4">by {employee.title}</p>
			<p className="text-sm font-light my-4">by {employee.cardnumber}</p>
			<p className="text-sm font-light my-4">by {employee.cardbalance}</p>
      </div>
      )
}

export async function getStaticPaths() {
  const employeeData = await API.graphql({
    query: listEmployees,
		authMode: "AMAZON_COGNITO_USER_POOLS"

  })
  const paths = employeeData.data.listEmployees.items.map(post => ({ params: { id: post.id }}))
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps ({ params }) {
  const { id } = params
  const employeeData = await API.graphql({
    query: getEmployee, variables: { id }
  })
  return {
    props: {
      post: employeeData.data.getEmployee
    }
  }
}
