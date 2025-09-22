import { Card, Image, Text, Flex, Button } from "@mantine/core";
import type { CardLaunchProps, Launch } from "../../types/types";
import { useLaunchesContext } from "../../context/LaunchesContext";

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
              src={
                launch.links?.mission_patch_small ||
                "https://www.dgl.ru/wp-content/uploads/2022/06/spacex-zeichen-640x360.jpg"
              }
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
