import { Box, Container, Flex, Image, Link, Text } from "theme-ui";

export default function Page() {
  return (
    <Container variant="contentContainer">
      <Flex
        sx={{
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <Box
          variant="layout.centered"
          sx={{
            marginBottom: 4,
          }}
        >
          <Text as="h1" variant="heading2">
            Turn Microsoft To Do lists into RSS feeds, for quick and easy
            reading lists!
          </Text>
        </Box>

        <Box>
          <Link href="/account/lists" variant="button">
            Get started
          </Link>
        </Box>
      </Flex>

      <Flex
        sx={{
          flexDirection: ["column", "row"],
          marginBottom: 4,
        }}
      >
        <Box variant="layout.centered">
          <Text as="p">From this...</Text>

          <Image width={440} src="/to-do-list.png" />
        </Box>

        <Box variant="layout.centered">
          <Text as="p">To this...</Text>

          <Image
            width={360}
            src="/rss-feed.png"
            sx={{
              marginTop: 26,
              boxShadow: "0 0 20px 0 #cacaca",
            }}
          />
        </Box>
      </Flex>
    </Container>
  );
}
