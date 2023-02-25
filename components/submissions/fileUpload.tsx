import { useState } from 'react'
import {
  Button,
  Group,
  Text,
  useMantineTheme,
  Flex,
  Card,
  Table,
  MantineNumberSize,
  Image,
  ActionIcon,
} from '@mantine/core'
import { IconUpload, IconFileUpload, IconX } from '@tabler/icons'
import { openConfirmModal } from '@mantine/modals'
import { updateNotification, showNotification } from '@mantine/notifications'
import { Dropzone, DropzoneProps, FileWithPath } from '@mantine/dropzone'
import { IconCheck, IconFile } from '@tabler/icons-react'
import { NextRouter } from 'next/router'

export function FileUpload({
  content_id,
  token,
  router,
}: {
  content_id: string
  token: string | null
  router: NextRouter
}) {
  const theme = useMantineTheme()
  const [files, setFiles] = useState<FileWithPath[]>([])
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [refresh, setRefresh] = useState<any>(0)
  return (
    <div style={{ position: 'relative' }}>
      <Card
        opacity={files[0] == null ? '0%' : '100%'}
        withBorder
        w={'calc(50% - 6px)'}
        shadow={'sm'}
        h={256}
        style={{ overflow: 'scroll' }}
      >
        <Table>
          <tbody>
            {files.map((file, index) => {
              return (
                <tr>
                  <td>
                    <Group position={'apart'}>
                      <Group spacing={'sm'}>
                        <IconFile size={16} />
                        {file.name}
                      </Group>
                      <ActionIcon
                        variant='subtle'
                        onClick={() => {
                          files.splice(index, 1)
                          setRefresh(refresh + 1)
                        }}
                        radius={
                          process.env.NEXT_PUBLIC_RADIUS as MantineNumberSize
                        }
                      >
                        <IconX size={16} />
                      </ActionIcon>
                    </Group>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Card>
      <Dropzone
        onDrop={setFiles}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        pos={'absolute'}
        left={files[0] == null ? '0%' : 'calc(50% + 6px)'}
        top={'0px'}
        w={files[0] == null ? '100%' : 'calc(50% - 6px)'}
        style={{
          transition: 'left 0.25s ease-in-out, width 0.25s ease-in-out',
        }}
        // accept={IMAGE_MIME_TYPE}
      >
        <Group
          position='center'
          spacing='xl'
          style={{ minHeight: 220, pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <IconUpload
              size={50}
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === 'dark' ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size={50}
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconFileUpload size={50} stroke={1.5} />
          </Dropzone.Idle>
          <div>
            <Text size='xl' inline>
              Drag files here or click to select
            </Text>
            <Text size='sm' color='dimmed' inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      <Button
        disabled={files[0] == null || submitting}
        mt={'sm'}
        fullWidth
        variant='light'
        radius={process.env.NEXT_PUBLIC_RADIUS as MantineNumberSize}
        onClick={() =>
          openConfirmModal({
            title: 'Confirm submission',
            children: (
              <Text size='sm'>
                Are you absolutely sure you want to submit this?
              </Text>
            ),
            labels: { confirm: 'Confirm', cancel: 'Cancel' },
            onCancel: () => console.log('Submission Canceled'),
            onConfirm: () => submitFile(),
          })
        }
      >
        Submit Assignment
      </Button>
    </div>
  )
  async function submitFile() {
    console.log('Submitting: ' + files)
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
            body: URL.createObjectURL(files[0]),
            submission_type: 'online_upload',
          },
        }),
      }
    )
    updateNotification({
      id: 'submitting',
      color: 'teal',
      title: 'Submission completed',
      message: 'Your submission was successfully submitted!',
      icon: <IconCheck size={16} />,
      autoClose: 5000,
    })
    setSubmitting(false)
    setFiles([])
    // URL.revokeObjectURL(files[0])
  }
}
