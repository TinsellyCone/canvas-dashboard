import Head from 'next/head'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'
import Navbar from 'components/navbar'
import type { AppProps } from 'next/app'
import { MantineProvider, Flex, ColorSchemeProvider, ColorScheme } from '@mantine/core'
import { NotificationsProvider } from "@mantine/notifications";
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import useTheme from 'components/lib/useTheme'
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  // useEffect(() => {if (dark_theme != null) {setColorTheme(dark_theme == true ? "dark" : "light")}});

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <Head>
        <meta
          name="viewport"
          content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link
          rel="apple-touch-icon-precomposed"
          href="/Icons/Apple Touch Icon.png"
        />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >
          <NotificationsProvider limit={5}>
            <Flex direction="row" style={{ maxWidth: "100vw" }}>
              <Navbar />
              <div style={{ width: "100%", overflow: "hidden" }}>
                <Component {...pageProps} />
                <Analytics />
              </div>
            </Flex>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionContextProvider>
  );
}
