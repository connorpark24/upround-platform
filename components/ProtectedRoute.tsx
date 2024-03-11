"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSupabase } from "@/utils/supabaseContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  return user ? children : null;
}
