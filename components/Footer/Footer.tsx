import { Container, Flex, Link, Text } from "theme-ui";
import NextLink from "next/link";

import config from "../../utils/config";

const Divider = () => (
  <Text
    as="p"
    sx={{
      marginRight: 1,
      marginLeft: 1,
    }}
  >
    &bull;
  </Text>
);

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
        <Divider />
        <Text as="p">&copy; {new Date().getFullYear()}</Text>
        <Divider />
        <NextLink href="/privacy">
          <Link href="/privacy">Privacy policy</Link>
        </NextLink>
      </Flex>
    </Container>
  );
};
