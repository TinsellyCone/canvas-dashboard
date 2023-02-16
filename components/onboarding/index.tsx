import {
  Stepper,
  Input,
  Flex,
  TextInput,
  Text,
  Divider,
  Button,
  Code,
  Group
} from "@mantine/core";
import { useState } from "react";
import InputMask from "react-input-mask";
import AvatarCard from 'components/avatarCard'

export default function OnBoarding() {
  const [avatarURL, setAvatarURL] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setNumber] = useState("");
  const [token, setToken] = useState("");

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
          <Flex justify={"center"} align={"center"} w={"100%"} h={"100%"}>
            <Input.Wrapper
              w={350}
              description="Generated in Canvas account settings"
              label="Canvas Access Token"
            >
              <Input
                placeholder="Token"
                onChange={(event) => setToken(event.target.value)}
                value={token}
              />
            </Input.Wrapper>
          </Flex>
        </Stepper.Step>
        <Stepper.Step label="Profile" description="Nice to meet you">
          <Flex
            direction={"column"}
            justify={"center"}
            align={"center"}
            w={"100%"}
            h={"100%"}
            mt={20}
            gap={25}
          >
            <AvatarCard
              name={name}
              avatarURL={avatarURL}
              description={description}
            />
            <TextInput
              onChange={(event) => setName(event.target.value)}
              placeholder="John Doe"
              value={name}
              w={350}
              description="Enter your full name"
              label="Name"
            />
            <TextInput
              onChange={(event) => setDescription(event.target.value)}
              placeholder="I love school so much"
              value={description}
              w={350}
              description="Keep it short and sweet"
              label="Description"
            />
            {/* <Input.Wrapper
              w={350}
              description="By default, this won't be displayed"
              label="Phone Number"
            >
              <Input
                component={InputMask}
                mask="+1 (999) 999-9999"
                onChange={(event) => setNumber(event.target.value)}
                placeholder="+1 (123) 456-7890"
                value={phoneNumber}
              />
            </Input.Wrapper> */}
            <TextInput
              onChange={(event) => setNumber(event.target.value)}
              placeholder="+1 (123) 456-7890"
              value={phoneNumber}
              w={350}
              description="By default, this won't be displayed"
              label="Phone Number"
            />
          </Flex>
        </Stepper.Step>
        <Stepper.Step label="Preferences" description="Customize everything">
          <Button onClick={() => handleStepChange(active + 1)}>Contine</Button>
        </Stepper.Step>
        <Stepper.Completed>
          <Flex
            direction={"column"}
            justify={"center"}
            align={"center"}
            w={"100%"}
            h={"100%"}
            mt={20}
            gap={25}
          >
            <Text fz={35} fw={700}>Summary</Text>
            <Divider w={350} />
            

            <Group maw={350}><Text>Token: </Text><Code>{token.slice(0,35)}{token.length > 35 ? "..." : null}</Code></Group>
            <AvatarCard name={name} description={description} avatarURL={avatarURL} />

          </Flex>
        </Stepper.Completed>
      </Stepper>
    </div>
  );
}
