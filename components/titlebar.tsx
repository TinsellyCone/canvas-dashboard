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
    <Group m={'xl'} position='apart'>
      <Head>
        <title>{title} - {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Title order={2}>{title}</Title>
      <Menu position='bottom-end' transition='pop-top-right'>
        <Menu.Target>
          <ActionIcon size={'lg'} variant='light'>
            <IconDotsVertical size={20} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          {options}
          <Menu.Label>Appearance</Menu.Label>
          <Menu.Item
            icon={lightThemeIcon}
            onClick={() => {
              setColorTheme('light')
              setDarkThemeIcon(null)
              setLightThemeIcon(<IconCheck size={14} />)
            }}
          >
            Light Mode
          </Menu.Item>
          <Menu.Item
            icon={darkThemeIcon}
            onClick={() => {
              setColorTheme('dark')
              setLightThemeIcon(null)
              setDarkThemeIcon(<IconCheck size={14} />)
            }}
          >
            Dark Mode
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}
