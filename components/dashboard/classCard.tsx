import {
  Button,
  Badge,
  Text,
  Card,
  Image,
  Group,
  Stack,
  Divider,
  ActionIcon,
  Modal,
  ColorInput,
  NumberInput,
  Skeleton,
  MantineNumberSize,
} from '@mantine/core'
import { IconNotebook, IconDotsVertical, IconCheck } from '@tabler/icons'
import Link from 'next/link'
import { useState } from 'react'
import useSWR from 'swr'
import useToken from 'components/lib/useToken'
import SkeletonCard from './skeletonCard'

function ActiveBadge(props) {
  if (props.active) {
    return <Badge color={'green'}>Active</Badge>
  } else return <></>
}

export default function ClassCard(props) {
  // imagePath, className, grade, active
  const { token } = useToken()
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const {
    data: assignmentData,
    error: assignmentError,
    isLoading: assignmentLoading,
  } = useSWR(
    '/canvas/courses/' +
      props.id +
      '/assignments?access_token=' +
      token +
      '&per_page=2&order_by=due_at',
    fetcher
    )
  const {
    data: announcementData,
    error: announcementError,
    isLoading: announcementLoading,
  } = useSWR(
    [
      '/canvas/anouncements?access_token=' + token,
      {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
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
          context_codes: ['course_' + props.id],
        }),
      },
    ],
    fetcher
  )
  console.log(announcementData)

  const [opened, setOpened] = useState(false)
  return (
    <Card w={300} shadow={'lg'} radius={'md'} p={'lg'} withBorder>
      <Card.Section>
        <Image src={props.imagePath} height={175} withPlaceholder></Image>
      </Card.Section>
      <Group position='apart' mt={'md'} mb={'xs'}>
        <Stack justify={'center'} spacing={0}>
          <Text size={'lg'} weight={600} m={0} lineClamp={1} maw={170}>
            {props.className}
          </Text>
          <Text m={0} size={'xs'} color={'dimmed'} maw={120}>
            {props.grade + '% Average'}
          </Text>
        </Stack>
        <ActiveBadge active={props.active} />
      </Group>

      <Divider mb={'sm'}></Divider>

      <Stack spacing={'xs'}>
        <Group position='left' spacing={'xs'}>
          {assignmentLoading ? (
            <Skeleton w={20} h={20} />
          ) : (
            <IconNotebook size={'20'} color={'gray'} />
          )}
          <Text color={'dimmed'} size={'sm'} lineClamp={1} maw={200}>
            {!assignmentLoading ? (
              assignmentData[0] != null ? (
                assignmentData[0].name
              ) : null
            ) : (
              <Skeleton visible h={15} w={75} />
            )}
          </Text>
        </Group>
        <Group position='left' spacing={'xs'}>
          {assignmentLoading ? (
            <Skeleton w={20} h={20} />
          ) : (
            <IconNotebook size={'20'} color={'gray'} />
          )}
          <Text color={'dimmed'} size={'sm'} lineClamp={1} maw={200}>
            {!assignmentLoading ? (
              assignmentData[1] != null ? (
                assignmentData[1].name
              ) : null
            ) : (
              <Skeleton visible h={15} w={75} />
            )}
          </Text>
        </Group>
      </Stack>
      <Group position='center' mt={'md'} spacing={'xs'}>
        <Button
          variant='light'
          component={Link}
          href={'/class/' + props.id}
          color={props.color}
          style={{ flex: 1 }}
          radius={process.env.NEXT_PUBLIC_RADIUS as MantineNumberSize}
        >
          View
        </Button>
        <ActionIcon
          size={36}
          variant='light'
          onClick={() => setOpened(true)}
          radius={process.env.NEXT_PUBLIC_RADIUS as MantineNumberSize}
        >
          <IconDotsVertical size={20} />
        </ActionIcon>
      </Group>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title='Edit Card'
        centered
      >
        <Badge color={'red'}>Placeholder</Badge>
        <ColorInput
          placeholder='#ffffff'
          label='Card Color'
          value={props.cardColor}
          my={10}
          radius={process.env.NEXT_PUBLIC_INPUT_RADIUS as MantineNumberSize}
        />
        <Badge color={'red'}>Placeholder</Badge>
        <NumberInput
          defaultValue={props.cardPosition}
          placeholder={props.cardPosition}
          label='Card Position'
          my={10}
          min={1}
          radius={process.env.NEXT_PUBLIC_INPUT_RADIUS as MantineNumberSize}
        />
        <Button
          mt={10}
          variant={'light'}
          onClick={() => setOpened(false)}
          color={'gray'}
          radius={process.env.NEXT_PUBLIC_RADIUS as MantineNumberSize}
        >
          Close
        </Button>
      </Modal>
    </Card>
  )
}
