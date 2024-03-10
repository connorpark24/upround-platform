"use client";
import { useState } from "react";
import Modal from "@/components/Modal";
import Header from "@/components/Header";
import Button from "@/components/Button";
import ResourceForm from "@/components/ResourceForm";
import { Resource } from "@/utils/types";

export default function Resources() {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newResource, setNewResource] = useState<Resource>({
    name: "",
    description: "",
    link: "",
    category: "",
  });

  const handleAddResource = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newResource.name);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Header title="Resources" />
      <div className="flex flex-col px-8 py-4">
        <div className="w-full flex flex-row gap-x-8 mb-8 h-16">
          <div>
            <label className="block text-md font-medium mb-1">Search</label>
            <div>
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                className="w-64 h-10 rounded-md border-[1px] p-2 text-sm placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="self-end ml-auto">
            <Button
              text={"Add Resource"}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          <Modal isOpen={isModalOpen}>
            <ResourceForm
              newResource={newResource}
              setNewResource={setNewResource}
              onSubmit={handleAddResource}
              onClose={() => setIsModalOpen(false)}
            />
          </Modal>
        </div>
        <div className="flex flex-col gap-y-8">
          <div>
            <p className="text-lg mb-3">Accelerator</p>
            <div className="grid grid-cols-4 gap-4">
              <ResourceTile />
              <ResourceTile />
              <ResourceTile />
              <ResourceTile />
              <ResourceTile />
              <ResourceTile />
            </div>
          </div>
          <div>
            <p className="text-lg mb-3">Fund</p>
            <div className="grid grid-cols-4 gap-4">
              <ResourceTile />
              <ResourceTile />
              <ResourceTile />
            </div>
          </div>
          <div>
            <p className="text-lg mb-3">Dealflow</p>
            <div className="grid grid-cols-4 gap-4">
              <ResourceTile />
              <ResourceTile />
              <ResourceTile /> <ResourceTile />
              <ResourceTile /> <ResourceTile />
              <ResourceTile />
              <ResourceTile />
            </div>
          </div>
          <div>
            <p className="text-lg mb-3">MVC</p>
            <div className="grid grid-cols-4 gap-4">
              <ResourceTile />
              <ResourceTile />
              <ResourceTile />
              <ResourceTile />
            </div>
          </div>
          <div>
            <p className="text-lg mb-3">Michigan Ecosytem</p>
            <div className="grid grid-cols-4 gap-4">
              <ResourceTile />
              <ResourceTile />
              <ResourceTile />
              <ResourceTile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourceTile() {
  return (
    <div className="w-full h-32 rounded-xl p-4 border-[1px] border-gray-200">
      <div className="text-base mb-1">Title</div>
      <div className="text-sm text-gray-500">Description</div>
    </div>
  );
}
