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
      <div className="px-8 py-4">
        <div className="bg-white rounded-lg h-full border-gray-200 border-[1px]">
          <div className="flex flex-row w-full items-center px-8 py-3 bg-gray-100 text-sm border-b-[1px] border-gray-200">
            <div className="w-1/6">Name</div>
            <div className="w-1/4">Contact</div>
            <div className="w-1/4">Major</div>
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
    <div className="flex flex-row items-center px-8 py-2 text-sm border-b-[1px] border-gray-200">
      <div className="w-1/6">
        <a href={memberData.linkedin} target="_blank" rel="noopener noreferrer">
          {memberData.name}
        </a>
      </div>
      <div className="w-1/4 flex flex-col">
        <div>{memberData.email}</div>
        <div>{memberData.phone}</div>
      </div>
      <div className="w-1/4 pr-2">
        {memberData.major} {memberData.year}
      </div>
      <div className="w-1/6">{memberData.hometown}</div>
    </div>
  );
}
