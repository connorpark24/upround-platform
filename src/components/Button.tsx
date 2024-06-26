import { ReactNode } from "react";

type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  icon?: ReactNode;
};

export default function Button({
  text,
  type = "button",
  onClick,
  icon,
}: ButtonProps) {
  return (
    <div>
      <button
        type={type}
        className="shadow-md flex flex-row items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400"
        onClick={onClick}
      >
        <p>{text}</p>
        {/* {icon && <div className="h-7 w-7 ml-3">{icon}</div>} */}
      </button>
    </div>
  );
}
