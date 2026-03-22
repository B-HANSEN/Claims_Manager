import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Search = ({ setValue }) => {
	const [query, setQuery] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		setValue(query);
	};

	const reset = () => {
		setQuery('');
		setValue(query);
	};

	return (
		<Form onSubmit={e => handleSubmit(e)}>
			<Form.Group className='mb-3'>
				<Form.Label>Search by ID, holder name or policy</Form.Label>
				<Form.Control
					id='search'
					data-testid='search'
					name='search'
					onChange={e => setQuery(e.target.value)}
					onFocus={() => setQuery('')}
					placeholder='Enter query here...'
					size='lg'
					type='text'
					value={query}
				/>
			</Form.Group>
			<Button
				className='mb-2'
				onClick={handleSubmit}
				size='lg'
				type='submit'
				variant='primary'
			>
				Submit
			</Button>{' '}
			<Button
				className='mb-2'
				onClick={reset}
				size='lg'
				type='button'
				variant='outline-secondary'
			>
				Reset
			</Button>
		</Form>
	);
};

export default Search;
