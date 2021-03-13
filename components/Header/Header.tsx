import { useSession } from "next-auth/client";
import { Box, Container, Flex, Link, Text } from "theme-ui";

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
            To Do RSS
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
            }}
          >
            {session ? (
              <>
                <Link href="/account/lists" variant="button">
                  Account
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" variant="button">
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
