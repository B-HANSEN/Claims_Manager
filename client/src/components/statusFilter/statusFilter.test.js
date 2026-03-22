import { render, screen, fireEvent } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';
import StatusFilter from '.';

describe('Status filter tests', () => {
	it('should match snapshot', () => {
		const renderer = new ShallowRenderer();
		const result = renderer.render(<StatusFilter />);
		expect(result).toMatchSnapshot();
	});

	it('should update local state with new filter value', () => {
		const handleFilter = vi.fn();

		render(<StatusFilter filter={'ShowAll'} setFilter={handleFilter} />);
		expect(screen.getByText('Processed')).toBeInTheDocument();

		fireEvent.change(screen.getByTestId('select'), {
			target: { value: 'Approved' },
		});
		expect(handleFilter).toHaveBeenCalledTimes(1);
	});
});
