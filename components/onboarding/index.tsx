import {
  Stepper,
  Input,
  Flex,
  TextInput,
  Text,
  Divider,
  Button,
  Code,
  Group,
  Stack,
} from "@mantine/core";
import { useState } from "react";
import InputMask from "react-input-mask";
import AvatarCard from 'components/avatarCard'
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";

export default function OnBoarding() {
  const [avatar_url, setAvatar] = useState("");
  const [full_name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phone_number, setNumber] = useState("");
  const [token, setToken] = useState("");
  const supabase = useSupabaseClient();
  const user = useUser();

  const [loading, setLoading] = useState(false)

  const [active, setActive] = useState(0);
  const [highestStepVisited, setHighestStepVisited] = useState(active);
  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > 3 || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    setActive(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
  };
  const shouldAllowSelectStep = (step: number) =>
    highestStepVisited >= step && active !== step;

  return (
    <div style={{ padding: 24, height: "100%" }}>
      <Stepper
        h={"100%"}
        p={24}
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
      >
        <Stepper.Step
          label="Setup"
          description="Find your Canvas account"
          allowStepSelect={shouldAllowSelectStep(0)}
        >
          <Flex
            direction={"column"}
            justify={"center"}
            align={"center"}
            w={"100%"}
            maw={350}
            h={"100%"}
            gap={25}
            style={{ margin: "0 auto", marginTop: 16 }}
          >
            <TextInput
              placeholder="Token"
              onChange={(event) => setToken(event.target.value)}
              value={token}
              w={"100%"}
              description="Generated in Canvas account settings"
              label="Canvas Access Token"
            />
            <Button
              variant="light"
              onClick={() => {
                if (token != "") handleStepChange(active + 1);
              }}
              fullWidth
            >
              Contine
            </Button>
          </Flex>
        </Stepper.Step>
        <Stepper.Step label="Profile" description="Nice to meet you">
          <Flex
            direction={"column"}
            justify={"center"}
            align={"center"}
            w={"100%"}
            maw={350}
            h={"100%"}
            gap={25}
            style={{ margin: "0 auto", marginTop: 16 }}
          >
            <AvatarCard
              name={full_name}
              avatarURL={avatar_url}
              description={description}
              color={'blue'}
            />
            <TextInput
              onChange={(event) => setName(event.target.value)}
              placeholder="John Doe"
              value={full_name}
              w={"100%"}
              description="Enter your full name"
              label="Name"
            />
            <TextInput
              onChange={(event) => setDescription(event.target.value)}
              placeholder="I love school so much"
              value={description}
              w={"100%"}
              description="Keep it short and sweet"
              label="Description"
            />
            <Input.Wrapper
              w={"100%"}
              description="By default, this won't be displayed"
              label="Phone Number"
            >
              <Input
                component={InputMask}
                mask="+1 (999) 999-9999"
                maskChar="   "
                onChange={(event) => setNumber(event.target.value)}
                placeholder="+1 (123) 456-7890"
                value={phone_number}
              />
            </Input.Wrapper>
            {/* <TextInput
              onChange={(event) => setNumber(event.target.value)}
              placeholder="+1 (123) 456-7890"
              value={phoneNumber}
              w={350}
              description="By default, this won't be displayed"
              label="Phone Number"
            /> */}
            <Button
              variant="light"
              onClick={() => {
                if (full_name != "" && phone_number != "")
                  handleStepChange(active + 1);
              }}
              fullWidth
            >
              Contine
            </Button>
          </Flex>
        </Stepper.Step>
        <Stepper.Step label="Preferences" description="Customize everything">
          <Flex
            direction={"column"}
            justify={"center"}
            align={"center"}
            w={"100%"}
            maw={350}
            h={"100%"}
            gap={25}
            style={{ margin: "0 auto", marginTop: 16 }}
          >
            <Button
              variant="light"
              onClick={() => handleStepChange(active + 1)}
              fullWidth
            >
              Contine
            </Button>
          </Flex>
        </Stepper.Step>
        <Stepper.Completed>
          <Flex
            direction={"column"}
            justify={"center"}
            align={"center"}
            w={"100%"}
            maw={350}
            h={"100%"}
            gap={20}
            style={{ margin: "0 auto", marginTop: 16 }}
          >
            <Text fz={35} fw={700}>
              Summary
            </Text>
            <Divider w={"100%"} />
            <AvatarCard
              name={full_name}
              description={description}
              avatarURL={avatar_url}
              color={'blue'}
            />
            <Stack spacing={3} w={"100%"}>
              <Group spacing={0}>
                <Text fw={700}>Phone Number: &nbsp;</Text>
                <Text>{phone_number}</Text>
              </Group>
              <Group spacing={0}>
                <Text fw={700}>Token: &nbsp;</Text>
                <Code>
                  {token.slice(0, 35)}
                  {token.length > 35 ? "..." : null}
                </Code>
              </Group>
            </Stack>
            <Button
              disabled={loading}
              variant="light"
              fullWidth
              onClick={() => submit()}
            >
              Looks good!
            </Button>
          </Flex>
        </Stepper.Completed>
      </Stepper>
    </div>
  );
  async function submit() {

    setLoading(true);

    for (let i = 0; user != null && i < 1; i++) {
      const { data, error } = await supabase
      .from('profiles')
      .update({ full_name, description, phone_number, token, is_setup: true })
      .eq('id', user.id)
    }
      
  }
}
