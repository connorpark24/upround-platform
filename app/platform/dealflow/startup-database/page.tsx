"use client";
import { useState, useEffect, ReactNode } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import DeleteConfirmationModal from "@/components/DeleteConfirmModal";
import Header from "@/components/Header";
import Button from "@/components/Button";
import StartupForm from "@/components/StartupForm";
import Modal from "@/components/Modal";
import TextInput from "@/components/TextInput";
import Dropdown from "@/components/Dropdown";
import { Startup, StartupStatus, Pod } from "@/utils/types";
import useSupabase from "@/hooks/useSupabase";

const getStatusColor = (status: string): string => {
  switch (status) {
    case "Contacted":
      return "bg-green-500";
    case "Call":
      return "bg-blue-500";
    case "Memo Written":
      return "bg-purple-500";
    case "Passed on to Partners":
      return "bg-yellow-500";
    case "Passed on to Fund":
      return "bg-pink-500";
    case "Rejected":
      return "bg-red-500";
    default:
      return "bg-gray-800";
  }
};

export default function StartupDatabase() {
  const { supabase } = useSupabase();

  const [startups, setStartups] = useState<Startup[]>([]);
  const [query, setQuery] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [startupToDelete, setStartupToDelete] = useState<Startup | null>(null);
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
  const [newStartup, setNewStartup] = useState<Startup>({
    id: 0,
    name: "",
    member_id: 0,
    industry: "",
    status: "",
    umich_startup: false,
    source: "",
    notes: "",
    link: "",
    date_sourced: null,
    pod: Pod.Accelerator,
  });

  useEffect(() => {
    const fetchStartups = async () => {
      let { data, error } = await supabase.from("startups").select("*");
      if (error) {
        console.error(error);
        return;
      }

      let filteredData = data || [];

      if (query) {
        filteredData = filteredData.filter((startup) =>
          startup.name.toLowerCase().includes(query.toLowerCase())
        );
      }
      if (industry) {
        filteredData = filteredData.filter(
          (startup) => startup.industry === industry
        );
      }
      if (status) {
        filteredData = filteredData.filter(
          (startup) => startup.status === status
        );
      }

      setStartups(filteredData);
    };

    fetchStartups();
  }, [query, industry, status, startups, supabase]);

  const handleAddStartup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("startups")
      .insert([newStartup]);

    if (error) {
      console.error("There was an error inserting the data", error);
      return;
    }

    if (data) {
      setStartups((currentStartups) => [...currentStartups, ...data]);
    }

    setNewStartup({
      id: 0,
      name: "",
      member_id: 0,
      industry: "",
      status: "",
      umich_startup: false,
      source: "",
      notes: "",
      link: "",
      date_sourced: null,
      pod: Pod.Accelerator,
    });

    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (!startupToDelete) return;

    console.log(startupToDelete.id);

    let { error } = await supabase
      .from("startups")
      .delete()
      .eq("id", startupToDelete.id);

    if (error) {
      console.error("Error deleting startup:", error);
    } else {
      setStartups(
        startups.filter((startup) => startup.id !== startupToDelete.id)
      );
      setStartupToDelete(null);
    }

    setIsDeleteModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      <Header title="Startup Database" />
      <div className="px-8 pt-4 pb-8">
        <div className="w-full flex flex-row gap-x-8 mb-6 h-16">
          <div className="w-64">
            <TextInput
              label="Search"
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div>
            <Dropdown
              label="Industry"
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              options={["Consumer + Food", "Tech + Biomed", "Finance"]}
            />
          </div>

          <div>
            <Dropdown
              label="Status"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={[
                "Contacted",
                "Call",
                "Memo Written",
                "Passed on to Partners",
                "Passed on to Fund",
                "Rejected",
              ]}
            />
          </div>
          <div className="self-end ml-auto">
            <Button text={"Add Startup"} onClick={() => setIsModalOpen(true)} />
          </div>
          <Modal isOpen={isModalOpen}>
            <StartupForm
              newStartup={newStartup}
              setNewStartup={setNewStartup}
              onSubmit={handleAddStartup}
              onClose={() => setIsModalOpen(false)}
            />
          </Modal>
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDelete}
          />
        </div>
        <div className="rounded-lg border-[1px] border-gray-300">
          <div className="flex flex-row py-3 px-8 items-center text-sm bg-gray-100 border-b-[1px] border-gray-200 rounded-t-lg">
            <div className="w-1/6">Name</div>
            <div className="w-1/6">Industry</div>
            <div className="w-1/6">Status</div>
            <div className="w-1/6">Source</div>
            <div className="w-1/3">Sourced By</div>
          </div>
          <div>
            {startups.map((startup, index) => (
              <div key={startup.id}>
                <div
                  className="flex flex-row h-[2.5rem] items-center px-8 text-md border-b-[1px] border-gray-200 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    setExpandedRowId(
                      expandedRowId === startup.id ? null : startup.id
                    )
                  }
                >
                  <div className="w-1/6 pr-2 text-sm">
                    <a
                      href={startup.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {startup.name}
                    </a>
                  </div>
                  <div className="w-1/6 pr-2 text-sm">{startup.industry}</div>
                  <div className="w-1/6 pr-2 text-sm">
                    <span
                      className={`text-xs px-3 py-1 rounded-full text-white ${getStatusColor(
                        startup.status
                      )}`}
                    >
                      {startup.status}
                    </span>
                  </div>
                  <div className="w-1/6 pr-2 text-sm">{startup.source}</div>
                  <div className="w-1/3 pr-2 text-sm">{startup.member_id}</div>
                </div>
                {expandedRowId === startup.id && (
                  <div className="flex justify-between items-center px-8 text-sm border-b-[1px] border-gray-200">
                    <div className="w-full py-2">
                      <p>
                        {startup.notes ? startup.notes : "No notes available"}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setStartupToDelete(startup);
                        setIsDeleteModalOpen(true);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setStartupToDelete(startup);
                        setIsDeleteModalOpen(true);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
