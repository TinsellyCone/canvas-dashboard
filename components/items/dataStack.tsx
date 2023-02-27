import { Stack, Text } from "@mantine/core";

export default function DataStack({ data, label }: { data: string, label: string }) {
  return (
    <Stack spacing={0} align={'center'}>
      <Text fz={'xl'} fw={700}>
        {data}
      </Text>
      <Text fz={'sm'} fw={500} color={'dimmed'}>
        {label}
      </Text>
    </Stack>
  )
}