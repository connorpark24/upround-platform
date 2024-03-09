import Header from "@/components/Header";

export default function Resources() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header title="Resources" />
      <div className="flex flex-col gap-y-6 p-8">
        <div>
          <div className="text-2xl mb-3">Accelerator</div>
          <div className="grid grid-cols-4 gap-8">
            <ResourceTile />
            <ResourceTile />
            <ResourceTile />
            <ResourceTile />
          </div>
        </div>
        <div>
          <div className="text-2xl mb-3">Fund</div>
          <div className="grid grid-cols-4 gap-8">
            <ResourceTile />
            <ResourceTile />
            <ResourceTile />
            <ResourceTile />
          </div>
        </div>

        <div>
          <div className="text-2xl mb-3">Dealflow</div>
          <div className="grid grid-cols-4 gap-8">
            <ResourceTile />
            <ResourceTile />
            <ResourceTile />
            <ResourceTile />
          </div>
        </div>
        <div>
          <div className="text-2xl mb-3">MVC</div>
          <div className="grid grid-cols-4 gap-8">
            <ResourceTile />
            <ResourceTile />
            <ResourceTile />
            <ResourceTile />
          </div>
        </div>
        <div>
          <div className="text-2xl mb-3">Michigan Ecosytem</div>
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
    <div className="w-full h-56 rounded-xl p-4 border-2 border-gray-200">
      <div className="text-xl mb-2 font-semibold">Title</div>
      <div className="text-lg text-gray-500">Description</div>
    </div>
  );
}
