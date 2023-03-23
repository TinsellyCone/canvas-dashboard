import {
  useSession,
  useUser,
  useSupabaseClient,
} from '@supabase/auth-helpers-react'
import { PostgrestError } from '@supabase/supabase-js'
import { SetStateAction, useEffect, useState } from 'react'

export interface profile {
  full_name: string
  description: string
  avatar_url: string
  color: string
  token: string
  settings: any
}

export default function useProfile(id: string): {
  error: PostgrestError | undefined
  loading: boolean
  setDB: Function
  db: profile | undefined
} {
  const [data, setData] = useState<profile | undefined>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<PostgrestError | undefined>(undefined)

  const session = useSession()
  const supabase = useSupabaseClient()
  const user = useUser()

  useEffect(() => {
    const fetchName = async () => {
      try {
        setLoading(true)
        if (!user) return
        if (id == null) id = user.id
        const { data, error } = await supabase
          .from('profiles')
          .select()
          .eq('id', id)
          .single()
        if (error) setError(error)
        if (data) {
          setData(data)
          setError(undefined)
        }
        setLoading(false)
      } catch (err) {
        alert(err)
      }
    }
    fetchName()
  }, [session])

  return { db: data, setDB: setData, loading, error }
}
