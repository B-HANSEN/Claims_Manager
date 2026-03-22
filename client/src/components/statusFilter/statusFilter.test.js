import { render, screen, fireEvent } from '@testing-library/react';

import StatusFilter from '.';

describe('Status filter tests', () => {
	it('should match snapshot', () => {
		const { asFragment } = render(<StatusFilter filter='ShowAll' setFilter={vi.fn()} />);
		expect(asFragment()).toMatchSnapshot();
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
