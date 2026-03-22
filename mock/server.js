import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { generateId, formatDate } from './helper.js';
import { claimPayloadSchema } from './schemas.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 8001;

const claimsPath = join(__dirname, 'assets/claims.json');
const policiesPath = join(__dirname, 'assets/policies.json');

const readClaims = () => JSON.parse(readFileSync(claimsPath, 'utf-8'));
const writeClaims = (data) => writeFileSync(claimsPath, JSON.stringify(data, null, 2));
const readPolicies = () => JSON.parse(readFileSync(policiesPath, 'utf-8'));

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/v1/claims', (_req, res) => {
  res.json(readClaims().slice(0, 25));
});

app.post('/api/v1/claims', (req, res) => {
  try {
    claimPayloadSchema.validateSync(req.body);
    const claims = readClaims();
    const newClaim = {
      id: claims.length + 1,
      ...req.body,
      number: generateId('CL-'),
      createdAt: formatDate(),
      status: 'Submitted',
    };
    claims.push(newClaim);
    writeClaims(claims);
    res.status(201).json(newClaim);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/v1/policies', (_req, res) => {
  res.json(readPolicies());
});

app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});
