import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/Sidebar";

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
    <div className="flex flex-row h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
