import { render, screen } from '@testing-library/react'

import ClaimsTable from '.'

const claims = [
	{
		id: 1,
		number: 'CL-52026',
		incidentDate: '2022-05-25',
		createdAt: '2022-06-12',
		amount: '1641.00',
		holder: 'Loren Harber DVM',
		policyNumber: 'TL-25580',
		insuredItem: 'Small Cotton Fish',
		description:
			'Optio voluptatem in voluptas minus consequatur doloribus nemo voluptas vero est ipsam aut dolores nesciunt.',
		processingFee: '86.00',
		status: 'Submitted',
	},
	{
		id: 2,
		number: 'CL-25395',
		incidentDate: '2022-01-31',
		createdAt: '2022-03-13',
		amount: '673.00',
		holder: 'Loren Harber DVM',
		policyNumber: 'TL-25580',
		insuredItem: 'Handcrafted Metal Cheese',
		description:
			'Qui alias dignissimos molestiae modi doloribus provident aut in laudantium repudiandae minus laborum modi molestias.',
		processingFee: '121.00',
		status: 'Approved',
	},
]

describe('Claim List Page tests', () => {
	it('should match snapshot', () => {
		const { asFragment } = render(<ClaimsTable filteredClaims={claims} />)
		expect(asFragment()).toMatchSnapshot()
	})

	it('should contain table headers', () => {
		render(<ClaimsTable filteredClaims={claims} />)
		const id = screen.getByText(/claim id/i)
		const status = screen.getByText(/status/i)
		const amount = screen.getByText(/Amount/)
		const holder = screen.getByText(/Holder/)
		const policy = screen.getByText(/policy number/i)
		const item = screen.getByText(/insured item/i)
		const description = screen.getByText(/description/i)
		const incidentDate = screen.getByText(/incident date/i)
		const processingFee = screen.getByText(/processing fee/i)
		const totalAmount = screen.getByText(/total amount/i)
		const createdAt = screen.getByText(/created at/i)

		expect(id).toBeInTheDocument()
		expect(status).toBeInTheDocument()
		expect(amount).toBeInTheDocument()
		expect(holder).toBeInTheDocument()
		expect(policy).toBeInTheDocument()
		expect(item).toBeInTheDocument()
		expect(description).toBeInTheDocument()
		expect(incidentDate).toBeInTheDocument()
		expect(processingFee).toBeInTheDocument()
		expect(totalAmount).toBeInTheDocument()
		expect(createdAt).toBeInTheDocument()
	})
})
