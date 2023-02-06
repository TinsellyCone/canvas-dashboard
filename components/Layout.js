import { MantineProvider, Flex } from "@mantine/core";
import { useState } from "react";
import Navbar from "./Navbar";
import Titlebar from "./Titlebar";
import Head from "next/head";

export default function Layout({ children, options, title, hideTitlebar }) {
  const [colorTheme, setColorTheme] = useState("dark");

  return (
    <>
      <Head>
        <title>{title}</title>
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
      <MantineProvider
        theme={{ colorScheme: colorTheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Flex direction="row" style={{ maxWidth: "100vw" }}>
          <Navbar colorScheme={colorTheme} />
          <div style={{ width: "100%", overflow: "hidden" }}>
            <Titlebar
              options={options}
              title={title}
              setColorTheme={setColorTheme}
            />
            <main style={{ marginLeft: "25px", marginRight: "25px", minHeight: "100vh", paddingBottom: 15 }}>
              {children}
            </main>
          </div>
        </Flex>
      </MantineProvider>
    </>
  );
}
