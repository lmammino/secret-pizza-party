import { useState, useEffect } from 'react'

function delay (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

interface Invite {
  code: string,
  name: string,
  color: string,
  weapon: string,
  coming?: boolean,
}

export default function useInvite (): [Invite | null, string | null] {
  const [invite, setInvite] = useState<Invite | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const init = async () => {
      try {
        await delay(2000)
        const invite = {
          code: 'ce7d5886-2166-4aee-8038-548f68b9739d',
          name: 'Donatello',
          color: 'purple',
          weapon: 'Bo'
        }
        setInvite(invite)
      } catch (error) {
        setError((error as Error).message)
      }
    }
    init()
  }, [])

  return [invite, error]
}
