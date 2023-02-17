import { Card, Group, Avatar, Stack, Text } from '@mantine/core';
export default function AvatarCard({ avatarURL, name, description, color }) {
  return (
    <Card withBorder radius={"sm"} shadow={"sm"} maw={350} w={"100%"} h={80.5}>
      <Group>
        <Avatar color={color} radius={"xl"} src={avatarURL}>
          {name.split(" ")[0].charAt(0).toUpperCase() + (name.split(" ").length >= 2 ? name.split(" ")[name.split(" ").length - 1].charAt(0) : "")}
        </Avatar>
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