type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <div className="border-b-[1px] border-gray-30 bg-white flex flex-row items-center justify-between p-8">
      <div className="text-2xl">{title}</div>
    </div>
  );
}
