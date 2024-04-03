"use client";
import { redirect, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import useSupabase from "@/src/hooks/useSupabase";
import Login from "@/src/app/auth/login/page";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const context = useSupabase();
  const router = useRouter();

  useEffect(() => {
    if (!context.user) {
      redirect("/auth/login");
    }
  }, [context, router]);

  return context.initialLoaded ? children : <>{Login}</>;
}
