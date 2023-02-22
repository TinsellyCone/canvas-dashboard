import useSWR from 'swr'
import { useRouter } from 'next/router';
import useToken from 'components/lib/useToken';
import { LoadingOverlay } from '@mantine/core';

export default function Assignment({ content_id }) {
  const { token } = useToken()
  const router = useRouter()
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    "/canvas/courses/" +
      router.query.className +
      "/assignments/" +
      content_id + "?access_token=" + token,
    fetcher
  );
  if (!isLoading) return (
    <div style={{marginLeft: 24}} dangerouslySetInnerHTML={{__html:data.description}} />
  )
  else {
    return (
      <LoadingOverlay visible />
    )
  }
}


