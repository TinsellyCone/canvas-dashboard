import useSWR from 'swr'
import { LoadingOverlay } from '@mantine/core'
import Module from './module'
import useToken from 'components/lib/useToken'
import { Accordion } from '@mantine/core'

export default function Modules({ courseID }) {
  const { token } = useToken();
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, error, isLoading } = useSWR('/canvas/courses/' + courseID + '/modules?access_token=' +
  token +
  '&per_page=40',
  fetcher)

  if (token != null) return (
    <Accordion variant="separated" radius="md" chevronPosition="left" p={24} pt={0} multiple>
      {isLoading ? <LoadingOverlay visible /> : data.map((module) => {
        return (
          <>
            <Accordion.Item value={module.name}>
              <Accordion.Control>{module.name}</Accordion.Control>
              <Accordion.Panel>
                <Module courseID={courseID} moduleID={module.id} />
              </Accordion.Panel>
            </Accordion.Item>
          </>
        );
      })}
    </Accordion>
  )
}