import Header from "@/components/Header";

type SampleData = {
  name: string;
  count: number;
};

type TableRowProps = {
  leaderboardData: SampleData;
};

const sampleData: SampleData[] = [
  { name: "Keval", count: 38 },
  { name: "Dana", count: 29 },
  { name: "Zach", count: 15 },
  { name: "Ava", count: 9 },
  { name: "Pat", count: 7 },
  { name: "Joe", count: 7 },
  { name: "Leo", count: 6 },
  { name: "Rachel", count: 5 },
  { name: "Sophie", count: 4 },
  { name: "Rui", count: 3 },
].sort((a, b) => b.count - a.count);

export default function Progress() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header title="Progress" />
      <div className="p-8 flex flex-row w-full gap-x-10">
        <div className="w-1/3">
          <div className="mb-4 text-2xl font-medium pl-1">Leaderboard</div>
          <Leaderboard />
        </div>
        <div className="w-2/3">
          <div className="mb-4 text-2xl font-medium pl-1">Startups Passed</div>
          <div className="grid grid-cols-3 gap-4">
            <StartupPassed />
            <StartupPassed />
            <StartupPassed />
            <StartupPassed />
            <StartupPassed />
          </div>
        </div>
      </div>
    </div>
  );
}

function StartupPassed() {
  return (
    <div className="p-4 flex flex-col rounded-lg h-48 border-2 border-gray-200">
      <div className="text-lg font-medium">Title</div>
      <div className="text-base text-gray-400">Name</div>
      <div className="text-base text-gray-400">Description</div>
    </div>
  );
}

function Leaderboard() {
  return (
    <div className="bg-white rounded-lg h-full border-gray-200 border-2 w-full">
      <div className="flex flex-row h-14 items-center p-8 text-md border-b-[1px] border-gray-200 text-lg">
        <div className="w-1/2 font-medium text-base">Name</div>
        <div className="w-1/2 font-medium text-base">Startups Reached</div>
      </div>
      <div>
        {sampleData.map((row, index) => (
          <TableRow key={index} leaderboardData={row} />
        ))}
        <TableRow key={11} leaderboardData={{ name: "Total", count: 123 }} />
      </div>
    </div>
  );
}
function TableRow({ leaderboardData }: TableRowProps) {
  return (
    <div className="flex flex-row h-12 items-center px-8 text-md border-b-[1px] border-gray-200 text-lg">
      <div className="w-1/2">{leaderboardData.name}</div>
      <div className="w-1/2">{leaderboardData.count}</div>
    </div>
  );
}
