"use client";
import TextInput from "./TextInput";
import Dropdown from "./Dropdown";
import TextAreaInput from "./TextAreaInput";
import { Startup } from "@/utils/types";

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
          <TextInput
            label="Startup Name"
            id="name"
            value={newStartup.name}
            onChange={(e) =>
              setNewStartup({ ...newStartup, name: e.target.value })
            }
          />
        </div>

        <div className="sm:col-span-3">
          <TextInput
            label="Industry"
            id="industry"
            value={newStartup.industry}
            onChange={(e) =>
              setNewStartup({ ...newStartup, industry: e.target.value })
            }
          />
        </div>

        <div className="sm:col-span-6">
          <Dropdown
            label="Status"
            id="status"
            value={newStartup.status}
            onChange={(e) =>
              setNewStartup({ ...newStartup, status: e.target.value })
            }
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

        <div className="sm:col-span-6">
          <TextInput
            label="Source"
            id="source"
            value={newStartup.source}
            onChange={(e) =>
              setNewStartup({ ...newStartup, source: e.target.value })
            }
          />
        </div>

        <div className="sm:col-span-6">
          <TextAreaInput
            label="Notes"
            id="notes"
            value={newStartup.notes}
            onChange={(e) =>
              setNewStartup({ ...newStartup, notes: e.target.value })
            }
            rows={3}
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

export default StartupForm;
