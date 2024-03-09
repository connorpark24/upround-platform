import Header from "@/components/Header";
import { start } from "repl";

type StartupData = {
  name: string;
  industry: string;
  status: string;
  umichStartup: boolean;
  source: string;
  extraNotes: string;
  links: string;
};

enum Status {
  Contacted = "Contacted",
  Call = "Call",
  MemoWritten = "Memo Written",
  PassedToPartners = "Passed on to Partners",
  PassedToFund = "Passed on to Fund",
  Rejected = "Rejected",
}

type TableRowProps = {
  startupData: StartupData;
};

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

const sampleData: StartupData[] = [
  {
    name: "Tech Innovate",
    industry: "Software",
    status: "Call",
    umichStartup: true,
    source: "AngelList",
    extraNotes: "Focus on AI technologies",
    links: "https://www.techinnovate.com",
  },
  {
    name: "Eco Solutions",
    industry: "Environmental",
    status: "Contacted",
    umichStartup: false,
    source: "Crunchbase",
    extraNotes: "Developed a new water purification system",
    links: "https://www.ecosolutions.com",
  },
];

export default function StartupDatabase() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header title="Startup Database" />
      <div className="m-4 bg-white rounded-lg h-full border-gray-200 border-2">
        <div className="flex flex-row w-full h-14 items-center p-8 text-md border-b-[1px] border-gray-200">
          <div className="w-1/6">Name</div>
          <div className="w-1/6">Industry</div>
          <div className="w-1/6">Status</div>
          <div className="w-1/6">UMich Startup</div>
          <div className="w-1/6">Source</div>
          <div className="w-1/6">Extra Notes</div>
        </div>
        <div>
          {sampleData.map((row, index) => (
            <TableRow key={index} startupData={row} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TableRow({ startupData }: TableRowProps) {
  const statusColor = getStatusColor(startupData.status);

  return (
    <div className="flex flex-row h-[4.5rem] items-center p-8 text-md border-b-[1px] border-gray-200">
      <div className="w-1/6">{startupData.name}</div>
      <div className="w-1/6">{startupData.industry}</div>
      <div className="w-1/6">
        <span
          className={`px-3.5 py-1.5 rounded-full text-white ${statusColor}`}
        >
          {startupData.status}
        </span>
      </div>
      <div className="w-1/6">{startupData.umichStartup ? "Yes" : "No"}</div>
      <div className="w-1/6">{startupData.source}</div>
      <div className="w-1/6">{startupData.extraNotes}</div>
    </div>
  );
}
