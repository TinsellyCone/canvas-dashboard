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
} from '@mantine/core'
import { IconNotebook, IconDotsVertical, IconCheck } from '@tabler/icons'
import Link from 'next/link'
import { useState } from 'react'

function ActiveBadge(props) {
  if (props.active) {
    return <Badge color={'green'}>Active</Badge>
  }
  else return(<></>)
}

export default function ClassCard(props) {
  // imagePath, className, grade, active

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
          <IconNotebook size={'20'} color={'gray'} />
          <Text color={'dimmed'} size={'sm'} lineClamp={1} maw={200}>
            Sprial Homework
          </Text>
        </Group>
        <Group position='left' spacing={'xs'}>
          <IconNotebook size={'20'} color={'gray'} />
          <Text color={'dimmed'} size={'sm'} lineClamp={1} maw={200}>
            Review Guide
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
          radius={process.env.NEXT_PUBLIC_RADIUS}
        >
          View
        </Button>
        <ActionIcon size={36} variant='light' onClick={() => setOpened(true)} radius={process.env.NEXT_PUBLIC_RADIUS}>
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
          radius={process.env.NEXT_PUBLIC_INPUT_RADIUS}
        />
        <Badge color={'red'}>Placeholder</Badge>
        <NumberInput
          defaultValue={props.cardPosition}
          placeholder={props.cardPosition}
          label='Card Position'
          my={10}
          min={1}
          radius={process.env.NEXT_PUBLIC_INPUT_RADIUS}
        />
        <Button
          mt={10}
          variant={'light'}
          onClick={() => setOpened(false)}
          color={'gray'}
          radius={process.env.NEXT_PUBLIC_RADIUS}
        >
          Close
        </Button>
      </Modal>
    </Card>
  )
}
