import React from 'react';

const NotFound = () => {
	return (
		<main id='main-content' className='d-flex align-items-center justify-content-center vh-100'>
			<div className='text-center'>
				<h1 className='display-1 fw-bold'>404</h1>
				<p className='fs-1'>
					{' '}
					<span className='text-danger'>Oops!</span> Page not found.
				</p>
				<p className='h5'>The page you’re looking for doesn’t exist.</p>
				<br />
				<a href='/claims' className='btn btn-primary btn-lg'>
					Go Home
				</a>
			</div>
		</main>
	);
};

export default NotFound;
