import React from 'react';
import Form from 'react-bootstrap/Form';
import './statusFilter.css';

const StatusFilter = ({ filter, setFilter }) => {
	return (
		<div className='StatusFilter'>
			<p>Filter by claim status</p>
			<Form.Select
				aria-label='Filter claims by status'
				className='StatusFilter__Select'
				id='status'
				data-testid='select'
				onChange={e => setFilter(e.target.value)}
				size='lg'
				value={filter}
			>
				<option value='ShowAll'>Show All</option>
				<option value='Submitted'>Submitted</option>
				<option value='Approved'>Approved</option>
				<option value='Processed'>Processed</option>
				<option value='Completed'>Completed</option>
				<option value='Rejected'>Rejected</option>
			</Form.Select>
		</div>
	);
};

export default StatusFilter;
