export default function Tasks() {
  return (
    <div className="flex flex-col w-full p-8">
      <h1 className="text-5xl">Formi</h1>
      <div className="grid grid-cols-4 w-full h-full gap-6 mt-8">
        <MemberTile />
        <MemberTile />
        <MemberTile />
        <MemberTile />
        <MemberTile />
        <MemberTile />
      </div>
    </div>
  );
}

const MemberTile = () => {
  return (
    <div className="flex flex-col bg-white rounded-3xl w-full h-full p-6">
      <h1 className="text-xl">Name</h1>
    </div>
  );
};
