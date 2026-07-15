import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const claims = JSON.parse(readFileSync(join(__dirname, '../../mock/assets/claims.json'), 'utf-8'))

export default function handler(req, res) {
	res.status(200).json(claims.slice(0, 25))
}
