import type { Metadata } from "next";
import "../globals.css";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { SupabaseProvider } from "@/utils/supabaseContext";
import ProtectedRoute from "@/components/ProtectedRoute";

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
