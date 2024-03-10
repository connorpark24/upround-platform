import Header from "@/components/Header";

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header title="Dashboard" />
      <div className="p-8 flex flex-row">
        <div className="w-3/5 pr-8">
          <p className="text-xl mb-4">Annoucements</p>
          <AnnouncementCard />
        </div>
        <div className="w-2/5">
          <p className="text-xl mb-4">Upcoming Events</p>
          <EventCard />
        </div>
      </div>
    </div>
  );
}

function AnnouncementCard() {
  return (
    <div className="w-full h-32 rounded-md border-[1px] border-gray-200 p-4">
      <p>Title</p>
      <p>Description</p>
    </div>
  );
}

function EventCard() {
  return (
    <div className="w-full h-32 rounded-md border-[1px] border-gray-200 p-4">
      <p>Title</p>
      <p>Description</p>
    </div>
  );
}
