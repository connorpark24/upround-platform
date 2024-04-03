"use client";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="border-r-[1px] border-gray-30 min-h-screen">
      {isOpen ? (
        <div className="w-60 flex flex-col h-full p-3">
          <button onClick={toggleSidebar} className="p-3">
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <div className="flex flex-col gap-y-9 mt-8">
            <div className="flex flex-col">
              <div className="text-gray-400 text-sm px-2 mb-1">Home</div>
              <Link
                className="text-base px-2 py-1.5 hover:bg-gray-100 rounded-md"
                href="/platform/"
              >
                Dashboard
              </Link>
              <Link
                className="text-base px-2 py-1 hover:bg-gray-100 rounded-md"
                href="/platform/members"
              >
                Members
              </Link>
              <Link
                className="text-base px-2 py-1 hover:bg-gray-100 rounded-md"
                href="/platform/resources"
              >
                Resources
              </Link>
            </div>
            <div className="flex flex-col">
              <div className="text-gray-400 text-sm px-2 mb-1">Accelerator</div>
              <Link
                className="text-base px-2 py-1 hover:bg-gray-100 rounded-md"
                href="/platform/accelerator/tasks"
              >
                Tasks
              </Link>
            </div>
            <div className="flex flex-col">
              <div className="text-gray-400 text-sm px-2 mb-1">Dealflow</div>
              <Link
                className="text-base hover:bg-gray-100 px-2 py-1 rounded-md"
                href="/platform/dealflow/startup-database"
              >
                Startup Database
              </Link>
              <Link
                className="text-base px-2 py-1 hover:bg-gray-100 rounded-md"
                href="/platform/dealflow/progress"
              >
                Progress
              </Link>
            </div>
            <div className="flex flex-col">
              <div className="text-gray-400 text-sm px-2 mb-1">Fund</div>
              <Link
                className="text-base px-2 py-1 hover:bg-gray-100 rounded-md"
                href="/platform/fund/startup-board"
              >
                Startup Board
              </Link>
            </div>
          </div>
          <div className="flex flex-col mt-auto mb-3">
            <Link
              className="text-base px-2 py-1 hover:bg-gray-100 rounded-md"
              href="/platform/profile"
            >
              Profile
            </Link>
            <Link
              className="text-base px-2 py-1 hover:bg-gray-100"
              href="/platform/settings"
            >
              Settings
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-16 flex flex-col items-center min-h-screen pt-6">
          <button onClick={toggleSidebar}>
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
