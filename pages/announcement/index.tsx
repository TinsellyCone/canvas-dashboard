import LogIn from '@/components/logIn'
import { useSession } from '@supabase/auth-helpers-react'
import { Stack } from '@mantine/core'
import Titlebar from '@/components/titlebar'

export default function Index() {
  const session = useSession()
  if (!session) {
    return <LogIn />
  }
  return (
    <>
      <Titlebar title={'Announcements'} order={2} />
      <Stack mx={24}>
        <h2>Coming Soon!</h2>
      </Stack>
    </>
  )
}
