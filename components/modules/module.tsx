import useSWR from 'swr'
import useToken from 'components/lib/useToken'
import { Table, Anchor, Text } from '@mantine/core';
import Link from 'next/link';

export default function Module({courseID, moduleID}: {courseID: string, moduleID: string}) {
    const { token, loading } = useToken();
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error, isLoading } = useSWR(
        '/canvas/courses/' + courseID + '/modules/' + moduleID + '/items?access_token=' +
        token +
        '&per_page=40',
        fetcher
    )
    if (token != null) return (
      <>
        <Table verticalSpacing={'sm'}>
          <tbody>
            {!isLoading && data != null
              ? data.map((item: {title: string, type: string, id:string}) => {
                return <tr key={item.title}><td>{item.type != "SubHeader" ? <Anchor href={courseID + "/module/" + moduleID + "/item/" + item.id} component={Link}>{item.title}</Anchor> : <Text fw={700} color={'dimmed'}>{item.title}</Text>}</td></tr>;
                })
              : <></>}
          </tbody>
        </Table>
      </>
    );
    else return <></>
}