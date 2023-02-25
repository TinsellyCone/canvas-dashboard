import useSWR from 'swr'
import { useRouter } from 'next/router'
import useToken from 'components/lib/useToken'
import { LoadingOverlay } from '@mantine/core'

export default function Page({ page_url }) {
  const { token } = useToken()
  const router = useRouter()
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, isLoading, error } = useSWR(
    '/canvas/courses/' +
      router.query.className +
      '/pages/' +
      page_url +
      '?access_token=' +
      token,
    fetcher
  )
  if (!isLoading) {
    return (
      <div
        style={{ marginLeft: 24 }}
        dangerouslySetInnerHTML={{ __html: data.body }}
      />
    )
  } else {
    return <LoadingOverlay visible />
  }
}
