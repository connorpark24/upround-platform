"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import useSupabase from "@/hooks/useSupabase";
import { User, Pod, Rank } from "@/utils/types";

export default function Profile() {
  const { supabase, user } = useSupabase();
  const [success, setSuccess] = useState<boolean>(false);

  const [userData, setUserData] = useState<User>({
    full_name: "",
    email: "",
    phone: "",
    pod: Pod.Accelerator,
    rank: Rank.NewMember,
    major: "",
    year: 0,
    hometown: "",
    linkedin: "",
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
          setUserData({
            full_name: data.full_name || "",
            email: data.email || "",
            phone: data.phone || "",
            pod: data.pod || Pod.Accelerator,
            rank: data.rank || Rank.NewMember,
            major: data.major || "",
            year: data.year || 0,
            hometown: data.hometown || "",
            linkedin: data.linkedin || "",
          });
        }
      }
    };

    fetchUserData();
  }, [supabase, user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("profiles")
      .update({
        full_name: userData.full_name, // don't update email
        phone: userData.phone,
        pod: userData.pod,
        rank: userData.rank,
        major: userData.major,
        year: userData.year,
        hometown: userData.hometown,
        linkedin: userData.linkedin,
      })
      .eq("id", user?.id);

    if (error) {
      console.log(error);
    }

    setUserData({
      full_name: "",
      email: "",
      phone: "",
      pod: Pod.Accelerator,
      rank: Rank.NewMember,
      major: "",
      year: 0,
      hometown: "",
      linkedin: "",
    });

    setSuccess(true);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <Header title="Profile" />
      <div className="p-8 flex flex-col">
        {success && (
          <>
            <p className="font-xl text-center w-full font-medium p-4">
              Profile updated successfully!
            </p>
          </>
        )}
        <form onSubmit={handleSubmit} className="mx-auto w-1/2">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <TextInput
                  label="Full Name"
                  id="full_name"
                  value={userData.full_name}
                  onChange={(e) =>
                    setUserData({ ...userData, full_name: e.target.value })
                  }
                />
              </div>

              <div className="sm:col-span-3">
                <TextInput
                  label="Phone"
                  id="phone"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                />
              </div>
              <div className="sm:col-span-6">
                <TextInput
                  label="Major"
                  id="major"
                  value={userData.major}
                  onChange={(e) =>
                    setUserData({ ...userData, major: e.target.value })
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <TextInput
                  label="Graduation Year"
                  id="year"
                  value={userData.year.toString()}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      year: parseInt(e.target.value, 10),
                    })
                  }
                />
              </div>
              <div className="sm:col-span-4">
                <TextInput
                  label="Hometown"
                  id="hometown"
                  value={userData.hometown}
                  onChange={(e) =>
                    setUserData({ ...userData, hometown: e.target.value })
                  }
                />
              </div>
              <div className="sm:col-span-6">
                <TextInput
                  label="LinkedIn"
                  id="linkedin"
                  value={userData.linkedin}
                  onChange={(e) =>
                    setUserData({ ...userData, linkedin: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button text="Save" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
