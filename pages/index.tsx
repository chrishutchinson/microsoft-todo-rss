import { Box, Container, Flex, Image, Link, Text } from "theme-ui";

export default function Page() {
  return (
    <Container variant="contentContainer">
      <Box
        sx={{
          marginBottom: 4,
        }}
      >
        <Text as="h1" variant="heading2">
          Turn Microsoft To Do lists into RSS feeds, for quick and easy reading
          lists!
        </Text>
      </Box>
      <Box
        sx={{
          marginBottom: 4,
        }}
      >
        <Link href="/login" variant="button">
          Get started
        </Link>
      </Box>

      <Flex
        sx={{
          flexDirection: ["column", "row"],
        }}
      >
        <Box>
          <Text as="p">From this...</Text>

          <Image src="/to-do-list.png" />
        </Box>

        <Box>
          <Text as="p">To this...</Text>

          <Image src="/to-do-list.png" />
        </Box>
      </Flex>
    </Container>
  );
}
