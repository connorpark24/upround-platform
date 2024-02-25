import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UpRound Platform",
  description: "Internal tools for the club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-row">
          <Sidebar />
          <div className="flex flex-col w-full">
            <div className="border-b-[3px] border-gray-100 bg-white flex flex-row items-center justify-between p-6">
              <div className="text-3xl">UpRound Dashboard</div>
              <div className="rounded-lg border-gray-100 border-2 px-8 py-5 flex flex-row bg-blue-300">
                <p>Connor Park</p>
              </div>
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
