import { Menu, Badge } from '@mantine/core'
import LogIn from 'components/logIn'
import { IconCheck } from '@tabler/icons'
import Titlebar from 'components/titlebar'
import Dashboard from 'components/dashboard/index'
import { useSession } from '@supabase/auth-helpers-react'


export default function Index({ setColorScheme }) {

  const titlebarOptions = (
    <>
      <Menu.Label>Dashboard View</Menu.Label>
      <Menu.Item icon={<IconCheck size={14} />}>
        Card View <Badge color={'red'}>Placeholder</Badge>
      </Menu.Item>
      <Menu.Item>
        List View <Badge color={'red'}>Placeholder</Badge>
      </Menu.Item>
      <Menu.Item>
        Recent Activity <Badge color={'red'}>Placeholder</Badge>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={<IconCheck size={14} />}>
        Color Overlay <Badge color={'red'}>Placeholder</Badge>
      </Menu.Item>
      <Menu.Divider />
    </>
  )

  const session = useSession()
  if(!session) {
    return(<LogIn />)
  }

  return (
    <>
      <Titlebar
        title='Dashboard'
        options={titlebarOptions}
        setColorTheme={setColorScheme}
      />
      <Dashboard />
    </>
  )
}