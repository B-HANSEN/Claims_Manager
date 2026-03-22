const { readFileSync } = require('fs');
const { join } = require('path');

const claims = JSON.parse(readFileSync(join(__dirname, '../../mock/assets/claims.json'), 'utf-8'));

module.exports = function handler(req, res) {
	res.status(200).json(claims.slice(0, 25));
};
