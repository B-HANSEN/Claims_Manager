import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Search = ({ setValue }) => {
	const [query, setQuery] = useState('');
	const [focused, setFocused] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setValue(query);
	};

	const reset = () => {
		setQuery('');
		setValue('');
	};

	return (
		<Form onSubmit={(e) => handleSubmit(e)}>
			<Form.Label>Search by ID, holder name or policy</Form.Label>
			<div className='d-flex align-items-center gap-2'>
				<Form.Control
					id='search'
					data-testid='search'
					name='search'
					onChange={(e) => {
						setQuery(e.target.value);
						setValue(e.target.value);
					}}
					onFocus={() => {
						setQuery('');
						setFocused(true);
					}}
					onBlur={() => setFocused(false)}
					placeholder='Enter query here...'
					size='lg'
					type='text'
					value={query}
				/>

				<Button
					onClick={reset}
					size='sm'
					type='button'
					variant={focused ? 'primary' : 'outline-secondary'}
				>
					Reset
				</Button>
			</div>
		</Form>
	);
};

export default Search;
