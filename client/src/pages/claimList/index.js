import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Header from '../../components/header';
import Search from '../../components/search';
import StatusFilter from '../../components/statusFilter';
import ClaimsTable from '../../components/table';
import { getClaimsList } from '../../utility/endpoints';
import './claimsList.css';

const ClaimList = () => {
	const [claims, setClaims] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState('ShowAll');

	useEffect(() => {
		const fetchClaims = async () => {
			let results = await getClaimsList();
			setClaims(results);
		};
		fetchClaims();
	}, []);

	const searchedClaims = claims.filter(
		(claim) =>
			claim.number === searchQuery ||
			claim.holder === searchQuery ||
			claim.policyNumber === searchQuery
	);

	const claimSet = searchQuery ? searchedClaims : claims;

	const filteredClaims = claimSet.filter((claim) =>
		statusFilter === 'ShowAll' ? claim : claim.status === statusFilter
	);

	return (
		<div className="ClaimList">
			<Header />
			<main id="main-content" className="ClaimList__MainSection">
				<h1>Overview claims</h1>
				<section className="ClaimList__Filter">
					<Search setValue={setSearchQuery} />
					<StatusFilter filter={statusFilter} setFilter={setStatusFilter} />
				</section>
				<Button className="mb-2" href="/?admin=true" size="lg" variant="outline-success">
					Admin Section
				</Button>{' '}
				<Button className="mb-2" href="/create-claim" size="lg" variant="outline-success">
					Create a new claim
				</Button>
				<section className="ClaimList__Table">
					<ClaimsTable filteredClaims={filteredClaims} />
				</section>
			</main>
		</div>
	);
};

export default ClaimList;
