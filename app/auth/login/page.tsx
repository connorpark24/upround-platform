"use client";
import { createSupabaseBrowserClient } from "@/utils/supabase/supabaseBrowserClient";

export default function Login() {
  const supabase = createSupabaseBrowserClient();

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: `http://localhost:3000/auth/callback`,
      },
    });

    if (data) {
    } else if (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
          Log in to Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <button
          type="button"
          onClick={signInWithGoogle}
          className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm"
        >
          Log in with Google
        </button>
      </div>
    </div>
  );
}
