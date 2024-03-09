"use client";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/20/solid";
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
            <ChevronLeftIcon className="w-8 h-8" />
          </button>
          <div className="flex flex-col text-lg gap-y-9">
            <div className="flex flex-col gap-y-2">
              <Link href="/" className="text-gray-400 text-base">
                Home
              </Link>
              <Link href="/members">Members</Link>
              <Link href="/">Our Ecosystem</Link>
            </div>
            <div className="flex flex-col gap-y-2">
              <Link href="/accelerator" className="text-gray-400 text-base">
                Accelerator
              </Link>
              <Link href="/accelerator/tasks">Tasks</Link>
              <Link href="/">Timeline</Link>
            </div>
            <div className="flex flex-col gap-y-2">
              <Link href="/dealflow" className="text-gray-400 text-base">
                Dealflow
              </Link>
              <Link href="/dealflow/startup-database">Startup Database</Link>
              <Link href="/dealflow/progress">Progress</Link>
            </div>
            <div className="flex flex-col gap-y-2">
              <Link href="/fund" className="text-gray-400 text-base">
                Fund
              </Link>
              <Link href="/">Startup Database</Link>
              <Link href="/">Progress</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-20 flex flex-col items-center pt-6 gap-y-2 min-h-screen">
          <button onClick={toggleSidebar}>
            <ChevronRightIcon className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
}
