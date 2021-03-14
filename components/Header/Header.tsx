import { useSession } from "next-auth/client";
import { Box, Button, Container, Flex, Link, Text } from "theme-ui";
import NextLink from "next/link";

import config from "../../utils/config";

export const Header = () => {
  const [session, loading] = useSession();

  return (
    <Container>
      <Flex
        sx={{
          paddingTop: 4,
          paddingBottom: 4,
          marginBottom: 5,
          flexDirection: ["column", "row"],
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            marginBottom: [2, 0],
          }}
        >
          <Text as="h1" variant="heading1">
            <NextLink href="/">
              <Link href="/">{config.appTitle}</Link>
            </NextLink>
          </Text>
          <Text as="p">
            Create RSS feeds from your{" "}
            <Link href="https://todo.microsoft.com/" rel="noopener noreferrer">
              Microsoft To Do
            </Link>{" "}
            lists
          </Text>
        </Box>

        {!loading && (
          <Flex
            sx={{
              alignItems: "center",
              "> a": {
                marginRight: 1,
              },
              "> a:last-of-type": {
                marginRight: 0,
              },
            }}
          >
            {session ? (
              <>
                <NextLink href="/account/lists">
                  <Link href="/account/lists" variant="button">
                    Account
                  </Link>
                </NextLink>
                <NextLink href="/logout">
                  <Link href="/logout" variant="secondaryButton">
                    Logout
                  </Link>
                </NextLink>
              </>
            ) : (
              <>
                <Link href="/account/lists" variant="button">
                  Login
                </Link>
              </>
            )}
          </Flex>
        )}
      </Flex>
    </Container>
  );
};
