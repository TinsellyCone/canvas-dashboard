import { Text, Stack, Group } from '@mantine/core'

export default function Option({ title, description, option }) {
  return (
    <Group position={"apart"}>
      <Stack spacing={0}>
        <Text fw={600} fz={"md"}>
          Profile Publicity
        </Text>
        <Text fz={"sm"} color={"dimmed"}>
          Whether or not your profile should be shown to classmates
        </Text>
      </Stack>
      {option}
    </Group>
  );
}