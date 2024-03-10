// context/SupabaseContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import supabase from "../utils/supabaseClient";

export interface SupabaseContextType {
  session: Session | null;
  user: User | null;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined
);

interface SupabaseProviderProps {
  children: ReactNode;
}
export function SupabaseProvider({ children }: SupabaseProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
    };
    fetchSession();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      data.subscription?.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
}
