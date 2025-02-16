import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../app/globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import CryptoNavbar from "../../components/cryptoNavbar";

const inter = Inter({ subsets: ["latin"] });

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
      <body className="bg-slate-100 text-slate-700">
        <ThirdwebProvider>
          <CryptoNavbar />
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
