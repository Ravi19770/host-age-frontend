const RadioCard = ({
  label,
  name,
  value,
  selected,
  onChange,
}) => {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${
        selected === value
          ? "border-blue-600 bg-blue-50"
          : "border-gray-300 hover:border-blue-300"
      }`}
    >
      <input
        type="radio"
        className="hidden"
        name={name}
        value={value}
        checked={selected === value}
        onChange={onChange}
      />

      <div
        className={`h-4 w-4 rounded-full border-2 ${
          selected === value
            ? "border-blue-600 bg-blue-600"
            : "border-gray-400"
        }`}
      />

      <span className="font-medium">{label}</span>
    </label>
  );
};

export default RadioCard;