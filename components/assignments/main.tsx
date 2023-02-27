import useSWR from 'swr'
import { LoadingOverlay } from '@mantine/core'
import useToken from 'components/lib/useToken'
import { Accordion, Text, Anchor, Table } from '@mantine/core'
import Link from 'next/link'

export default function Assignments({
  courseID,
}: {
  courseID: string
}): JSX.Element {
  const { token } = useToken()
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
                                <Anchor
                                  href={'/class/' + courseID + '/assignment/' + item.id}
                                  component={Link}
                                >
                                  {item.name}
                                </Anchor>
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
