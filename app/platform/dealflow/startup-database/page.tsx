"use client";
import { useState, useEffect, ReactNode } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import StartupForm from "@/components/StartupForm";
import supabase from "@/utils/supabaseClient";
import { Startup, StartupStatus } from "@/utils/types";

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
  const [startups, setStartups] = useState<Startup[]>([]);
  const [query, setQuery] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [startupName, setStartupName] = useState<string>("");
  const [newStartup, setNewStartup] = useState<Startup>({
    name: "",
    memberId: 0,
    industry: "",
    status: "",
    umichStartup: false,
    source: "",
    notes: "",
    link: "",
    dateSourced: null,
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
  }, [query, industry, status]);

  const handleAddStartup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(startupName);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      <Header title="Startup Database" />
      <div className="px-8 py-4">
        <div className="w-full flex flex-row gap-x-8 mb-6 h-16">
          <div>
            <label className="block text-md font-medium mb-1">Search</label>
            <div>
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                className="w-72 rounded-md border-[1px] border-gray-300 p-2 py-1.5 text-sm placeholder:text-gray-400"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="industry"
              className="block text-md font-medium mb-1"
            >
              Industry
            </label>
            <select
              id="industry"
              name="industry"
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full p-2 py-1.5  rounded-md border-[1px] border-gray-300 items-center text-sm placeholder:text-gray-400"
            >
              <option value="">Select Industry</option>
              <option value="Consumer + Food">Consumer + Food</option>
              <option value="Tech + Biomed">Tech + Biomed</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-md font-medium mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-md border-[1px] border-gray-300 items-center text-sm p-2 py-1.5  placeholder:text-gray-400"
            >
              <option value="">Select Status</option>
              {Object.values(StartupStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
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
        </div>
        <div className="rounded-lg border-[1px] border-gray-300">
          <div className="flex flex-row py-3 px-8 items-center text-md bg-gray-100 border-b-[1px] border-gray-200 rounded-t-lg">
            <div className="w-1/6">Name</div>
            <div className="w-1/6">Industry</div>
            <div className="w-1/6">Status</div>
            <div className="w-1/6">Source</div>
            <div className="w-1/3">Sourced By</div>
          </div>
          <div>
            {startups.map((row, index) => (
              <TableRow key={index} startupData={row} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type TableRowProps = {
  startupData: Startup;
};

const TableRow = ({ startupData }: TableRowProps) => {
  const statusColor = getStatusColor(startupData.status);

  return (
    <div className="flex flex-row h-[2.5rem] items-center px-8 text-md border-b-[1px] border-gray-200">
      <div className="w-1/6 pr-2 text-sm">
        <a href={startupData.link} target="_blank" rel="noopener noreferrer">
          {startupData.name}
        </a>
      </div>
      <div className="w-1/6 pr-2 text-sm">{startupData.industry}</div>
      <div className="w-1/6 pr-2 text-sm">
        <span
          className={`text-xs px-3 py-1 rounded-full text-white ${statusColor}`}
        >
          {startupData.status}
        </span>
      </div>
      <div className="w-1/6 pr-2 text-sm">{startupData.source}</div>
      <div className="w-1/3 pr-2 text-sm">{startupData.memberId}</div>
    </div>
  );
};

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 z-50 flex justify-center items-center">
      <div className="bg-white rounded-md z-5 w-2/5">{children}</div>
    </div>
  );
};
