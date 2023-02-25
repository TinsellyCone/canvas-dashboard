import useSWR from 'swr'
import { LoadingOverlay, Skeleton } from '@mantine/core'
import ClassCard from 'components/dashboard/classCard'
import SkeletonCard from 'components/dashboard/skeletonCard'
import useToken from 'components/lib/useToken'
import { updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react"

export default function Dashboard() {
  const { token } = useToken();
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, error, isLoading } = useSWR(
    '/canvas/courses.json?access_token=' +
      token +
      '&enrollment_state=active&per_page=15&include[]=course_image',
    fetcher
  )

  if(token != null) updateNotification({
    id: "creating-account",
    color: "teal",
    title: "Account creation complete!",
    message:
      "Welcome to " + process.env.NEXT_PUBLIC_APP_NAME,
    icon: <IconCheck size={16} />,
    autoClose: 2000,
  });

  if (token != null) return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 300px))",
        justifyContent: "start",
        gap: 15,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 24,
      }}
    >
      {isLoading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : (
        data.map((currentClass) => {
          return (
            <ClassCard
              className={currentClass.name}
              grade={98}
              imagePath={currentClass.image_download_url}
              id={currentClass.id}
              key={currentClass.id}
            />
          );
        })
      )}
    </div>
  );
}
