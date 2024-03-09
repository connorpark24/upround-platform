"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import supabase from "@/utils/supabaseClient";
import { Member } from "@/utils/types";

type TableRowProps = {
  memberData: Member;
};

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchStartups = async () => {
      let { data, error } = await supabase.from("members").select("*");
      if (data) setMembers(data);
    };
    fetchStartups();
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <Header title="Member Database" />
      <div className="p-6">
        <div className="bg-white rounded-lg h-full border-gray-200 border-2">
          <div className="flex flex-row w-full h-14 items-center p-8 text-md border-b-[1px] border-gray-200">
            <div className="w-1/6">Name</div>
            <div className="w-1/6">Contact</div>
            <div className="w-1/6">Major</div>
            <div className="w-1/6">Pod</div>
            <div className="w-1/6">Hometown</div>
          </div>
          <div>
            {members.map((row, index) => (
              <TableRow key={index} memberData={row} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRow({ memberData }: TableRowProps) {
  return (
    <div className="flex flex-row h-[4.5rem] items-center p-8 text-md border-b-[1px] border-gray-200">
      <div className="w-1/6">{memberData.name}</div>
      <div className="w-1/6 flex flex-col">
        <div>{memberData.email}</div>
        <div>{memberData.phone}</div>
      </div>
      <div className="w-1/6">
        {memberData.major}, {memberData.year}
      </div>
      <div className="w-1/6">{memberData.pod}</div>
      <div className="w-1/6">{memberData.hometown}</div>
    </div>
  );
}
