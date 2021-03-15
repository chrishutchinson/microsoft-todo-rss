import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Flex, ThemeProvider } from "theme-ui";

import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { HeadTitle } from "../components/HeadTitle/HeadTitle";

import theme from "../theme";
import config from "../utils/config";
import { usePanelbear } from "../utils/panelbear";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  usePanelbear("2cZkMLIp36t");
  const { pathname } = useRouter();

  return (
    <Provider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <HeadTitle />
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,700&display=swap"
            rel="stylesheet"
          />
          <meta property="og:url" content={`${config.baseDomain}${pathname}`} />
          <meta
            property="og:description"
            content="Turn Microsoft To Do lists into RSS feeds, for quick and easy
            reading lists!"
          />
          <meta
            property="og:image"
            content={`${config.baseDomain}/og-image.png`}
          />
          <meta
            name="twitter:description"
            content="Turn Microsoft To Do lists into RSS feeds, for quick and easy
            reading lists!"
          />
          <meta
            name="twitter:image"
            content={`${config.baseDomain}/og-image.png`}
          />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <Flex
          sx={{
            minHeight: "100vh",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Header />

          <Box
            sx={{
              marginTop: 0,
              marginBottom: "auto",
            }}
          >
            <Component {...pageProps} />
          </Box>

          <Footer />
        </Flex>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
