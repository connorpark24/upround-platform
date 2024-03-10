"use client";
import { Startup, StartupStatus } from "@/utils/types";

type StartupFormProps = {
  newStartup: Startup;
  setNewStartup: React.Dispatch<React.SetStateAction<Startup>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
};

const StartupForm: React.FC<StartupFormProps> = ({
  newStartup,
  setNewStartup,
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
              value={newStartup.name}
              onChange={(e) =>
                setNewStartup({ ...newStartup, name: e.target.value })
              }
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="industry"
            className="block text-sm font-medium text-gray-700"
          >
            Industry
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="industry"
              id="industry"
              autoComplete="industry"
              className="block p-1 w-full rounded-md border-gray-300 border-[1px]  sm:text-sm"
              value={newStartup.industry}
              onChange={(e) =>
                setNewStartup({
                  ...newStartup,
                  industry: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <div className="mt-1">
            <select
              id="status"
              name="status"
              autoComplete="status"
              className="p-1 block w-full rounded-md border-gray-300 border-[1px] sm:text-sm"
              value={newStartup.status}
              onChange={(e) =>
                setNewStartup({ ...newStartup, status: e.target.value })
              }
            >
              <option value="">Select Status</option>
              {Object.values(StartupStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="sm:col-span-6">
          <label
            htmlFor="source"
            className="block text-sm font-medium text-gray-700"
          >
            Source
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="source"
              id="source"
              autoComplete="source"
              className="block p-1 w-full rounded-md border-gray-300 border-[1px] sm:text-sm"
              value={newStartup.source}
              onChange={(e) =>
                setNewStartup({ ...newStartup, source: e.target.value })
              }
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700"
          >
            Notes
          </label>
          <div className="mt-1">
            <textarea
              id="notes"
              name="notes"
              className="block p-1 w-full h-24 rounded-md border-gray-300 border-[1px] sm:text-sm"
              value={newStartup.notes}
              onChange={(e) =>
                setNewStartup({ ...newStartup, notes: e.target.value })
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
