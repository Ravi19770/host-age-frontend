const TicketStats = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="text-lg font-semibold mb-4">
        Ticket Info
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span className="text-gray-500">Priority</span>
          <span className="font-medium text-red-600">
            High
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Department</span>
          <span>Support</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Assigned To</span>
          <span>David</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Created</span>
          <span>21 Jul 2026</span>
        </div>

      </div>
    </div>
  );
};

export default TicketStats;