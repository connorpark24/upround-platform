"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/utils/supabaseClient";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  async function signUpNewUser() {
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (data) {
      alert("Check your email for the confirmation link.");
      router.push("/platform/enterInfo");
    } else if (error) {
      console.error(error.message);
    } else {
      alert("Check your email for the confirmation link.");
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" onSubmit={signUpNewUser}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={signUpNewUser}
                className="block w-full rounded-md border-[1px] border-gray-200 p-2 text-gray-900 shadow-sm  placeholder:text-gray-400 "
              />
            </div>
          </div>

          <div>
            <div className="flex items-center">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="block w-full rounded-md border-[1px] border-gray-200 p-2 text-gray-900 shadow-sm placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an Account?{" "}
          <a
            href="/auth/login"
            className="font-semibold leading-6 text-green-600 hover:text-green-500"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
