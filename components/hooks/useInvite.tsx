import { useState, useEffect } from 'react'
import { InviteResponse } from '../../types/invite'

const API_BASE = process.env.API_ENDPOINT || (typeof window !== 'undefined' && (window.location.origin + '/api'))
const INVITE_ENDPOINT = API_BASE + '/invite'

async function fetchInvite (code: string): Promise<InviteResponse> {
  const requestUrl = new URL(INVITE_ENDPOINT)
  requestUrl.searchParams.append('code', code)
  const response = await fetch(requestUrl)
  if (!response.ok) {
    throw new Error('Invalid code')
  }
  const invite = await response.json()
  return invite
}

export default function useInvite (): [InviteResponse | null, string | null] {
  const [invite, setInvite] = useState<InviteResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = new URL(window.location.toString())
    const code = url.searchParams.get('code')

    if (!code) {
      setError('No code provided')
    } else {
      fetchInvite(code)
        .then(setInvite)
        .catch((err) => {
          setError(err.message)
        })
    }
  }, [])

  return [invite, error]
}
