import { ReactNode } from "react";

type ButtonProps = {
  text: string;
  onClick: () => void;
  icon?: ReactNode;
};

export default function Button({ text, onClick, icon }: ButtonProps) {
  return (
    <div>
      <button
        type="button"
        className="shadow-md lex flex-row items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400"
        onClick={onClick}
      >
        <p>{text}</p>
        {/* {icon && <div className="h-7 w-7 ml-3">{icon}</div>} */}
      </button>
    </div>
  );
}
