import useSWR from 'swr'
import { useRouter } from 'next/router';
import useToken from 'components/lib/useToken';
import { LoadingOverlay, Card, Group, Flex, Button, ActionIcon, Collapse } from '@mantine/core';
import TextEditor from 'components/submissions/richText'
import { FileUpload } from 'components/submissions/fileUpload';
import DataStack from './dataStack';
import { useState } from 'react';
import { IconExternalLink, IconForms, IconUpload } from '@tabler/icons-react';
import Link from 'next/link';
import style from './assignment.module.css'

export default function Assignment({ content_id }: {content_id: string}) {
  const { token } = useToken()
  const router = useRouter()
  const [submissionType, setSubmissionType] = useState<string>()
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
          <DataStack
            data={
              new Date(data.due_at).toLocaleString('en-us', {
                timeZone: 'EST',
                day: '2-digit',
                month: '2-digit',
              }) || 'N/A'
            }
            label='Due Date'
          />
          <DataStack data={data.points_possible || 'N/A'} label='Points' />
          <DataStack
            data={
              data.allowed_attempts == -1 ? '∞' : data.allowed_attempts || '∞'
            }
            label='Attempts'
          />
        </Flex>
      </Card>
      {/* <Button onClick={() => setSubmissionType('online_text_entry')} opacity={submissionType != undefined ? 0 : 1} style={{position:'fixed', bottom: 24, zIndex: 99}} variant={'filled'} w={'calc(100% - 106px)'}>Submit Assignment</Button> */}
      <div
        className={style.assignment}
        dangerouslySetInnerHTML={{ __html: data.description }}
      />
      <Group my={24}>
        {checkSubmissionType(data, 'online_text_entry') ? (
          <ActionIcon
            radius={'md'}
            color={'blue'}
            w={70}
            h={70}
            variant={'light'}
            onClick={() =>
              setSubmissionType(
                submissionType == 'online_text_entry'
                  ? undefined
                  : 'online_text_entry'
              )
            }
          >
            <IconForms size={30} />
          </ActionIcon>
        ) : null}
        {checkSubmissionType(data, 'online_upload') ? (
          <ActionIcon
            radius={'md'}
            color={'blue'}
            w={70}
            h={70}
            variant={'light'}
            onClick={() =>
              setSubmissionType(
                submissionType == 'online_upload' ? undefined : 'online_upload'
              )
            }
          >
            <IconUpload size={30} />
          </ActionIcon>
        ) : null}
        <ActionIcon
          radius={'md'}
          color={'blue'}
          w={70}
          h={70}
          variant={'light'}
          component={'a'}
          href={data.html_url || '#'}
          target={'_blank'}
        >
          <IconExternalLink size={30} />
        </ActionIcon>
      </Group>
      <Collapse in={submissionType == 'online_text_entry'}>
        <TextEditor content_id={content_id} token={token} router={router} />
      </Collapse>
      <Collapse in={submissionType == 'online_upload'}>
        <FileUpload content_id={content_id} token={token} router={router} />
      </Collapse>
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