import { useContext } from "react";
import {
  SupabaseContext,
  SupabaseContextType,
} from "@/src/contexts/supabaseContext";

export default function useSupabase(): SupabaseContextType {
  const supabaseContext = useContext(SupabaseContext);
  if (supabaseContext === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return supabaseContext;
}
