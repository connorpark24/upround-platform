type ButtonProps = {
  text: string;
  onClick: () => void;
};

export default function Button({ text, onClick }: ButtonProps) {
  return (
    <div>
      <button
        type="button"
        className="items-center px-6 h-10 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
