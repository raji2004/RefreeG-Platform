import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../../app/globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import CryptoNavbar from "../../components/cryptoNavbar";
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RefreeG Crypto Feature",
  description: "RefreeG Crypto Feature",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-white text-black  `}>
        <ThirdwebProvider>
          <CryptoNavbar />
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
