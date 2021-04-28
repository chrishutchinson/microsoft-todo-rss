import { useCallback, useState } from "react";
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
import { buildFeedUrl } from "../../utils/build-feed-url";

const fetcher = async (input: RequestInfo, init: RequestInit) => {
  const res = await fetch(input, init);
  return res.json();
};

const List: React.FC<{ list: any; feed?: any }> = ({ list, feed }) => {
  const [storedFeed, setStoredFeed] = useState(feed);
  const [isCopied, setIsCopied] = useState(false);
  const [status, setStatus] = useState<
    "none" | "pending" | "error" | "success"
  >("none");

  const handleEnableFeed = useCallback(async () => {
    setStatus("pending");
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
      setStatus("error");
      return;
    }

    const feed = await res.json();

    setStoredFeed(feed);
    setStatus("success");
  }, []);

  const handleDisableFeed = useCallback(async () => {
    setStatus("pending");
    setIsCopied(false);
    const res = await fetch(`/api/feed?listId=${list.id}`, {
      method: "delete",
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    setStoredFeed(undefined);
    setStatus("success");
  }, []);

  const handleCopyFeedUrl = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      await navigator.clipboard.writeText(
        buildFeedUrl(storedFeed, {
          relative: false,
        })
      );

      setIsCopied(true);
    },
    [storedFeed]
  );

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
              flexGrow: 1,
              maxWidth: 400,
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

            {storedFeed && (
              <Flex
                sx={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <Input
                  sx={{
                    marginRight: 1,
                  }}
                  type="text"
                  disabled
                  value={buildFeedUrl(storedFeed, {
                    relative: false,
                  })}
                />
                <Link
                  href={buildFeedUrl(storedFeed)}
                  onClick={handleCopyFeedUrl}
                  variant="button"
                  sx={{
                    width: 110,
                    textAlign: "center",
                  }}
                >
                  {isCopied ? "Copied!" : "Copy"}
                </Link>
              </Flex>
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
            {storedFeed ? (
              <>
                <Button onClick={handleDisableFeed} variant="buttonDanger">
                  {status === "pending" ? "Deactivating..." : "Deactivate feed"}
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleEnableFeed} variant="buttonAction">
                  {status === "pending" ? "Activating..." : "Activate feed"}
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
