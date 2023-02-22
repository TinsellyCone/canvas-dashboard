import { Stack, ActionIcon, Avatar, useMantineTheme, Menu } from '@mantine/core'
import { IconLogout, IconSettings, IconUser } from '@tabler/icons'
import { IconDashboard } from '@tabler/icons-react'
import { useState } from 'react'
import Link from 'next/link'
import SettingsModal from 'components/settings'
import useAvatar from 'components/lib/useAvatar'
import useName from 'components/lib/useName'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Navbar() {
  const [isSettingsOpen, setSettingsOpen] = useState(false)
  const theme = useMantineTheme()
  const { avatarURL } = useAvatar()
  const session = useSession();
  const supabase = useSupabaseClient()
  const { name: full_name } = useName()

  return (
    <div style={{ zIndex: 1000 }}>
      <Stack
        p={"sm"}
        style={{ outline: "1px solid dimmed" }}
        top={0}
        left={0}
        w={"fit-content"}
        h={"100vh"}
        pos={"sticky"}
        bg={
          theme.colorScheme === "dark"
            ? theme.colors.dark[8]
            : theme.colors.gray[0]
        }
        justify={"space-between"}
      >
        <Stack>
          <ActionIcon size={"lg"} variant="light" component={Link} href="/" radius={process.env.NEXT_PUBLIC_RADIUS}>
            <IconDashboard size={20} />
          </ActionIcon>
        </Stack>
        <Stack>
          <Menu position="right-end" transition={"pop-top-left"}>
            <Menu.Target>
              <Avatar
                style={{ cursor: "pointer" }}
                size={34}
                src={avatarURL}
                radius={"xl"}
                color={'blue'}
              >
                {full_name != null ? full_name.split(" ")[0].charAt(0).toUpperCase() +
                  (full_name.split(" ").length >= 2
                    ? full_name.split(" ")[full_name.split(" ").length - 1].charAt(0)
                    : "").toUpperCase() : ''}
              </Avatar>
            </Menu.Target>
            <Menu.Dropdown>
              {full_name != null ? (
                <>
                  <Menu.Label>Hi, {full_name.split(" ")[0]}!</Menu.Label>
                  <Menu.Divider />
                </>
              ) : null}
              <Menu.Item icon={<IconUser size={14} />}>Profile</Menu.Item>
              <Menu.Item
                icon={<IconSettings size={14} />}
                onClick={() => setSettingsOpen(true)}
              >
                Settings
              </Menu.Item>
              {session ? <Menu.Divider /> : null}
              {session ? (
                <Menu.Item
                  onClick={() => {
                    supabase.auth.signOut();
                  }}
                  color={"red"}
                  icon={<IconLogout size={14} />}
                >
                  Sign Out
                </Menu.Item>
              ) : null}
            </Menu.Dropdown>
          </Menu>
        </Stack>
      </Stack>
      <div style={{zIndex: 100}}>
        <SettingsModal
          setSettingsOpen={setSettingsOpen}
          isSettingsOpen={isSettingsOpen}
        />
      </div>
    </div>
  );
}
