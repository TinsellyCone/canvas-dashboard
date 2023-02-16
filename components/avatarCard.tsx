import { Card, Group, Avatar, Stack, Text } from '@mantine/core';
export default function AvatarCard({ avatarURL, name, description }) {
  return (
    <Card withBorder radius={"sm"} shadow={"sm"} w={350}>
      <Group>
        <Avatar radius={"xl"} src={avatarURL} />
        <Stack spacing={0}>
          <Text
            lineClamp={1}
            style={{ cursor: "default", userSelect: "none" }}
            fw={700}
            maw={260}
          >
            {name || "Full Name"}
          </Text>
          <Text
            style={{ cursor: "default", userSelect: "none" }}
            fz={"sm"}
            color={"dimmed"}
            lineClamp={1}
            maw={260}
          >
            {description || "Description"}
          </Text>
        </Stack>
      </Group>
    </Card>
  );
}