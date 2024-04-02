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
  const supabase = createSupabaseBrowserClient();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      const { data: sessionData, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
        return;
      }
      setSession(sessionData.session);
      setUser(sessionData.session?.user ?? null);
      setLoading(false);
    };

    fetchSession();
  }, [supabase]);

  if (user && loading) {
    return null;
  }

  return (
    <SupabaseContext.Provider value={{ supabase, session, user }}>
      {children}
    </SupabaseContext.Provider>
  );
}

export { SupabaseContext, SupabaseProvider };
