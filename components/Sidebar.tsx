"use client";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="border-r-[3px] border-gray-100">
      {isOpen ? (
        <div className="w-60 flex flex-col p-6 min-h-screen">
          <button onClick={toggleSidebar} className="mb-6 h-8 w-8">
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <div className="flex flex-col gap-y-9">
            <div className="flex flex-col gap-y-2">
              <div className="text-gray-400 text-sm">Home</div>
              <Link className="text-base" href="/platform/">
                Dashboard
              </Link>
              <Link className="text-base" href="/platform/members">
                Members
              </Link>
              <Link className="text-base" href="/platform/resources">
                Resources
              </Link>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="text-gray-400 text-sm">Accelerator</div>
              <Link className="text-base" href="/platform/accelerator/tasks">
                Tasks
              </Link>
              <Link className="text-base" href="/platform/accelerator/timeline">
                Timeline
              </Link>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="text-gray-400 text-sm">Dealflow</div>
              <Link
                className="text-base"
                href="/platform/dealflow/startup-database"
              >
                Startup Database
              </Link>
              <Link className="text-base" href="/platform/dealflow/progress">
                Progress
              </Link>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="text-gray-400 text-sm">Fund</div>
              <Link className="text-base" href="/platform/startup-board">
                Startup Board
              </Link>
            </div>
          </div>
          <div className="mt-auto text-base">
            <div className="flex flex-col gap-y-2 ">
              <Link className="text-base" href="/platform/settings">
                Settings
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-16 flex flex-col items-center pt-6 gap-y-2 min-h-screen">
          <button onClick={toggleSidebar}>
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
