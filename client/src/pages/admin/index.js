import React from 'react';
import Modal from '../../components/modal';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import './admin.css';

const AdminModal = () => {
	const [searchParams] = useSearchParams();

	return (
		searchParams.get('admin') && (
			<Modal ariaLabel='Admin welcome'>
				<div className='Modal'>
					Welcome message to the Admin user
					<Link to={{ pathname: '/claims' }}>Claims List</Link>
				</div>
			</Modal>
		)
	);
};

export default AdminModal;
