import Head from "next/head";
import config from "../../utils/config";

export const HeadTitle: React.FC<{ title?: string }> = ({ title }) => {
  const titleString = `${title ? `${title} • ` : ""}${config.appTitle}`;

  return (
    <Head>
      <title>{titleString}</title>
      <meta property="og:title" content={titleString} />
      <meta name="twitter:title" content={titleString} />
    </Head>
  );
};
