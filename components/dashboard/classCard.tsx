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
import styles from './classCard.module.css'

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
    <Card w={300} shadow={'lg'} radius={'md'} p={'lg'} withBorder className={styles.card}>
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
        >
          View
        </Button>
        <ActionIcon size={36} variant='light' onClick={() => setOpened(true)}>
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
        />
        <Badge color={'red'}>Placeholder</Badge>
        <NumberInput
          defaultValue={props.cardPosition}
          placeholder={props.cardPosition}
          label='Card Position'
          my={10}
          min={1}
        />
        <Button
          mt={10}
          variant={'light'}
          onClick={() => setOpened(false)}
          color={'gray'}
        >
          Close
        </Button>
      </Modal>
    </Card>
  )
}
