interface DropdownProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  id,
  value,
  onChange,
  options,
}) => {
  return (
    <div>
      <label htmlFor={id} className="text-sm mb-1">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full py-[0.4rem] px-2 rounded-md border-[1px] border-gray-200 text-sm placeholder:text-gray-400"
      >
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
