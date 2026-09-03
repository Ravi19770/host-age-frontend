import {
  Trash2,
  RefreshCcw,
  FileDown,
  ArrowRightLeft,
} from "lucide-react";

const QuickActions = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-lg font-semibold mb-5">
        Quick Actions
      </h2>

      <div className="space-y-3">

        <button className="w-full flex items-center gap-3 border rounded-lg px-4 py-3 hover:bg-gray-50">
          <ArrowRightLeft size={18} />
          Transfer Ticket
        </button>

        <button className="w-full flex items-center gap-3 border rounded-lg px-4 py-3 hover:bg-gray-50">
          <RefreshCcw size={18} />
          Reopen Ticket
        </button>

        <button className="w-full flex items-center gap-3 border rounded-lg px-4 py-3 hover:bg-gray-50">
          <FileDown size={18} />
          Export PDF
        </button>

        <button className="w-full flex items-center gap-3 border rounded-lg px-4 py-3 text-red-600 hover:bg-red-50">
          <Trash2 size={18} />
          Delete Ticket
        </button>

      </div>

    </div>
  );
};

export default QuickActions;