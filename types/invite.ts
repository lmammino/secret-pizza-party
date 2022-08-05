import { Messages } from '../data/messages'

export interface Invite {
  code: string,
  name: string,
  favouriteColor: string,
  weapon: string,
  coming?: boolean,
}

export interface InviteResponse {
  invite: Invite,
  messages: Messages
}
