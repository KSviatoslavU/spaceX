import { Card, Image, Text, Flex, Button } from "@mantine/core";
import type { Launch } from "../../types";
import { useLaunchesContext } from "../../context";

type CardLaunchProps = {
  launch: Launch;
};

export function CardLaunch({ launch }: CardLaunchProps) {
  const { dispatch } = useLaunchesContext();

  const handleOpenModal = (launch: Launch) => {
    dispatch({ type: "active_launch", payload: launch });
    dispatch({ type: "open_modal", payload: true });
  };
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder h={320}>
      <Flex
        direction="column"
        justify="space-between"
        style={{ height: "100%" }}
      >
        <div>
          <Card.Section pt="md">
            <Image
              mt="xl"
              src={launch.links?.mission_patch_small}
              alt={launch.mission_name}
              height={100}
              fit="contain"
              mx="auto"
            />
          </Card.Section>

          <Text fw={500} ta="center" mt="lg">
            {launch.mission_name}
          </Text>
          <Text size="sm" c="dimmed" ta="center" mt="md">
            {launch.rocket?.rocket_name}
          </Text>
        </div>

        <Button
          onClick={() => handleOpenModal(launch)}
          color="blue"
          fullWidth
          mt="md"
          radius="md"
        >
          See more
        </Button>
      </Flex>
    </Card>
  );
}
