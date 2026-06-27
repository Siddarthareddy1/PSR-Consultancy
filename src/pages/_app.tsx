import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins, Inter, Open_Sans } from "next/font/google";
import Layout from "@/components/Layout";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-opensans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${poppins.variable} ${inter.variable} ${openSans.variable} font-body text-neutralDark bg-gray-50 min-h-screen flex flex-col`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
