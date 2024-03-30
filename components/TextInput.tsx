// TextInput.tsx
import React from "react";

interface TextInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  id,
  value,
  onChange,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={id}
        className="mt-1 py-1.5 px-2 w-full rounded-md border-gray-200 border-[1px] sm:text-sm bg-gray-50 focus:bg-white"
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default TextInput;
