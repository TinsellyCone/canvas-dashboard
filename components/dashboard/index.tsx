import useSWR from 'swr'
import { LoadingOverlay } from '@mantine/core'
import ClassCard from 'components/dashboard/classCard'
import useToken from 'components/lib/useToken'

export default function Dashboard() {
  const { token } = useToken();
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, error, isLoading } = useSWR(
    '/canvas/courses.json?access_token=' +
      token +
      '&enrollment_state=active&per_page=15&include[]=course_image',
    fetcher
  )

  if (token != null) return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 300px))',
        justifyContent: 'start',
        gap: 15,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 24
      }}
    >
      {isLoading ? (
        <LoadingOverlay visible />
      ) : (
        data.map((currentClass) => {
          return (
            <ClassCard
              className={currentClass.name}
              grade={98}
              imagePath={currentClass.image_download_url}
              id={currentClass.id}
              active
              key={currentClass.id}
            />
          )
        })
      )}
    </div>
  )
}

// export default function Home() {
//   const {register, handleSubmit } = useForm();
//   const [isLoading, setLoading] = useState(false);

//   async function login(data) {
//     setLoading(true);
//     try {
//       const authData = await pb.collection('users').authWithPassword(data.email, data.password);
//     }
//     catch (e) {
//       alert(e.message);
//     }
//     setLoading(false);
//   }

//   return (
//     <>

//       <h1>Logged in: {pb.authStore.isValid ? pb.authStore.model?.email : "False"}</h1>

//       {pb.authStore.isValid && <Avatar src={"http://127.0.0.1:8090/api/files/_pb_users_auth_/" + pb.authStore.model?.id + "/" + pb.authStore.model?.avatar} color={'blue'} radius={'xl'} />}

//       <br />

//       <form onSubmit={handleSubmit(login)}>
//         <input type="text" placeholder="Username" {...register("email")} />
//         <input type="password" placeholder="Password" {...register("password")} />
//         <button type="submit" disabled={isLoading}>{isLoading ? "Loading" : "Log In"}</button>
//       </form>
//       {pb.authStore.isValid && <button onClick={() => pb.authStore.clear()}>Log Out</button>}

//     </>
//   )
// }
