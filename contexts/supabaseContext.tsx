"use client";
import { createContext, useEffect, useState, ReactNode } from "react";
import { SupabaseClient, Session, User } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/utils/supabaseBrowserClient";

export interface SupabaseContextType {
  session: Session | null;
  user: User | null;
  supabase: SupabaseClient;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined
);

function SupabaseProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: sessionData, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
        return;
      }
      setSession(sessionData.session);
      setUser(sessionData.session?.user ?? null);
    };

    fetchSession();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      data.subscription?.unsubscribe();
    };
  });

  const value = {
    supabase,
    session,
    user,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
}

export { SupabaseContext, SupabaseProvider };
