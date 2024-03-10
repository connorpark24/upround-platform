"use client";
import { Resource } from "@/utils/types";

type ResourceFormProps = {
  newResource: Resource;
  setNewResource: React.Dispatch<React.SetStateAction<Resource>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
};

const StartupForm: React.FC<ResourceFormProps> = ({
  newResource,
  setNewResource,
  onSubmit,
  onClose,
}) => {
  return (
    <form onSubmit={onSubmit} className="p-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Startup Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              className="block p-1 w-full rounded-md border-gray-300 border-[1px] sm:text-sm"
              value={newResource.name}
              onChange={(e) =>
                setNewResource({ ...newResource, name: e.target.value })
              }
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <div className="mt-1">
            <textarea
              id="notes"
              name="notes"
              className="block p-1 w-full h-24 rounded-md border-gray-300 border-[1px] sm:text-sm"
              value={newResource.description}
              onChange={(e) =>
                setNewResource({ ...newResource, description: e.target.value })
              }
              rows={4}
            />
          </div>
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

export default StartupForm;
