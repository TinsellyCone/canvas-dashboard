import Titlebar from 'components/titlebar'
import Assignment from 'components/items/assignment'
import Page from 'components/items/page'
import { useRouter } from 'next/router'
import LogIn from 'components/logIn'
import { useSession } from '@supabase/auth-helpers-react'
import useToken from 'components/lib/useToken'
import useSWR from 'swr'
import { LoadingOverlay } from '@mantine/core'

export default function Index() {
  const router = useRouter()
  const { token } = useToken()
  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, error, isLoading } = useSWR(
    '/canvas/courses/' +
      router.query.className +
      '/assignments/' +
      router.query.assignmentName +
      '?access_token=' +
      token,
    fetcher
  )

  const session = useSession()
  if (!session) {
    return <LogIn />
  }

  if (isLoading) {
    return <LoadingOverlay visible />
  }

    return (
      <>
        <Titlebar
          title={data.name}
          backURL={('/class/' + router.query.className + '/assignment') as unknown as URL}
        />
        <Assignment content_id={data.id} />
      </>
    )
}
