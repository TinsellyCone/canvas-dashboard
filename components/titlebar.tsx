import {
  Group,
  ActionIcon,
  Menu,
  Title,
  MantineNumberSize,
  useMantineColorScheme,
  TitleOrder,
} from '@mantine/core'
import { IconDotsVertical, IconCheck } from '@tabler/icons'
import Head from 'next/head'
import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'

type props = { title: String, options?: JSX.Element, backURL?: URL, order?: number }

export default function Titlebar({ title, options, backURL, order }: props) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

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
        <title>
          {title} - {process.env.NEXT_PUBLIC_APP_NAME}
        </title>
        {process.env.NEXT_PUBLIC_DEV == 'true' ? (
          <link rel='icon' href='/preview.svg' type='image/svg+xml' />
        ) : process.env.NEXT_PUBLIC_AMONGUS == 'true' ? (
          <link rel='icon' href='/amongus.svg' type='image/svg+xml' />
        ) : (
          <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        )}
      </Head>
      {backURL != null ? (
        <Link href={backURL} style={{ color: 'unset', textDecoration: 'none' }}>
          <Title order={(order as TitleOrder) || 2}>
            <IconArrowLeft size={24} style={{ marginRight: 8 }} />
            {title}
          </Title>
        </Link>
      ) : (
        <Title order={(order as TitleOrder) || 2}>{title}</Title>
      )}
      {options != null ? (
        <Menu position='bottom-end' transition='pop-top-right'>
          <Menu.Target>
            <ActionIcon
              size={'lg'}
              variant='light'
              radius={process.env.NEXT_PUBLIC_RADIUS as MantineNumberSize}
            >
              <IconDotsVertical size={20} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            {options}
            <Menu.Label>Appearance</Menu.Label>
            <Menu.Item
              icon={colorScheme == 'light' ? <IconCheck size={14} /> : null}
              onClick={
                colorScheme == 'dark'
                  ? () => {
                      toggleColorScheme()
                    }
                  : () => {}
              }
            >
              Light Mode
            </Menu.Item>
            <Menu.Item
              icon={colorScheme == 'light' ? null : <IconCheck size={14} />}
              onClick={
                colorScheme == 'light'
                  ? () => {
                      toggleColorScheme()
                    }
                  : () => {}
              }
            >
              Dark Mode
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : null}
    </Group>
  )
}
