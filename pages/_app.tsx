import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/Theme";
import type { AppProps } from "next/app";

import Header from "../components/Header/Index";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
