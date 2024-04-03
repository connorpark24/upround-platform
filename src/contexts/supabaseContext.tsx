"use client";
import { createContext, useEffect, useState, ReactNode } from "react";
import { SupabaseClient, Session, User } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/src/utils/supabase/supabaseBrowserClient";

export interface SupabaseContextType {
  user: User | null;
  initialLoaded: boolean;
  supabase: SupabaseClient;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined
);

function SupabaseProvider({ children }: { children: ReactNode }) {
  const supabase = createSupabaseBrowserClient();
  const [loading, setLoading] = useState(true);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error(error);
    }
    setInitialLoaded(true);
    return data?.user;
  });

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event: any, session: any) => {
        setUser((session?.user as User) ?? null);
        setLoading(true);
      }
    );

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // fetch user details
    setLoading(false);
  }, [user]);

  if (user && loading) {
    return null;
  }

  return (
    <SupabaseContext.Provider value={{ supabase, initialLoaded, user }}>
      {children}
    </SupabaseContext.Provider>
  );
}

export { SupabaseContext, SupabaseProvider };
