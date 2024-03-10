type ButtonProps = {
  text: string;
};

export default function Button({ text }: ButtonProps) {
  return (
    <div>
      <button
        type="button"
        className="tems-center px-6 h-10 items-center border border-transparent text-sm font-medium rounded-md  text-white bg-green-600"
      >
        {text}
      </button>
    </div>
  );
}
