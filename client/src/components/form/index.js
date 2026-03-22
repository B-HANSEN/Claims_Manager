import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import './form.css';

const ClaimsForm = () => {
	const [policyNumber, setPolicyNumber] = useState('');
	const [holder, setHolder] = useState('');
	const [insuredItem, setInsuredItem] = useState('');
	const [amount, setAmount] = useState('');
	const [description, setDescription] = useState('');
	const [incidentDate, setIncidentDate] = useState('');
	const [processingFee, setProcessingFee] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newClaim = {
			policyNumber,
			holder,
			insuredItem,
			amount,
			description,
			incidentDate,
			processingFee,
		};
		const claimsUrl = 'http://localhost:8001/api/v1/claims';

		try {
			await fetch(claimsUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newClaim),
			}).then((response) => {
				console.log('success writing to server', response);
				console.log('body', JSON.stringify(newClaim));
			});
		} catch (err) {
			throw err.message;
		} finally {
			navigate('/');
		}
	};

	return (
		<section className="Form">
			<Form onSubmit={handleSubmit}>
				<Form.Group as={Row} className="mb-4" controlId="policyNumber">
					<Form.Label column="lg" lg={2}>
						Policy number:
					</Form.Label>
					<Col sm="6">
						<Form.Control
							value={policyNumber}
							size="lg"
							type="text"
							required
							onChange={(e) => setPolicyNumber(e.target.value)}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="mb-4" controlId="holder">
					<Form.Label column="lg" lg={2}>
						Holder name:
					</Form.Label>
					<Col sm="6">
						<Form.Control
							value={holder}
							size="lg"
							type="text"
							required
							onChange={(e) => setHolder(e.target.value)}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="mb-4" controlId="insuredItem">
					<Form.Label column="lg" lg={2}>
						Insured item:
					</Form.Label>
					<Col sm="6">
						<Form.Control
							value={insuredItem}
							size="lg"
							type="text"
							required
							onChange={(e) => setInsuredItem(e.target.value)}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="mb-4" controlId="amount">
					<Form.Label column="lg" lg={2}>
						Claim amount:
					</Form.Label>
					<Col sm="6">
						<Form.Control
							value={amount}
							size="lg"
							type="number"
							required
							onChange={(e) => setAmount(e.target.value)}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="mb-4" controlId="description">
					<Form.Label column="lg" lg={2}>
						Description:
					</Form.Label>
					<Col sm="6">
						<Form.Control
							value={description}
							size="lg"
							type="text"
							required
							onChange={(e) => setDescription(e.target.value)}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="mb-4" controlId="incidentDate">
					<Form.Label column="lg" lg={2}>
						Incident Date:
					</Form.Label>
					<Col sm="6">
						<Form.Control
							placeholder="YYYY-MM-DD"
							value={incidentDate}
							size="lg"
							type="date"
							required
							onChange={(e) => setIncidentDate(e.target.value)}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="mb-4" controlId="processingFee">
					<Form.Label column="lg" lg={2}>
						Processing Fee:
					</Form.Label>
					<Col sm="6">
						<Form.Control
							value={processingFee}
							size="lg"
							type="text"
							required
							onChange={(e) => setProcessingFee(e.target.value)}
						/>
					</Col>
				</Form.Group>
				<Button className='mb-2' href='/' size='lg' variant='outline-success'>
					Show claim list
				</Button>{' '}
				<Button className="mb-2" size="lg" type="submit" variant="success">
					Add new claim
				</Button>
			</Form>
		</section>
	);
};

export default ClaimsForm;
