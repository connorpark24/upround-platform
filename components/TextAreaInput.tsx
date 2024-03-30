interface TextAreaInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  id,
  value,
  onChange,
  rows = 2,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          id={id}
          name={id}
          className="block py-1.5 px-2 w-full rounded-md border-gray-300 border-[1px] sm:text-sm"
          value={value}
          onChange={onChange}
          rows={rows}
          {...props}
        />
      </div>
    </div>
  );
};

export default TextAreaInput;
