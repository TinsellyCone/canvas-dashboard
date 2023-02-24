import { Text, Stack, Group } from '@mantine/core'

export default function Option({ title, description, option }) {
  return (
    <Group position={"apart"}>
      <Stack spacing={0}>
        <Text fw={600} fz={"md"}>
          {title}
        </Text>
        <Text fz={"sm"} color={"dimmed"}>
          {description}
        </Text>
      </Stack>
      {option}
    </Group>
  );
}