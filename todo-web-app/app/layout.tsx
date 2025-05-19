import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./style.css";
import Providers from "../context/providers";
import DownloadBanner from "../components/DownloadBanner";
import FooterComponent from '../components/FooterComponent';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'TaskFlowX',
  description: 'A simple TODO application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} font-simple bg-bgPrimary min-h-screen flex flex-col`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <DownloadBanner />
            <main className="flex-grow">{children}</main>
            <FooterComponent />
          </div>
        </Providers>
      </body>
    </html>
  )
}
