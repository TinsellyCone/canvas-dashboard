import useSWR from 'swr'
import useToken from 'components/lib/useToken'
import { Table, Anchor, Text, Group } from '@mantine/core'
import Link from 'next/link'
import {
  IconFile,
  IconFolder,
  IconLink,
  IconMessages,
  IconNotebook,
  IconRocket,
} from '@tabler/icons-react'

export default function Module({
  courseID,
  moduleID,
}: {
  courseID: string
  moduleID: string
}) {
  const { token, loading } = useToken()
  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, error, isLoading } = useSWR(
    '/canvas/courses/' +
      courseID +
      '/modules/' +
      moduleID +
      '/items?access_token=' +
      token +
      '&per_page=40',
    fetcher
  )
  if (token != null)
    return (
      <>
        <Table verticalSpacing={'sm'}>
          <tbody>
            {!isLoading && data != null ? (
              data.map(
                (item: {
                  title: string
                  type: string
                  id: string
                  html_url: string
                  external_url?: string
                }) => {
                  return (
                    <tr key={item.title}>
                      <td>
                        <Group>
                          {item.type == 'Assignment' ? (
                            <IconNotebook size={18} />
                          ) : null}
                          {item.type == 'Quiz' ? (
                            <IconRocket size={18} />
                          ) : null}
                          {item.type == 'File' ? (
                            <IconFolder size={18} />
                          ) : null}
                          {item.type == 'Page' ? <IconFile size={18} /> : null}
                          {item.type == 'Discussion' ? (
                            <IconMessages size={18} />
                          ) : null}
                          {item.type == 'ExternalUrl' ||
                          item.type == 'ExternalTool' ? (
                            <IconLink size={18} />
                          ) : null}
                          {item.type != 'SubHeader' ? (
                            <Anchor
                              href={
                                item.type != 'ExternalUrl' &&
                                item.type != 'ExternalTool'
                                  ? item.type != 'Quiz'
                                    ? courseID +
                                      '/module/' +
                                      moduleID +
                                      '/item/' +
                                      item.id
                                    : item.html_url
                                  : item.external_url as unknown as URL
                              }
                              component={Link}
                              target={
                                item.type == 'ExternalUrl' ||
                                item.type == 'ExternalTool' ||
                                item.type == 'Quiz'
                                  ? '_blank'
                                  : undefined
                              }
                            >
                              {item.title}
                            </Anchor>
                          ) : (
                            <Text fw={700} color={'dimmed'}>
                              {item.title}
                            </Text>
                          )}
                        </Group>
                      </td>
                    </tr>
                  )
                }
              )
            ) : (
              <></>
            )}
          </tbody>
        </Table>
      </>
    )
  else return <></>
}
