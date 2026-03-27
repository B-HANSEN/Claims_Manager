import Button from 'react-bootstrap/Button'
import Header from '../../components/header'
import './admin.css'

const Admin = () => {
	return (
		<div className='Admin'>
			<Header />
			<main id='main-content' className='Admin__MainSection'>
				<h1>Admin Section</h1>
				<div style={{ maxWidth: '360px' }}>
					<p>Welcome to the Admin Section.</p>
					<p>This section is still under construction and will be available soon.</p>
					<p>
						Administrators will be able to manage and curate claims lists,
						enabling focused review and prioritisation across the platform.
					</p>
					<p>Authentication support is planned for a future release.</p>
				</div>
				<Button className='mb-2' href='/' size='lg' variant='outline-success'>
					Claims List
				</Button>
			</main>
		</div>
	)
}

export default Admin
