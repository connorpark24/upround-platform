"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import useSupabase from "@/hooks/useSupabase";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { User } from "@/utils/types";

export default function Profile() {
  const { supabase, user } = useSupabase();

  // Set up state for form values
  const [formData, setFormData] = useState({
    username: "",
    about: "",
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    streetAddress: "",
    city: "",
    region: "",
    postalCode: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching user data:", error);
        } else {
          // Set default form values
          setFormData({
            username: data.username || "",
            about: data.about || "",
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            email: data.email || "",
            country: data.country || "",
            streetAddress: data.street_address || "",
            city: data.city || "",
            region: data.region || "",
            postalCode: data.postal_code || "",
          });
        }
      }
    };

    fetchUserData();
  }, [supabase]);

  const handleSubmit = () => {
    // event.preventDefault();
    // Update the user's profile with formData
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-8 flex">
        <form onSubmit={handleSubmit} className="mx-auto w-1/2">
          <div>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-lg font-semibold leading-7 text-gray-900">
                Your Profile
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Personal Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="year"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Graduation Year
                  </label>
                  <div className="mt-2">
                    <input
                      id="year"
                      name="year"
                      type="number"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="major"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Major(s)
                  </label>
                  <div className="mt-2">
                    <input
                      id="major"
                      name="major"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="minor"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Minor(s)
                  </label>
                  <div className="mt-2">
                    <input
                      id="minor"
                      name="minor"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Hometown
                  </label>
                  <div className="mt-2">
                    <input
                      id="hometown"
                      name="hometown"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
