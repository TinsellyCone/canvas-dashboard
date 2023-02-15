import Head from 'next/head'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function LogIn() {
  const supabase = useSupabaseClient()
  return (
    <div style={{maxWidth: 350, margin: '0 auto'}}>
      <Head>
        <title>Log Into {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
    </div>
  )
}