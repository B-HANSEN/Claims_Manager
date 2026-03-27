import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import ClaimList from '.'

beforeEach(() => {
	render(<ClaimList />)
})

describe('Claim List Page tests', () => {
	it('should match snapshot', () => {
		const { asFragment } = render(<ClaimList />)
		expect(asFragment()).toMatchSnapshot()
	})

	it('should contain heading, label and button texts', () => {
		const heading = screen.getByText(/overview claims/i)
		const searchLabel = screen.getByText(/search by id, holder name or policy/i)
		const query = screen.getByPlaceholderText(/enter query here.../i)
		const filter = screen.getByText(/show all/i)
		const status = screen.getByText(/filter by claim status/i)
		const createNew = screen.getByRole('button', {
			name: /create a new claim/i,
		})
		const admin = screen.getByRole('button', {
			name: /admin section/i,
		})

		const submit = screen.getByRole('button', {
			name: /submit/i,
		})
		const reset = screen.getByRole('button', {
			name: /reset/i,
		})

		expect(heading).toBeInTheDocument()
		expect(searchLabel).toBeInTheDocument()
		expect(query).toBeInTheDocument()
		expect(filter).toBeInTheDocument()
		expect(status).toBeInTheDocument()
		expect(createNew).toBeInTheDocument()
		expect(createNew).toBeEnabled()
		expect(admin).toBeInTheDocument()
		expect(admin).toBeEnabled()
		expect(submit).toBeInTheDocument()
		expect(submit).toBeEnabled()
		expect(reset).toBeInTheDocument()
		expect(reset).toBeEnabled()
	})
})
