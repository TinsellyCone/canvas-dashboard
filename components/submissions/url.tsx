import { Button, MantineNumberSize, Text, TextInput, Card, Flex } from '@mantine/core'
import { useState } from 'react'
import { openConfirmModal } from '@mantine/modals'
import { updateNotification, showNotification } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'
import { NextRouter } from 'next/router'

export default function URLSubmission({
  content_id,
  token,
  router,
}: {
  content_id: string
  token: string | null
  router: NextRouter
  }) {
  const [submitting, setSubmitting] = useState(false)
  const [textContent, setTextContent] = useState('')
  return (
    <Card withBorder shadow={'sm'}>
      <Flex align={'center'} direction={'column'}>
        <TextInput
          onChange={(event) => setTextContent(event.target.value)}
          value={textContent}
          radius={process.env.NEXT_PUBLIC_INPUT_RADIUS as MantineNumberSize}
          w={550}
          placeholder={'https://'}
          label={'URL Submission'}
          description={'Type or paste a URL here'}
        />
        <Button
          onClick={submitURL}
          disabled={submitting || !(textContent.startsWith('http://') || textContent.startsWith('https://')) }
          radius={process.env.NEXT_PUBLIC_RADIUS as MantineNumberSize}
          mt={24}
          w={550}
          variant={'light'}
        >
          Submit Assignment
        </Button>
      </Flex>
    </Card>
  )

  async function submitURL() {
    console.log('Submitting: ' + textContent)
    setSubmitting(true)
    showNotification({
      id: 'submitting',
      loading: true,
      title: 'Submission in progress...',
      message: 'This may take a few seconds',
      autoClose: false,
      disallowClose: true,
    })
    const response = await fetch(
      '/canvas/courses/' +
        router.query.className +
        '/assignments/' +
        content_id +
        '/submissions?access_token=' +
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
          submission: {
            url: textContent,
            submission_type: 'online_url',
          },
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
        title: 'Submission completed',
        message: 'Your submission was successfully submitted!',
        icon: <IconCheck size={16} />,
        autoClose: 5000,
      })
    }
    setSubmitting(false)
    setTextContent('')
  }
}

