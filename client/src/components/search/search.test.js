import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Search from '.';

describe('Search Page tests', () => {
	it('should match snapshot', () => {
		const renderer = new ShallowRenderer();
		const result = renderer.render(<Search setValue={vi.fn()} />);
		expect(result).toMatchSnapshot();
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
