import type { NextApiRequest, NextApiResponse } from 'next'
import { InviteResponse } from '../../types/invite'
import { getInvite } from '../../utils/airtable'
import messages from '../../data/messages'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<InviteResponse | { error: string }>
) {
  if (!req.query.code) {
    return res.status(400).json({ error: 'Missing invite code' })
  }

  const code = Array.isArray(req.query.code) ? req.query.code[0] : req.query.code
  try {
    const invite = await getInvite(code)
    res.status(200).json({ invite, messages })
  } catch (err) {
    const e = (err as Error)
    res.status(e.message === 'Invite not found' ? 401 : 500).json({ error: e.message })
  }
}
