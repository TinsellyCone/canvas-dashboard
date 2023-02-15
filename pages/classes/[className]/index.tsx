import Titlebar from 'components/titlebar'
import Modules from '@/components/modules/index'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import LogIn from 'components/logIn'
import { useSession } from '@supabase/auth-helpers-react'


export default function Index({ setColorScheme }) {
  const router = useRouter()

  // console.log(router.query.className)

  const session = useSession()
  if(!session) {
    return(<LogIn />)
  }

  return (
    <>
      <Titlebar title={'Modules'} setColorTheme={setColorScheme} />
      <Modules courseID={router.query.className} setColorScheme={setColorScheme} />
    </>
  )
}
