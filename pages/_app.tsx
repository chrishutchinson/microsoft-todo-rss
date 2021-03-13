import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Flex, ThemeProvider } from "theme-ui";

import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";

import theme from "../theme";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <Flex
          sx={{
            minHeight: "100vh",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Header />

          <Component {...pageProps} />

          <Footer />
        </Flex>
      </ThemeProvider>
    </Provider>
  );
};

export default App;