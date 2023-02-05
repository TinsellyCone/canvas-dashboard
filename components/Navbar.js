import { Stack, ActionIcon, Burger, NavLink, Drawer, useMantineTheme } from "@mantine/core";
import { IconDashboard } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar(props) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme()

  return (
    <>
      <Stack
        p={"sm"}
        style={{ outline: "1px solid dimmed" }}
        top={0}
        left={0}
        w={"fit-content"}
        h={"100vh"}
        pos={"sticky"}
        bg={theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]}
      >
        <ActionIcon
          size={"lg"}
          variant="light"
          component={Link}
          href="/classes"
        >
          <IconDashboard size={20} />
        </ActionIcon>
        {/* <ActionIcon
          size={"lg"}
          variant="light"
          component={Link}
          href="/classes"
        >
          <IconDashboard size={20} />
        </ActionIcon> */}
        <Burger onClick={() => setOpened(true)} style={{"align-self":"flex-end", WebkitAlignSelf:"flex-end"}} />
      </Stack>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Menu"
        padding="xl"
        size="xl"
      >
        <NavLink
          label="Dashboard"
          icon={<IconDashboard size={16} stroke={1.5} />}
        />
      </Drawer>
    </>
  );
}
