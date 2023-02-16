import Head from 'next/head'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'
import Navbar from 'components/navbar'
import LogIn from '@/components/logIn'
import type { AppProps } from 'next/app'
import { MantineProvider, Flex } from '@mantine/core'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import useTheme from 'components/lib/useTheme'
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }: AppProps) {
  const { dark_theme } = useTheme();
  const [colorTheme, setColorTheme] = useState('dark')
  const [supabase] = useState(() => createBrowserSupabaseClient())
  useEffect(() => {if (dark_theme != null) {setColorTheme(dark_theme == true ? "dark" : "light")}});
  console.log(dark_theme)

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Head>
        <meta
          name='viewport'
          content='width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;'
        />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='black-translucent'
        />
        <link
          rel='apple-touch-icon-precomposed'
          href='/Icons/Apple Touch Icon.png'
        />
      </Head>
      <MantineProvider
        theme={{ colorScheme: colorTheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Flex direction='row' style={{ maxWidth: '100vw' }}>
          <Navbar />
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <Component {...pageProps} setColorScheme={setColorTheme} />
            <Analytics />
          </div>
        </Flex>
      </MantineProvider>
    </SessionContextProvider>
  )
}
