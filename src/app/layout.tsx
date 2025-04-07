import type { Metadata } from "next";
import {Montserrat} from 'next/font/google'
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const montserrat = Montserrat({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "RefreeG-Platform",
  description: "Join Us as we create a world where no one is left behind",
  openGraph: {
    title: "RefreeG Platform",
    description: "Join Us as we create a world where no one is left behind",
    url: "https://www.refreeg.com",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} bg-white text-black  `}
      >
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
