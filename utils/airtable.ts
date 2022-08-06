import Airtable from 'airtable'
import { Invite } from '../types/invite'

// make sure all the necessary env vars are set
if (!process.env.AIRTABLE_API_KEY) {
  throw new Error('AIRTABLE_API_KEY is not set')
}
if (!process.env.AIRTABLE_BASE_ID) {
  throw new Error('AIRTABLE_BASE_ID is not set')
}

// create a new Airtable client and gets a reference to the
// airtable base containing our invites
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
const base = airtable.base(process.env.AIRTABLE_BASE_ID)

// get an invite by invite code (promisified)
export function getInvite (inviteCode: string): Promise<Invite> {
  return new Promise((resolve, reject) => {
    base('invites')
      // runs a query on the `invites` table
      .select({
        filterByFormula: `{invite} = ${inviteCode}`,
        maxRecords: 1
      })
      // reads the first page of results
      .firstPage((err, records) => {
        if (err) {
          // propagate errors
          console.error(err)
          return reject(err)
        }

        // if the record could not be found
        // we consider it an error
        if (!records || records.length === 0) {
          return reject(new Error('Invite not found'))
        }

        // otherwise we create an invite object from the first record
        // (there should be only one with the give code) and return it
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
