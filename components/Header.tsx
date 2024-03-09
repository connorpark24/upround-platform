type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <div className="border-b-[3px] border-gray-100 bg-white flex flex-row items-center justify-between p-8">
      <div className="text-4xl">{title}</div>
    </div>
  );
}
