"use client";
import { useState } from "react";
import Button from "@/components/Button";
import Header from "@/components/Header";
import TaskForm from "@/components/TaskForm";
import TextInput from "@/components/TextInput";
import Modal from "@/components/Modal";
import { Task } from "@/utils/types";

const sampleData: Task[] = [
  {
    name: "Design Website Layout",
    members_assigned: [1, 2],
    done_by: new Date("2023-05-15"),
    status: "In Progress",
    description: "Focus on user-friendly navigation",
    profiles: {
      full_name: "",
    },
  },
  {
    name: "Design Website Layout",
    members_assigned: [1, 2],
    done_by: new Date("2023-05-15"),
    status: "In Progress",
    description: "Focus on user-friendly navigation",
    profiles: {
      full_name: "Connor Park",
    },
  },
];

export default function Tasks() {
  const [query, setQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<Task>({
    name: "",
    members_assigned: [0],
    done_by: new Date("2023-05-15"),
    status: "In Progress",
    description: "",
    profiles: {
      full_name: "",
    },
  });

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newTask.name);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Header title="Tasks" />
      <div className="px-8 pt-4 pb-8">
        <div className="w-full flex flex-row gap-x-8 mb-8 items-end">
          <div className="w-64">
            <TextInput
              label="Search"
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="self-end ml-auto">
            <Button text={"Add Task"} onClick={() => setIsModalOpen(true)} />
          </div>
          <Modal isOpen={isModalOpen}>
            <TaskForm
              newTask={newTask}
              setNewTask={setNewTask}
              onSubmit={handleAddTask}
              onClose={() => setIsModalOpen(false)}
            />
          </Modal>
        </div>

        <div className="bg-white rounded-lg border-gray-200 border-[1px]">
          <div className="flex flex-row w-full items-center px-8 py-3 bg-gray-100 text-sm border-b-[1px] border-gray-200">
            <div className="w-1/3">Title</div>
            <div className="w-1/6">Member(s)</div>
            <div className="w-1/6">Done By</div>
            <div className="w-1/6">Status</div>
          </div>
          <div>
            {sampleData.map((task, index) => (
              <div
                key={index}
                className="flex flex-row items-center px-8 py-3 text-sm border-b-[1px] border-gray-200"
              >
                <div className="w-1/3">{task.name}</div>
                <div className="w-1/6">{task.members_assigned[0]}</div>
                <div className="w-1/6">{task.done_by.getDate()}</div>
                <div className="w-1/6">{task.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
