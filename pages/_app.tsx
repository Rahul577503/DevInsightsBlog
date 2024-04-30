import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Roboto_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "next/head";
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>DevInsightsBlog</title>
        <meta name="description" content="A Blog for Devloper " />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${roboto_mono.className}`}>
        <ThemeProvider enableSystem={true} attribute="class">
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </main>
    </>
  );
}
