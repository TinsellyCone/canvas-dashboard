import Titlebar from 'components/titlebar'
import Modules from '@/components/modules/index'
import { useRouter } from 'next/router'
import LogIn from 'components/logIn'
import { useSession } from '@supabase/auth-helpers-react'

export default function Index({ setColorScheme }) {
  const router = useRouter()

  const session = useSession()
  if (!session) {
    return <LogIn />
  }

  return (
    <>
      <Titlebar
        title={'Modules'}
        backURL={'/' as unknown as URL}
      />
      <Modules courseID={router.query.className} />
    </>
  )
}
