const priorityColors = {
  Low: "bg-gray-100 text-gray-700",
  Medium: "bg-blue-100 text-blue-700",
  High: "bg-orange-100 text-orange-700",
  Critical: "bg-red-100 text-red-700",
};

const PriorityBadge = ({ priority }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColors[priority]}`}
    >
      {priority}
    </span>
  );
};

export default PriorityBadge;