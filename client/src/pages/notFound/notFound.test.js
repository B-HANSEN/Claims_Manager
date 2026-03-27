import { render, screen } from '@testing-library/react'

import NotFound from '.'

describe('Not Found Page tests', () => {
	it('should match snapshot', () => {
		const { asFragment } = render(<NotFound />)
		expect(asFragment()).toMatchSnapshot()
	})

	it('should contain 404 elements', async () => {
		render(<NotFound />)
		const status = screen.getByText(/404/i)
		const notFoundPage = screen.getByText(/page not found./i)
		const notExisting = screen.getByText(/the page/i)
		const goHome = screen.getByText(/go home/i)

		expect(status).toBeInTheDocument()
		expect(notFoundPage).toBeInTheDocument()
		expect(notExisting).toBeInTheDocument()
		expect(goHome).toBeInTheDocument()
	})
})
