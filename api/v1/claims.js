const { readFileSync } = require('fs');
const { join } = require('path');

module.exports = function handler(req, res) {
	const claims = JSON.parse(readFileSync(join(process.cwd(), 'mock/assets/claims.json'), 'utf-8'));
	res.status(200).json(claims.slice(0, 25));
};
