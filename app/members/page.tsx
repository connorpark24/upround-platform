import Header from "@/components/Header";

type MemberData = {
  name: string;
  year: number;
  phone: string;
  mail: string;
  major: string;
  pod: string;
  hometown: string;
};

type TableRowProps = {
  memberData: MemberData;
};

const sampleData: MemberData[] = [
  {
    name: "John Doe",
    year: 2024,
    phone: "123-456-7890",
    mail: "johndoe@gmail.com",
    major: "Computer Science",
    pod: "Alpha",
    hometown: "Ann Arbor, MI",
  },
  {
    name: "Jane Smith",
    year: 2026,
    phone: "987-654-3210",
    mail: "janesmith@gmail.com",
    major: "Mathematics",
    pod: "Beta",
    hometown: "Fairfax, VA",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full">
      <Header title="Member Database" />
      <div className="m-4 bg-white rounded-lg h-full border-gray-200 border-2">
        <div className="flex flex-row w-full h-14 items-center p-8 text-md border-b-[1px] border-gray-200">
          <div className="w-1/6">Name</div>
          <div className="w-1/6">Contact</div>
          <div className="w-1/6">Major</div>
          <div className="w-1/6">Pod</div>
          <div className="w-1/6">Hometown</div>
        </div>
        <div>
          {sampleData.map((row, index) => (
            <TableRow key={index} memberData={row} />
          ))}
          {sampleData.map((row, index) => (
            <TableRow key={index} memberData={row} />
          ))}
          {sampleData.map((row, index) => (
            <TableRow key={index} memberData={row} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TableRow({ memberData }: TableRowProps) {
  return (
    <div className="flex flex-row h-[4.5rem] items-center p-8 text-md border-b-[1px] border-gray-200">
      <div className="w-1/6">{memberData.name}</div>
      <div className="w-1/6 flex flex-col">
        <div>{memberData.mail}</div>
        <div>{memberData.phone}</div>
      </div>
      <div className="w-1/6">
        {memberData.major}, {memberData.year}
      </div>
      <div className="w-1/6">{memberData.pod}</div>
      <div className="w-1/6">{memberData.hometown}</div>
    </div>
  );
}
