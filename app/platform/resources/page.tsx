"use client";
import { useState, useEffect } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/Modal";
import Header from "@/components/Header";
import Button from "@/components/Button";
import ResourceForm from "@/components/ResourceForm";
import { Resource } from "@/utils/types";
import supabase from "@/utils/supabaseBrowserClient";

export default function Resources() {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newResource, setNewResource] = useState<Resource>({
    id: 0,
    name: "",
    description: "",
    link: "",
    category: "",
  });

  const [resources, setResources] = useState<{
    [category: string]: Resource[];
  }>({});

  useEffect(() => {
    const fetchResources = async () => {
      const { data, error } = await supabase.from("resources").select("*");
      if (error) {
        console.error("Error fetching resources:", error);
        return;
      }

      const groupedResources = data?.reduce((acc, resource) => {
        acc[resource.category] = acc[resource.category] || [];
        acc[resource.category].push(resource);
        return acc;
      }, {} as { [category: string]: Resource[] });

      setResources(groupedResources || {});
    };

    fetchResources();
  }, []);

  const handleAddResource = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("resources")
      .insert([newResource]);

    if (error) {
      console.error("There was an error inserting the data", error);
      return;
    }

    if (data) {
      setResources((currentResources) => {
        const updatedResources = { ...currentResources };
        (data as Resource[]).forEach((resource) => {
          const category = resource.category;
          updatedResources[category] = updatedResources[category] || [];
          updatedResources[category].push(resource);
        });
        return updatedResources;
      });
    }

    setNewResource({
      id: 0,
      name: "",
      description: "",
      link: "",
      category: "",
    });

    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Header title="Resources" />
      <div className="flex flex-col px-8 py-4">
        <div className="w-full flex flex-row gap-x-8 mb-8 h-16">
          <div>
            <label className="block text-md mb-1">Search</label>
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
              icon={<PlusCircleIcon />}
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
          {Object.entries(resources).map(([category, resources]) => (
            <div key={category}>
              <p className="text-lg mb-3">{category}</p>
              <div className="grid grid-cols-4 gap-4">
                {resources.map((resource) => (
                  <ResourceTile key={resource.name} resource={resource} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResourceTile({ resource }: { resource: Resource }) {
  return (
    <a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full h-32 rounded-xl p-4 border-[1px] border-gray-200 block hover:bg-gray-50"
    >
      <div className="text-base mb-1">{resource.name}</div>
      <div className="text-sm text-gray-500">{resource.description}</div>
    </a>
  );
}
