import { Group, ActionIcon, Menu, Title } from '@mantine/core'
import { IconDotsVertical, IconCheck } from '@tabler/icons'
import { useState, useEffect } from 'react'
import Head from 'next/head'

export default function Titlebar({ title, options, setColorTheme }) {
  const [darkThemeIcon, setDarkThemeIcon] = useState(<IconCheck size={14} />)
  const [lightThemeIcon, setLightThemeIcon] = useState(null)

  // useEffect(() => {
  //   if (pb.authStore.model?.light) {
  //     setDarkThemeIcon(null)
  //     setLightThemeIcon(<IconCheck size={14} />)
  //   } else {
  //     setLightThemeIcon(null)
  //     setDarkThemeIcon(<IconCheck size={14} />)
  //   }
  // })

  return (
    <Group m={"xl"} position="apart">
      <Head>
        <title>
          {title} - {process.env.NEXT_PUBLIC_APP_NAME}
        </title>
        {process.env.NEXT_PUBLIC_DEV == "true" ? (
          <link rel="icon" href="/preview.svg" type="image/svg+xml" />
        ) : process.env.NEXT_PUBLIC_AMONGUS == "true" ? (
          <link rel="icon" href="/amongus.svg" type="image/svg+xml" />
        ) : (
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        )}
      </Head>
      <Title order={2}>{title}</Title>
      <Menu position="bottom-end" transition="pop-top-right">
        <Menu.Target>
          <ActionIcon size={"lg"} variant="light" radius={process.env.NEXT_PUBLIC_RADIUS}>
            <IconDotsVertical size={20} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          {options}
          <Menu.Label>Appearance</Menu.Label>
          <Menu.Item
            icon={lightThemeIcon}
            onClick={() => {
              setColorTheme("light");
              setDarkThemeIcon(null);
              setLightThemeIcon(<IconCheck size={14} />);
            }}
          >
            Light Mode
          </Menu.Item>
          <Menu.Item
            icon={darkThemeIcon}
            onClick={() => {
              setColorTheme("dark");
              setLightThemeIcon(null);
              setDarkThemeIcon(<IconCheck size={14} />);
            }}
          >
            Dark Mode
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
