import {
  Button,
  Badge,
  Text,
  Card,
  Image,
  Group,
  Stack,
  Divider,
  ActionIcon,
  Modal,
  ColorInput,
  NumberInput,
  Skeleton,
} from "@mantine/core";
import { IconNotebook, IconDotsVertical, IconCheck } from "@tabler/icons";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import useToken from "components/lib/useToken";

export default function SkeletonCard(props) {
  // imagePath, className, grade, active
  return (
    <Card w={300} shadow={"lg"} radius={"md"} p={"lg"} withBorder>
      <Card.Section>
        <Image src={props.imagePath} height={175} withPlaceholder></Image>
      </Card.Section>
      <Group position="apart" mt={"md"} mb={"xs"}>
        <Stack justify={"center"} spacing={0}>
          <Skeleton visible mb={10} h={20} w={170} />
          <Skeleton visible mb={7} h={10} w={75} />
        </Stack>
      </Group>

      <Divider mb={"sm"}></Divider>

      <Stack spacing={"xs"}>
        <Group position="left" spacing={"xs"}>
          <Skeleton w={20} h={20} />
          <Skeleton visible h={15} w={75} />
        </Group>
        <Group position="left" spacing={"xs"}>
          <Skeleton w={20} h={20} />
          <Skeleton visible h={15} w={75} />
        </Group>
      </Stack>
      <Group position="center" mt={"md"} spacing={"xs"}>
        <Button
          variant="light"
          component={Link}
          href={"/class/" + props.id}
          color={props.color}
          style={{ flex: 1 }}
          radius={process.env.NEXT_PUBLIC_RADIUS}
        >
          View
        </Button>
        <ActionIcon
          size={36}
          variant="light"
          onClick={() => setOpened(true)}
          radius={process.env.NEXT_PUBLIC_RADIUS}
        >
          <IconDotsVertical size={20} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
