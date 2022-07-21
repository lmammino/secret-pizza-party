import type { NextApiRequest, NextApiResponse } from 'next'
import { Invite } from '../../types/invite'
import { getInvite } from '../../utils/airtable'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Invite | { error: string }>
) {
  if (!req.query.code) {
    return res.status(400).json({ error: 'Missing invite code' })
  }

  const code = Array.isArray(req.query.code) ? req.query.code[0] : req.query.code
  try {
    const data = await getInvite(code)
    res.status(200).json(data)
  } catch (err) {
    const e = (err as Error)
    res.status(e.message === 'Invite not found' ? 401 : 500).json({ error: e.message })
  }
}
