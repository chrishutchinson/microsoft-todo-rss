import Head from "next/head";
import { useCallback } from "react";
import useSWR from "swr";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Input,
  Link,
  Message,
  Text,
} from "theme-ui";
import { HeadTitle } from "../../components/HeadTitle/HeadTitle";
import { RequireAuth } from "../../components/RequireAuth/RequireAuth";

import config from "../../utils/config";

const fetcher = async (input: RequestInfo, init: RequestInit) => {
  const res = await fetch(input, init);
  return res.json();
};

const List: React.FC<{ list: any; feed?: any }> = ({ list, feed }) => {
  const handleEnableFeed = useCallback(async () => {
    const res = await fetch("/api/feed", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listId: list.id,
      }),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }
  }, []);

  return (
    <Box
      key={list.id}
      sx={{
        marginBottom: 3,
      }}
    >
      <Card>
        <Flex
          sx={{
            flexDirection: ["column", "row"],
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              marginBottom: [3, 0],
            }}
          >
            <Box
              sx={{
                marginBottom: 2,
              }}
            >
              <Text as="h3" variant="heading3">
                {list.displayName}
              </Text>
            </Box>

            {feed && (
              <Input
                type="text"
                disabled
                value={`${config.baseDomain}/api/${feed.userId}/${feed.id}/feed.xml`}
              />
            )}
          </Box>

          <Flex
            sx={{
              alignItems: "flex-start",
              "> a": {
                marginRight: 2,
              },
              "> a:last-of-type": {
                marginRight: 0,
              },
            }}
          >
            {feed ? (
              <>
                <Link
                  href={`/api/${feed.userId}/${feed.id}/feed.xml`}
                  variant="button"
                >
                  View feed
                </Link>
                <Link
                  href={`/api/${feed.userId}/${feed.id}/feed.xml`}
                  variant="buttonDanger"
                >
                  Disable feed
                </Link>
              </>
            ) : (
              <>
                <Button onClick={handleEnableFeed} variant="buttonAction">
                  Enable feed
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
};

const Lists: React.FC = () => {
  const { data: feedsData, error: feedsError } = useSWR("/api/feeds", fetcher);
  const { data: listsData, error: listsError } = useSWR("/api/lists", fetcher);

  return (
    <>
      <Container variant="contentContainer">
        {(feedsError || listsError) && (
          <Box
            sx={{
              marginBottom: 3,
            }}
          >
            <Message variant="error">
              <Text>
                There was an error fetching the data, please try again
              </Text>
            </Message>
          </Box>
        )}

        <Box
          sx={{
            marginBottom: 3,
          }}
        >
          <Text as="h1" variant="heading2">
            Your to do lists
          </Text>
        </Box>

        {(!listsData || !feedsData) && (
          <Box>
            <Text as="p">Fetching your lists from Microsoft To Do...</Text>
          </Box>
        )}

        {listsData && (
          <Box
            sx={{
              marginBottom: 4,
            }}
          >
            {listsData.map((list) => {
              const feedForList = feedsData.find((f) => f.id === list.id);

              return <List key={list.id} list={list} feed={feedForList} />;
            })}
          </Box>
        )}
      </Container>
    </>
  );
};

const ListsWithAuth = () => (
  <RequireAuth>
    <HeadTitle title="Account" />

    <Lists />
  </RequireAuth>
);

export default ListsWithAuth;
