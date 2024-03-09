import Header from "@/components/Header";

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header title="Dashboard" />
      <div className="p-4">
        <div>Annoucements</div>
        <div>Upcoming Events</div>
      </div>
    </div>
  );
}
