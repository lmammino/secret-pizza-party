import Airtable from 'airtable'
import { Invite } from '../types/invite'

if (!process.env.AIRTABLE_API_KEY) {
  throw new Error('AIRTABLE_API_KEY is not set')
}

if (!process.env.AIRTABLE_BASE_ID) {
  throw new Error('AIRTABLE_BASE_ID is not set')
}

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)

function escape (value: string): string {
  if (value === null || typeof value === 'undefined') {
    return 'BLANK()'
  }

  if (typeof value === 'string') {
    const escapedString = value
      .replace(/"/g, '\\"')
      .replace(/\r/g, '')
      .replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\n')
      .replace(/\t/g, '\\t')
    return `"${escapedString}"`
  }

  if (typeof value === 'number') {
    return String(value)
  }

  if (typeof value === 'boolean') {
    return value ? '1' : '0'
  }

  throw Error('Invalid value received')
}

export function getInvite (inviteCode: string): Promise<Invite> {
  return new Promise((resolve, reject) => {
    base('invites').select({ filterByFormula: `invite = ${escape(inviteCode)}` }).firstPage((err, records) => {
      if (err) {
        console.error(err)
        return reject(err)
      }

      if (!records || records.length === 0) {
        return reject(new Error('Invite not found'))
      }

      const result = {
        code: String(records[0].fields.invite),
        name: String(records[0].fields.name),
        favouriteColor: String(records[0].fields.favouriteColor),
        weapon: String(records[0].fields.weapon)
      }

      resolve(result)
    })
  })
}
