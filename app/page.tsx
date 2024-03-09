import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header title="Home" />
      <div className="p-4">
        <div>Calendar</div>
        <div>Annoucements</div>
        <div>Upcoming Events</div>
      </div>
    </div>
  );
}
