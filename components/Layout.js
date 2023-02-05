import { MantineProvider, Flex } from "@mantine/core";
import { useState } from "react";
import Navbar from "./Navbar";
import Titlebar from "./Titlebar";
import Head from "next/head";

export default function Layout({ children, options, title }) {
  const [colorTheme, setColorTheme] = useState("dark");

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <MantineProvider
        theme={{ colorScheme: colorTheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Flex direction="row" style={{maxWidth: "100vw"}}>
          <Navbar colorScheme={colorTheme} />
          <div style={{ width:'100%', overflow:'hidden' }}>
            <Titlebar
              options={options}
              title={title}
              setColorTheme={setColorTheme}
            />
            <main style={{ marginLeft: "25px", marginRight: "25px" }}>
              {children}
            </main>
          </div>
        </Flex>
      </MantineProvider>
    </>
  );
}
