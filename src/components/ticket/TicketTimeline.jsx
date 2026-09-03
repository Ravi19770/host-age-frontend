const steps = [
  "Created",
  "Assigned",
  "In Progress",
  "Resolved",
  "Closed",
];

const TicketTimeline = () => {
  return (
    <div className="bg-white rounded-xl shadow p-5">

      <h3 className="font-bold mb-5">
        Timeline
      </h3>

      {steps.map((step, index) => (
        <div
          key={index}
          className="flex gap-4 mb-5"
        >
          <div className="w-3 h-3 rounded-full bg-blue-600 mt-2" />

          <p>{step}</p>
        </div>
      ))}
    </div>
  );
};

export default TicketTimeline;