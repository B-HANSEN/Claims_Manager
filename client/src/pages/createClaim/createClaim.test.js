import { render, screen } from '@testing-library/react';

import CreateClaim from '.';

const mockedUsedNavigate = vi.hoisted(() => vi.fn());
vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom');
	return {
		...actual,
		useNavigate: () => mockedUsedNavigate,
	};
});

beforeEach(() => {
	render(<CreateClaim />);
});

describe('Create Claim Page tests', () => {
	it('should match snapshot', () => {
		const { asFragment } = render(<CreateClaim />);
		expect(asFragment()).toMatchSnapshot();
	});

	it('should contain form labels', () => {
		const policy = screen.getByLabelText(/policy number:/i);
		const holder = screen.getByLabelText(/holder name:/i);
		const item = screen.getByLabelText(/insured item/i);
		const amount = screen.getByLabelText(/claim amount/i);
		const description = screen.getByLabelText(/description/i);
		const date = screen.getByLabelText(/incident date/i);
		const processingFee = screen.getByLabelText(/processing fee/i);

		expect(policy).toBeInTheDocument();
		expect(holder).toBeInTheDocument();
		expect(item).toBeInTheDocument();
		expect(amount).toBeInTheDocument();
		expect(description).toBeInTheDocument();
		expect(date).toBeInTheDocument();
		expect(processingFee).toBeInTheDocument();
	});

	it('should contain a header', () => {
		const formHeading = screen.getByText(/create claim/i);
		expect(formHeading).toBeInTheDocument();
	});

	it('should contain a link back to the claims lists page', () => {
		const navigateToClaimList = screen.getByRole('button', {
			name: /show claim list/i,
		});

		expect(navigateToClaimList).toBeEnabled();
	});

	it('should contain a button to a new claim', () => {
		const navigateToClaimList = screen.getByRole('button', {
			name: /add new claim/i,
		});

		expect(navigateToClaimList).toBeEnabled();
	});
});
