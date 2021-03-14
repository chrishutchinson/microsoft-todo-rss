import Head from "next/head";
import config from "../../utils/config";

export const HeadTitle: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <Head>
      <title>
        {title ? `${title} &bull; ` : ""}
        {config.appTitle}
      </title>
    </Head>
  );
};
