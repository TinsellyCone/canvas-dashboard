import useSWR from 'swr'
import { useRouter } from 'next/router';
import useToken from 'components/lib/useToken';
import { LoadingOverlay, Card, Group, Flex } from '@mantine/core';
import TextEditor from 'components/submissions/richText'
import { FileUpload } from 'components/submissions/fileUpload';
import DataStack from './dataStack';

export default function Assignment({ content_id }: {content_id: string}) {
  const { token } = useToken()
  const router = useRouter()
  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    "/canvas/courses/" +
      router.query.className +
      "/assignments/" +
      content_id + "?access_token=" + token,
    fetcher
  );

  if (!isLoading) return (
    <div style={{ marginLeft: 24, marginRight: 24, marginBottom: 24 }}>
      <Card w={'100%'} mb={24} shadow={'md'} withBorder>
        <Flex justify={'space-evenly'} align={'center'}>
          <DataStack data={new Date(data.due_at).toLocaleString('en-us', {timeZone: 'EST', day:'2-digit', month:'2-digit'}) || 'N/A'} label='Due Date' />
          <DataStack data={data.points_possible || 'N/A'} label='Points' />
          <DataStack data={data.allowed_attempts == -1 ? '∞' : data.allowed_attempts || '∞'} label='Attempts' />
        </Flex>
      </Card>
      <div dangerouslySetInnerHTML={{ __html: data.description }} />
      {checkSubmissionType(data, 'online_text_entry') ? (
        <TextEditor content_id={content_id} token={token} router={router} />
      ) : null}
      {checkSubmissionType(data, 'online_upload') ? (
        <FileUpload content_id={content_id} token={token} router={router} />
      ) : null}
    </div>
  )
  else {
    return (
      <LoadingOverlay visible />
    )
  }
  function checkSubmissionType(data: {submission_types: string[]}, type: string) {
    let currentReturn = false;
    if (data.submission_types != null) data.submission_types.map((currentType: string) => {
      if (currentType == type) currentReturn = true
    })
    return(currentReturn)
  }
}