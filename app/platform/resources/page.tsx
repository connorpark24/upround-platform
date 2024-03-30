"use client";
import { useState, useEffect } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/Modal";
import Header from "@/components/Header";
import Button from "@/components/Button";
import ResourceForm from "@/components/ResourceForm";
import TextInput from "@/components/TextInput";
import { Resource, Pod } from "@/utils/types";
import useSupabase from "@/hooks/useSupabase";

export default function Resources() {
  const { supabase } = useSupabase();

  const [query, setQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newResource, setNewResource] = useState<Resource>({
    name: "",
    description: "",
    link: "",
    pod: Pod.Accelerator,
  });

  const [resources, setResources] = useState<{ [key in Pod]: Resource[] }>({});

  useEffect(() => {
    const fetchResources = async () => {
      const { data, error } = await supabase.from("resources").select("*");
      if (error) {
        console.error("Error fetching resources:", error);
        return;
      }

      const groupedResources = data?.reduce((acc, resource) => {
        acc[resource.pod] = acc[resource.pod] || [];
        acc[resource.pod].push(resource);
        return acc;
      }, {} as { [pod: string]: Resource[] });

      setResources(groupedResources || {});
    };

    fetchResources();
  }, [supabase]);

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
          const pod = resource.pod;
          updatedResources[pod] = updatedResources[pod] || [];
          updatedResources[pod].push(resource);
        });
        return updatedResources;
      });
    }

    setNewResource({
      name: "",
      description: "",
      link: "",
      pod: Pod.Accelerator,
    });

    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Header title="Resources" />
      <div className="flex flex-col px-8 py-4">
        <div className="w-full flex flex-row gap-x-8 mb-8 h-16">
          <div className="w-64">
            <TextInput
              label="Search"
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
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
          {Object.entries(resources).map(([pod, resources]) => (
            <div key={pod}>
              <p className="text-lg mb-3">{pod}</p>
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
