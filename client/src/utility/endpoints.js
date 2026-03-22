export const getClaimsList = async () => {
	const claimsUrl = 'http://localhost:8001/api/v1/claims';

	try {
		let response = await fetch(claimsUrl);
		let data = await response.json();

		let allClaims = [];

		data.map((item) => {
			const mappedData = {
				amount: Number(item.amount),
				createdAt: item.createdAt,
				description: item.description,
				holder: item.holder,
				id: item.id,
				incidentDate: item.incidentDate,
				insuredItem: item.insuredItem,
				number: item.number,
				policyNumber: item.policyNumber,
				processingFee: Number(item.processingFee),
				status: item.status,
				totalFee: Number(item.amount) + Number(item.processingFee),
			};
			return allClaims.push(mappedData);
		});
		return allClaims;
	} catch (err) {
		throw err.message;
	}
};
