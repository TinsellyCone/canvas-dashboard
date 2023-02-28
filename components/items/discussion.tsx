import useSWR from 'swr'
import { useRouter } from 'next/router'
import useToken from 'components/lib/useToken'
import { openConfirmModal } from '@mantine/modals'
import { updateNotification, showNotification } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'
import {
  Card,
  Title,
  Text,
  Stack,
  Divider,
  Button,
  Textarea,
} from '@mantine/core'
import style from './discussion.module.css'
import { CommentHtml } from './comment'
import { useState } from 'react'

export default function Discussion({ content_id }: { content_id: string }) {
  const [submitting, setSubmitting] = useState(false)
  const [textContent, setTextContent] = useState('')
  const { token } = useToken()
  const router = useRouter()
  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, isLoading, error } = useSWR(
    '/canvas/courses/' +
      router.query.className +
      '/discussion_topics/' +
      content_id +
      '?access_token=' +
      token,
    fetcher
  )
  const {
    data: fullData,
    isLoading: fullIsLoading,
    error: fullError,
  } = useSWR(
    '/canvas/courses/' +
      router.query.className +
      '/discussion_topics/' +
      content_id +
      '/view' +
      '?access_token=' +
      token,
    fetcher
    )
  var users = [{}]
  if (fullData != undefined && fullData.view != undefined) for (let i = 0; i < fullData.view.length; i++) {
    for (let ii = 0; ii < fullData.participants.length; ii++) {
      if (fullData.view[i].user_id == fullData.participants[ii].id) {
        users = (users.concat([{name: fullData.participants[ii].display_name, image: fullData.participants[ii].avatar_image_url}]))
      }
      if (fullData.view[i].user_id == undefined) {
        users = (users.concat([{ name: 'Deleted', image: '' }]))
        i++
      }
    }
  }
  if (!isLoading) {
    return (
      <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '24px'}}>
        <Card withBorder radius={'md'} shadow={'lg'} p={32} mb={48} maw={750} w={'100%'}>
          <Stack mb={32}>
            <Title order={2}>{data.title}</Title>
          </Stack>
          <Text className={style.discussion} dangerouslySetInnerHTML={{ __html: data.message }} />
          <Textarea
            value={textContent}
            onChange={(event) => setTextContent(event.target.value)}
            placeholder='Type something...'
            mb={12}
          />
          <Button disabled={submitting || textContent == ''} onClick={submitText} variant='light' fullWidth>
            Post Reply
          </Button>
          {fullData != undefined &&
          fullData.view != undefined &&
          fullData.participants != undefined ? (
            <>
              <Divider my={32} />
              <Stack spacing={'sm'}>
                {fullData.view.map((comment: any, index: number) => {
                  return (
                    <CommentHtml
                      key={index}
                      className={style.discussion}
                      // @ts-ignore
                      author={users[index + 1]}
                      body={comment.message}
                      postedAt={
                        new Date(comment.updated_at).toLocaleString('en-us', {
                          timeZone: 'EST',
                          day: '2-digit',
                          month: 'short',
                          hour: 'numeric',
                          minute: 'numeric',
                        }) || 'N/A'
                      }
                    />
                  )
                })}
              </Stack>
            </>
          ) : (
            <></>
          )}
        </Card>
      </div>
    )
  } else {
    return <></>
  }
  async function submitText() {
    console.log('Submitting: ' + textContent)
    setSubmitting(true)
    showNotification({
      id: 'submitting',
      loading: true,
      title: 'Reply in progress...',
      message: 'This may take a few seconds',
      autoClose: false,
      disallowClose: true,
    })
    const response = await fetch(
      '/canvas/courses/' +
        router.query.className +
        '/discussion_topics/' +
        content_id +
        '/entries?access_token=' +
        token,
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
          message: textContent
        }),
      }
    )
    if (response.statusText == 'Bad Request') {
      updateNotification({
        id: 'submitting',
        color: 'red',
        title: 'Something went wrong!',
        message: 'Error: ' + response.statusText,
        icon: <IconX size={16} />,
        autoClose: 15000,
      })
    } else {
      updateNotification({
        id: 'submitting',
        color: 'teal',
        title: 'Reply completed',
        message: 'Your reply was successfully sent!',
        icon: <IconCheck size={16} />,
        autoClose: 5000,
      })
    }
    console.log(response)
    setSubmitting(false)
    setTextContent('')
  }
}
