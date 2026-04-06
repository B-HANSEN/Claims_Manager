import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { generateId, formatDate } from './helper.js'
import { claimPayloadSchema } from './schemas.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = 8001

const claimsPath = join(__dirname, 'assets/claims.json')
const policiesPath = join(__dirname, 'assets/policies.json')

const readClaims = () => JSON.parse(readFileSync(claimsPath, 'utf-8'))
const writeClaims = (data) => writeFileSync(claimsPath, JSON.stringify(data, null, 2))
const readPolicies = () => JSON.parse(readFileSync(policiesPath, 'utf-8'))

const app = new Hono()

app.use('*', cors())

app.get('/api/v1/claims', (c) => {
  return c.json(readClaims().slice(0, 25))
})

app.post('/api/v1/claims', async (c) => {
  try {
    const body = await c.req.json()
    claimPayloadSchema.validateSync(body)
    const claims = readClaims()
    const newClaim = {
      id: claims.length + 1,
      ...body,
      number: generateId('CL-'),
      createdAt: formatDate(),
      status: 'Submitted',
    }
    claims.push(newClaim)
    writeClaims(claims)
    return c.json(newClaim, 201)
  } catch (err) {
    return c.json({ error: err.message }, 400)
  }
})

app.get('/api/v1/policies', (c) => {
  return c.json(readPolicies())
})

serve({ fetch: app.fetch, port: PORT }, () => {
  console.log(`Mock server running on http://localhost:${PORT}`)
})
