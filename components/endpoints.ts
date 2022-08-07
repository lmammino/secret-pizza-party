// Defines the endpoint based on the current window location
const API_BASE = process.env.API_ENDPOINT || (typeof window !== 'undefined' && (window.location.origin + '/api'))

export const INVITE_ENDPOINT = API_BASE + '/invite'
export const RSVP_ENDPOINT = API_BASE + '/rsvp'
