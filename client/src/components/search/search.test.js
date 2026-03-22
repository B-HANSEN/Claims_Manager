import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import Search from '.';

describe('Search Page tests', () => {
	it('should match snapshot', () => {
		const { asFragment } = render(<Search setValue={vi.fn()} />);
		expect(asFragment()).toMatchSnapshot();
	});

	it('should change input value when user types and set local state', () => {
		const handleValue = vi.fn();
		render(<Search setValue={handleValue} />);

		const input = screen.getByTestId('search');
		expect(input).toBeInTheDocument();

		fireEvent.change(input, { target: { value: 'CL-49085' } });
		expect(input.value).toBe('CL-49085');

		const submit = screen.getByRole('button', {
			name: /submit/i,
		});
		expect(submit).toBeEnabled();
		fireEvent.click(submit);

		expect(handleValue).toHaveBeenCalledTimes(1);
	});
});
