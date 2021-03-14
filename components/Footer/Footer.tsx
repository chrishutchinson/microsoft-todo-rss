import { Box, Container, Flex, Heading, Text } from "theme-ui";
import config from "../../utils/config";

export const Footer = () => {
  return (
    <Container>
      <Flex
        sx={{
          paddingTop: 3,
          paddingBottom: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text as="h2" variant="heading5">
          {config.appTitle}
        </Text>
        <Text
          as="p"
          sx={{
            marginRight: 1,
            marginLeft: 1,
          }}
        >
          &bull;
        </Text>
        <Text as="p">&copy; {new Date().getFullYear()}</Text>
      </Flex>
    </Container>
  );
};
