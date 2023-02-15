import useSWR from 'swr'
import useToken from 'components/lib/useToken'
import { Table } from '@mantine/core';

export default function Module({courseID, moduleID}) {
    const { token, loading } = useToken();
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error, isLoading } = useSWR(
        '/canvas/courses/' + courseID + '/modules/' + moduleID + '/items?access_token=' +
        token +
        '&per_page=40',
        fetcher
    )
    console.log(data)
    console.log('/canvas/courses/' + courseID + '/modules/' + moduleID + '/items?access_token=' +
    token +
    '&per_page=40')
    if (token != null) return (
      <>
        <Table verticalSpacing={'sm'}>
          <tbody>
            {!isLoading && data != null
              ? data.map((item) => {
                  return <tr><td>{item.title}</td></tr>;
                })
              : null}
          </tbody>
        </Table>
      </>
    );
}