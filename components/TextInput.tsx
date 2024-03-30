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
      <label htmlFor={id} className="text-sm font-medium mb-1">
        {label}
      </label>
      <div>
        <input
          id={id}
          name={id}
          className="py-1.5 px-2 w-full rounded-md border-gray-200 border-[1px] sm:text-sm"
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
    </div>
  );
};

export default TextInput;
