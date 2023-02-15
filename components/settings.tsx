import {
  Modal,
  Stack,
  Switch,
  Flex,
  NavLink,
  SegmentedControl,
  Text,
  Group,
} from '@mantine/core'
import { useState } from 'react'

export default function SettingsModal({ isSettingsOpen, setSettingsOpen }) {
  const [activeTab, setActiveTab] = useState('profile')
  return (
    <Modal
      overflow={'inside'}
      size={'lg'}
      onClose={() => setSettingsOpen(false)}
      opened={isSettingsOpen}
      title={'Settings'}
      centered
    >
      <Flex gap={20} pb={30}>
        <Stack spacing={0}>
          <NavLink
            label={'Profile'}
            w={150}
            onClick={() => setActiveTab('profile')}
          />
          <NavLink label={'API'} w={150} onClick={() => setActiveTab('api')} />
          <NavLink
            label={'Display'}
            w={150}
            onClick={() => setActiveTab('display')}
          />
        </Stack>
        {activeTab == 'profile' ? (
          <Stack>
            <Text fz={'xl'} fw={700} mt={0}>
              Profile Settings
            </Text>
            <Switch label={'Public Profile'} />
            <Switch label={'Public Profile'} />
            <Switch label={'Public Profile'} />
          </Stack>
        ) : null}
        {activeTab == 'api' ? (
          <Stack>
            <Text fz={'xl'} fw={700} mt={0}>
              API Settings
            </Text>
            <Switch label={'Public Profile'} />
            <Switch label={'Public Profile'} />
            <Switch label={'Public Profile'} />
          </Stack>
        ) : null}
        {activeTab == 'display' ? (
          <Stack>
            <Text fz={'xl'} fw={700} mt={0}>
              Display Settings
            </Text>
            <Stack spacing={5}>
              <Text fz={'sm'}>Color Scheme:</Text>
              <SegmentedControl
                data={[
                  { label: 'Light', value: 'light' },
                  { label: 'Dark', value: 'dark' },
                ]}
              />
            </Stack>
            <Switch label={'Public Profile'} />
            <Switch label={'Public Profile'} />
          </Stack>
        ) : null}
      </Flex>
    </Modal>
  )
}
