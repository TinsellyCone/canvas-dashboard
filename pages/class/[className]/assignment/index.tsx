import Titlebar from 'components/titlebar'
import Assignments from '@/components/assignments/main'
import { useRouter } from 'next/router'
import LogIn from 'components/logIn'
import { useSession } from '@supabase/auth-helpers-react'

export default function Index() {
  const router = useRouter()

  const session = useSession()
  if (!session) {
    return <LogIn />
  }

  return (
    <>
      <Titlebar title={'Assignments'} backURL={'/' as unknown as URL} />
      <Assignments courseID={router.query.className} />
    </>
  )
}
