import useSWR from 'swr'
import { useRouter } from 'next/router'
import useToken from 'components/lib/useToken'
import { LoadingOverlay } from '@mantine/core'
import style from './page.module.css'

export default function Page({ page_url }: {page_url: string}) {
  const { token } = useToken()
  const router = useRouter()
  // @ts-ignore
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
      <div style={{ marginLeft: 24, marginRight: 24, marginBottom: 24 }}>
        <div
          dangerouslySetInnerHTML={{ __html: data.body }}
          className={style.page}
        />
      </div>
    )
  } else {
    return <></>
  }
}
