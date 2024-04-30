"use client";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import Header from "@/components/Header";
import TaskForm from "@/components/TaskForm";
import TextInput from "@/components/TextInput";
import Modal from "@/components/Modal";
import { Task } from "@/utils/types";
import useSupabase from "@/hooks/useSupabase";

export default function Tasks() {
  const { supabase } = useSupabase();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<Task>({
    name: "",
    user_assigned: 0,
    done_by: "2023-05-15",
    status: "In Progress",
    description: "",
    profiles: {
      full_name: "",
    },
  });

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select(
        `
      *,
      profiles (
        full_name
      )
    `
      )
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching tasks:", error);
    } else {
      setTasks(data);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase.from("tasks").insert([newTask]);

    if (error) {
      console.log(error);
    }

    setNewTask({
      name: "",
      user_assigned: 0,
      done_by: "2023-05-15",
      status: "In Progress",
      description: "",
      profiles: {
        full_name: "",
      },
    });

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
        <h1 className="font-medium text-xl mb-4">To-Do</h1>
        <div className="bg-white rounded-lg border-gray-200 border-[1px]">
          <div className="flex flex-row w-full items-center px-8 py-3 bg-gray-100 text-sm border-b-[1px] border-gray-200">
            <div className="w-1/3">Title</div>
            <div className="w-1/6">Assigned to</div>
            <div className="w-1/6">Done By</div>
            <div className="w-1/6">Status</div>
          </div>
          <div>
            {tasks.map((task, index) => (
              <div
                key={index}
                className="flex flex-row items-center px-8 py-3 text-sm border-b-[1px] border-gray-200"
              >
                <div className="w-1/3">{task.name}</div>
                <div className="w-1/6">{task.profiles.full_name}</div>
                <div className="w-1/6"> {new Date(task.done_by).getDate()}</div>
                <div className="w-1/6">{task.status}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 mb-4 bg-gray-200 h-[1px]"></div>

        <h1 className="font-medium text-xl mb-4">Done</h1>
        <div className="bg-white rounded-lg border-gray-200 border-[1px]">
          <div className="flex flex-row w-full items-center px-8 py-3 bg-gray-100 text-sm border-b-[1px] border-gray-200">
            <div className="w-1/3">Title</div>
            <div className="w-1/6">Assigned to</div>
            <div className="w-1/6">Done By</div>
            <div className="w-1/6">Status</div>
          </div>
          <div>
            {tasks.map((task, index) => (
              <div
                key={index}
                className="flex flex-row items-center px-8 py-3 text-sm border-b-[1px] border-gray-200"
              >
                <div className="w-1/3">{task.name}</div>
                <div className="w-1/6">{task.profiles.full_name}</div>
                <div className="w-1/6"> {new Date(task.done_by).getDate()}</div>
                <div className="w-1/6">{task.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
