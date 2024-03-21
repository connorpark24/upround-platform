"use client";
import { useState, useEffect } from "react";
import {
  PlusCircleIcon,
  DocumentTextIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import useSupabase from "@/hooks/useSupabase";
import { Startup } from "@/utils/types";

const getStatusColor = (status: string): string => {
  switch (status) {
    case "Not Started":
      return "bg-gray-500";
    case "In Progress":
      return "bg-blue-500";
    case "Done":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

export default function StartupBoard() {
  const { supabase } = useSupabase();

  const [startups, setStartups] = useState<Startup[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchStartups = async () => {
      let { data, error } = await supabase
        .from("startups")
        .select("*")
        .eq("in_fund", true);

      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        setStartups(data);
      }
    };

    fetchStartups();
  }, [startups]);

  return (
    <div className="flex flex-col w-full h-full">
      <Header title="Startup Board" />
      <div className="p-6">
        <div className="flex mb-2">
          <Button
            text={"Add Startup"}
            onClick={() => setIsModalOpen(true)}
            icon={<PlusCircleIcon />}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {startups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
          <Modal isOpen={isModalOpen}>
            <div>Information</div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

interface StartupCardProps {
  startup: Startup;
}

function StartupCard({ startup }: StartupCardProps) {
  return (
    <div className="border-[1px] h-48 rounded-xl p-4 relative">
      <div
        className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getStatusColor(
          startup.fund_status
        )}`}
      ></div>
      <div className="flex flex-row gap-x-2 text-lg items-center">
        <p>{startup.name}</p>
        <DocumentTextIcon className="w-5 h-5" />
        <LinkIcon className="w-5 h-5" />
      </div>
      <p className="text-sm">{startup.notes}</p>
    </div>
  );
}
