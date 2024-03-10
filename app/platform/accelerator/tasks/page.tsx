"use client";
import { useState } from "react";
import Button from "@/components/Button";
import Header from "@/components/Header";

type TaskData = {
  title: string;
  members: number[];
  dueDate: Date;
  status: string;
  notes: string;
};

type TableRowProps = {
  taskData: TaskData;
};

const sampleData: TaskData[] = [
  {
    title: "Design Website Layout",
    members: [1, 2],
    dueDate: new Date("2023-05-15"),
    status: "In Progress",
    notes: "Focus on user-friendly navigation",
  },
  {
    title: "Prepare Presentation Slides",
    members: [3],
    dueDate: new Date("2023-05-20"),
    status: "Not Started",
    notes: "Include project timeline and milestones",
  },
  {
    title: "Conduct User Interviews",
    members: [2, 4],
    dueDate: new Date("2023-05-25"),
    status: "Completed",
    notes: "Compile interview notes and insights",
  },
];

export default function Tasks() {
  const [query, setQuery] = useState<string>("");

  return (
    <div className="flex flex-col w-full h-full">
      <Header title="Tasks" />
      <div className="px-8 pt-4">
        <div className="w-full flex flex-row gap-x-8 mb-8 h-16">
          <div>
            <label className="block text-md font-medium mb-1">Search</label>
            <div>
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                className="w-64 h-10 rounded-md border-2 p-2 text-sm placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="self-end ml-auto">
            <Button
              text={"Add Task"}
              onClick={() => console.log("Button clicked")}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg border-gray-200 border-2">
          <div className="flex flex-row w-full items-center px-8 py-3 bg-gray-100 text-md border-b-[1px] border-gray-200">
            <div className="w-1/3">Title</div>
            <div className="w-1/6">Member(s)</div>
            <div className="w-1/6">Done By</div>
            <div className="w-1/6">Status</div>
          </div>
          <div>
            {sampleData.map((row, index) => (
              <TableRow key={index} taskData={row} />
            ))}
            {sampleData.map((row, index) => (
              <TableRow key={index} taskData={row} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRow({ taskData }: TableRowProps) {
  return (
    <div className="flex flex-row items-center px-8 py-3 text-sm border-b-[1px] border-gray-200">
      <div className="w-1/3">{taskData.title}</div>
      <div className="w-1/6">{taskData.members[0]}</div>
      <div className="w-1/6">{taskData.dueDate.getDate()}</div>
      <div className="w-1/6">{taskData.status}</div>
    </div>
  );
}
