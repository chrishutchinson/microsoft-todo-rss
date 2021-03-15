import { Box, Container, Flex, Image, Link, Styled, Text } from "theme-ui";

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
          justifyContent: "space-around",
        }}
      >
        <Box variant="layout.centered">
          <Text as="p">From this...</Text>

          <Box
            as="picture"
            sx={{
              display: "grid",
              margin: "26px auto",
              overflow: "hidden",
              marginTop: 26,
              borderRadius: 10,
              maxWidth: 340,
              boxShadow: (theme) => `0 0 20px 0 ${theme.colors.dropShadow}`,
            }}
          >
            <source
              srcSet="/to-do-list-dark.png"
              media="(prefers-color-scheme: dark)"
            />
            <Image width={340} src="/to-do-list.png" />
          </Box>
        </Box>

        <Box variant="layout.centered">
          <Text as="p">To this...</Text>

          <Box
            as="picture"
            sx={{
              display: "grid",
              margin: "26px auto",
              overflow: "hidden",
              marginTop: 26,
              borderRadius: 10,
              maxWidth: 340,
              boxShadow: (theme) => `0 0 20px 0 ${theme.colors.dropShadow}`,
            }}
          >
            <source
              srcSet="/rss-feed-dark.png"
              media="(prefers-color-scheme: dark)"
            />
            <Image width={340} src="/rss-feed.png" />
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
