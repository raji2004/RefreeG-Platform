import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: ": RefreeG – Crowdfunding for a Better Africa",
  description: "RefreeG is a crowdfunding platform dedicated to empowering individuals and communities by raising funds for impactful causes. From education and healthcare to disaster relief and social entrepreneurship, we help connect donors with verified causes that drive real change. Start a cause, donate, or join a community making a difference today.",
  openGraph: {
    title: "RefreeG – Crowdfunding for a Better Africa",
    description: "RefreeG is a crowdfunding platform dedicated to empowering individuals and communities by raising funds for impactful causes. From education and healthcare to disaster relief and social entrepreneurship, we help connect donors with verified causes that drive real change. Start a cause, donate, or join a community making a difference today.",
    url: "https://www.refreeg.com",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Head>
        {/* Google AdSense Meta Tag */}
        <meta name="google-adsense-account" content="ca-pub-6133323682562865" />
        
        {/* Google AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6133323682562865"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <body className={`${montserrat.className} bg-white text-black`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
