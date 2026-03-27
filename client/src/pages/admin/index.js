import { Link } from 'react-router-dom'
import Header from '../../components/header'
import './admin.css'

const Admin = () => {
	return (
		<div className='Admin'>
			<Header />
			<main id='main-content' className='Admin__MainSection'>
				<h1>Admin Section</h1>
				<p>Welcome message to the Admin user</p>
				<Link to='/'>Claims List</Link>
			</main>
		</div>
	)
}

export default Admin
