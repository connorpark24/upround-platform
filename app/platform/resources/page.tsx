"use client";
import { useState } from "react";

import Header from "@/components/Header";
import Button from "@/components/Button";

export default function Resources() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col w-full h-full">
      <Header title="Resources" />
      <div className="flex flex-col gap-y-6 p-8">
        <div className="w-full flex flex-row gap-x-8 mb-2 h-16">
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
              text={"Add Resource"}
              onClick={() => console.log("Button clicked")}
            />
          </div>
        </div>
        <div>
          <p className="text-xl mb-3">Accelerator</p>
          <div className="grid grid-cols-4 gap-8">
            <ResourceTile />
            <ResourceTile />
            <ResourceTile />
            <ResourceTile />
            <ResourceTile />
            <ResourceTile />
          </div>
        </div>
        <div>
          <p className="text-xl mb-3">Fund</p>
          <div className="grid grid-cols-4 gap-8">
            <ResourceTile />
            <ResourceTile />
            <ResourceTile />
          </div>
        </div>

        <div>
          <p className="text-xl mb-3">Dealflow</p>
          <div className="grid grid-cols-4 gap-8">
            <ResourceTile />
            <ResourceTile />
            <ResourceTile /> <ResourceTile />
            <ResourceTile /> <ResourceTile />
            <ResourceTile />
            <ResourceTile />
          </div>
        </div>
        <div>
          <p className="text-xl mb-3">MVC</p>
          <div className="grid grid-cols-4 gap-8">
            <ResourceTile />
            <ResourceTile />
            <ResourceTile />
            <ResourceTile />
          </div>
        </div>
        <div>
          <p className="text-xl mb-3">Michigan Ecosytem</p>
          <div className="grid grid-cols-4 gap-8">
            <ResourceTile />
            <ResourceTile />
            <ResourceTile />
            <ResourceTile />
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourceTile() {
  return (
    <div className="w-full h-32 rounded-xl p-4 border-2 border-gray-200">
      <div className="text-lg mb-1 font-semibold">Title</div>
      <div className="text-md text-gray-500">Description</div>
    </div>
  );
}
