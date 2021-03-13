import { useSession } from "next-auth/client";
import useSWR from "swr";
import { RequireAuth } from "../../components/RequireAuth/RequireAuth";

import config from "../../utils/config";

const fetcher = async (input: RequestInfo, init: RequestInit) => {
  const res = await fetch(input, init);
  return res.json();
};

const Lists: React.FC = () => {
  const { data: feedsData, error: feedsError } = useSWR("/api/feeds", fetcher);
  const { data: listsData, error: listsError } = useSWR("/api/lists", fetcher);

  if (!feedsData || !listsData) {
    return <div>Loading...</div>;
  }

  if (feedsError || listsError) {
    return <div>There was an error loading this page, please try again</div>;
  }

  return (
    <ul>
      {listsData.map((list) => {
        const feedForList = feedsData.find((f) => f.id === list.id);

        return (
          <li key={list.id}>
            <h2>{list.displayName}</h2>
            {feedForList && (
              <pre>
                <a
                  href={`/api/${feedForList.userId}/${feedForList.id}/feed.xml`}
                >
                  {config.baseDomain}/api/{feedForList.userId}/{feedForList.id}
                  /feed.xml
                </a>
              </pre>
            )}
          </li>
        );
      })}
    </ul>
  );
};

const ListsWithAuth = () => (
  <RequireAuth>
    <Lists />
  </RequireAuth>
);

export default ListsWithAuth;
