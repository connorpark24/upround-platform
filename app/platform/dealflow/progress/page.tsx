import Header from "@/components/Header";
import StartupCard from "@/components/StartupCard";

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
      <div className="px-8 py-4 flex flex-row w-full gap-x-10">
        <div className="w-1/3">
          <div className="mb-4 text-xl font-medium pl-1">Leaderboard</div>
          <Leaderboard />
        </div>
        <div className="w-2/3">
          <div className="mb-4 text-xl font-medium pl-1">Startups Passed</div>
          <div className="grid grid-cols-3 gap-4">
            <StartupCard />
            <StartupCard />
            <StartupCard />
            <StartupCard />
            <StartupCard />
          </div>
        </div>
      </div>
    </div>
  );
}

function Leaderboard() {
  return (
    <div className="bg-white rounded-lg border-gray-200 border-2 w-full">
      <div className="flex flex-row items-center py-3 px-8 border-b-[1px] border-gray-200 bg-gray-100">
        <div className="w-1/2 font-medium">Name</div>
        <div className="w-1/2 font-medium">Startups Reached</div>
      </div>
      <div>
        {sampleData.map((row, index) => (
          <LeaderboardRow key={index} leaderboardData={row} />
        ))}
        <LeaderboardRow
          key={11}
          leaderboardData={{ name: "Total", count: 123 }}
        />
      </div>
    </div>
  );
}
function LeaderboardRow({ leaderboardData }: TableRowProps) {
  return (
    <div className="flex flex-row h-12 items-center px-8 text-md border-b-[1px] border-gray-200">
      <div className="w-1/2">{leaderboardData.name}</div>
      <div className="w-1/2">{leaderboardData.count}</div>
    </div>
  );
}
