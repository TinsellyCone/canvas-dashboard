import useSWR from 'swr'
import { Group, LoadingOverlay } from '@mantine/core'
import useToken from 'components/lib/useToken'
import { Accordion, Text, Anchor, Table } from '@mantine/core'
import Link from 'next/link'
import { IconNotebook } from '@tabler/icons-react'

export default function Assignments({
  courseID,
}: {
  courseID: string
}): JSX.Element {
  const { token } = useToken()
  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, error, isLoading } = useSWR(
    '/canvas/courses/' +
      courseID +
      '/assignments?access_token=' +
      token +
      '&per_page=40',
    fetcher
  )

  if (token != null)
    return (
      <Accordion
        variant='separated'
        radius='md'
        chevronPosition='left'
        p={24}
        pt={0}
        multiple
        defaultValue={['All Assignments']}
      >
        {isLoading ? (
          <LoadingOverlay visible={false} />
        ) : (
          <Accordion.Item value={'All Assignments'}>
            <Accordion.Control>{'All Assignments'}</Accordion.Control>
            <Accordion.Panel>
              <Table verticalSpacing={'sm'}>
                <tbody>
                  {
                    data.map(
                      (item: { name: string; type: string; id: string }) => {
                        return (
                          <tr key={item.name}>
                            <td>
                              {item.type != 'SubHeader' ? (
                                <Group>
                                  <IconNotebook size={18} />
                                  <Anchor
                                    href={
                                      '/class/' +
                                      courseID +
                                      '/assignment/' +
                                      item.id
                                    }
                                    component={Link}
                                  >
                                    {item.name}
                                  </Anchor>
                                </Group>
                              ) : (
                                <Text fw={700} color={'dimmed'}>
                                  {item.name}
                                </Text>
                              )}
                            </td>
                          </tr>
                        )
                      }
                    )
                  }
                </tbody>
              </Table>
            </Accordion.Panel>
          </Accordion.Item>
        )}
      </Accordion>
    )
  else return <></>
}
