"use client";
import { useRouter, redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";
import useSupabase from "@/hooks/useSupabase";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useSupabase();

  console.log(user);
  useEffect(() => {
    if (!user) {
      redirect("/auth/login");
    }
  }, []);

  return children;
}
