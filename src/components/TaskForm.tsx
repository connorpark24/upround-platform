"use client";
import TextInput from "@/components/TextInput";
import { Task } from "@/utils/types";
import TextAreaInput from "./TextAreaInput";

type TaskFormProps = {
  newTask: Task;
  setNewTask: React.Dispatch<React.SetStateAction<Task>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
};

const TaskForm: React.FC<TaskFormProps> = ({
  newTask,
  setNewTask,
  onSubmit,
  onClose,
}) => {
  return (
    <form onSubmit={onSubmit} className="p-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <TextInput
            label="Task"
            id="task"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          />
        </div>

        <div className="sm:col-span-6">
          <TextAreaInput
            label="Description"
            id="notes"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-medium leading-6 text-gray-900"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white  hover:bg-blue-400 "
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
