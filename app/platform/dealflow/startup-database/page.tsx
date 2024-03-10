"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import supabase from "@/utils/supabaseClient";
import { Startup } from "@/utils/types";

enum Status {
  Contacted = "Contacted",
  Call = "Call",
  MemoWritten = "Memo Written",
  PassedToPartners = "Passed on to Partners",
  PassedToFund = "Passed on to Fund",
  Rejected = "Rejected",
}

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStartups = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };

    fetchStartups();
  }, [query, industry, status]);

  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      <Header title="Startup Database" />
      <div className="p-8">
        <div className="w-full flex flex-row gap-x-8 mb-6 h-16">
          <div>
            <label htmlFor="search" className="block text-md font-medium mb-1">
              Search
            </label>
            <div>
              <input
                id="search"
                required
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                className="w-full h-10 rounded-md border-2 p-2 text-sm placeholder:text-gray-400"
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
              className="w-full h-10 p-2 rounded-md border-2 items-center text-sm placeholder:text-gray-400"
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
              className="w-full h-10 rounded-md border-2 items-center text-sm p-2 placeholder:text-gray-400"
            >
              <option value="">Select Status</option>
              {Object.values(Status).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="self-end ml-auto">
            <Button text={"Add Startup"} />
          </div>
        </div>
        <div className="rounded-lg border-gray-200 border-2">
          <div className="flex flex-row py-3 px-8 items-center text-md bg-gray-100 border-b-[1px] border-gray-200">
            <div className="w-1/6">Name</div>
            <div className="w-1/6">Industry</div>
            <div className="w-1/6">Status</div>
            <div className="w-1/6">UMich Startup</div>
            <div className="w-1/6">Source</div>
            <div className="w-1/6">Extra Notes</div>
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

function TableRow({ startupData }: TableRowProps) {
  const statusColor = getStatusColor(startupData.status);

  return (
    <div className="flex flex-row h-[3.5rem] items-center p-8 text-md border-b-[1px] border-gray-200">
      <div className="w-1/6 pr-2">
        <a href={startupData.link} target="_blank" rel="noopener noreferrer">
          {startupData.name}
        </a>
      </div>
      <div className="w-1/6 pr-2">{startupData.industry}</div>
      <div className="w-1/6 pr-2">
        <span
          className={`text-xs px-3.5 py-1.5 rounded-full text-white ${statusColor}`}
        >
          {startupData.status}
        </span>
      </div>
      <div className="w-1/6 pr-2">
        {startupData.umichStartup ? "Yes" : "No"}
      </div>
      <div className="w-1/6 pr-2">{startupData.source}</div>
      <div className="w-1/6 pr-2 text-sm">{startupData.notes}</div>
    </div>
  );
}
