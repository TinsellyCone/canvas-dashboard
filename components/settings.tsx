import {
  Modal,
  Stack,
  Switch,
  Flex,
  NavLink,
  SegmentedControl,
  Text,
  Group,
  useMantineColorScheme,
  Divider,
  Title
} from '@mantine/core'
import { useState } from 'react'
import Option from './settingsoption'

export default function SettingsModal({ isSettingsOpen, setSettingsOpen }) {
  const [activeTab, setActiveTab] = useState('profile')
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  return (
    <Modal
      overflow={"inside"}
      size={"xl"}
      onClose={() => setSettingsOpen(false)}
      opened={isSettingsOpen}
      title={"Settings"}
      centered
    >
      <Flex gap={20} pb={30}>
        <Stack spacing={0}>
          <NavLink
            label={"Profile"}
            w={150}
            onClick={() => setActiveTab("profile")}
          />
          <NavLink label={"API"} w={150} onClick={() => setActiveTab("api")} />
          <NavLink
            label={"Display"}
            w={150}
            onClick={() => setActiveTab("display")}
          />
        </Stack>
        {activeTab == "profile" ? (
          <Stack w={"100%"}>
            <Title order={2} fw={700} mt={0}>
              Display Settings
            </Title>
            <Option title={'Profile Publicity'} description={'Should your profile be shown to other students'} option={<Switch />} />
          </Stack>
        ) : null}
        {activeTab == "api" ? (
          <Stack w={"100%"}>
            <Title order={2} fw={700} mt={0}>
              API Settings
            </Title>
            <Switch label={"Public Profile"} />
            <Switch label={"Public Profile"} />
            <Switch label={"Public Profile"} />
          </Stack>
        ) : null}
        {activeTab == "display" ? (
          <Stack w={"100%"}>
            <Title order={2} fw={700} mt={0}>
              Display Settings
            </Title>
            <Group position={"apart"}>
              <Stack spacing={0}>
                <Text fw={600} fz={"md"}>
                  Color Scheme
                </Text>
                <Text fz={"sm"} color={"dimmed"}>
                  Change the appearance of the website
                </Text>
              </Stack>
              <SegmentedControl
                radius={process.env.NEXT_PUBLIC_RADIUS}
                value={colorScheme}
                onChange={(value: "light" | "dark") => toggleColorScheme(value)}
                data={[
                  { label: "Light", value: "light" },
                  { label: "Dark", value: "dark" },
                ]}
                w={"min-content"}
              />
            </Group>
            <Switch label={"Public Profile"} />
            <Switch label={"Public Profile"} />
          </Stack>
        ) : null}
      </Flex>
    </Modal>
  );
}
