import React from 'react';
import ClaimsForm from '../../components/form';
import Header from '../../components/header';
import './createClaim.css';

const CreateClaim = () => {
	return (
		<div className='CreateClaim'>
			<Header />
			<main id='main-content' className='CreateClaim__MainSection'>
				<h1>Create Claim</h1>
				<ClaimsForm />
			</main>
		</div>
	);
};

export default CreateClaim;
