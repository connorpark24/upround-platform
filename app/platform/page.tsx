"use client";
import Header from "@/components/Header";
import { useSupabase } from "@/utils/supabaseContext";

export default function Dashboard() {
  const { user } = useSupabase();

  return (
    <div className="flex flex-col w-full h-full">
      <Header title="Dashboard" />
      <div className="px-8 py-4 flex flex-row">
        <div className="w-3/5 pr-8">
          <p className="text-xl mb-4">Annoucements</p>
          <AnnouncementCard />
        </div>
        <div className="w-2/5">
          <p className="text-xl mb-4">Upcoming Events</p>
          <EventCard />
        </div>
      </div>
      <div>{user?.email}</div>
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
