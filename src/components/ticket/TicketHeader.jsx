import {
  Clock,
  User,
  AlertTriangle,
} from "lucide-react";

const TicketHeader = ({ ticket }) => {
  return (
    <div className="bg-white rounded-xl shadow border mb-6">

      <div className="p-6">

        <div className="flex justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              {ticket.subject}
            </h1>

            <p className="text-gray-500 mt-2">
              #{ticket.ticketNumber}
            </p>

          </div>

          <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-medium">
            {ticket.status}
          </span>

        </div>

        <div className="grid md:grid-cols-4 gap-6 mt-8">

          <div>

            <p className="text-gray-500 text-sm">
              Priority
            </p>

            <div className="flex gap-2 items-center mt-2">

              <AlertTriangle size={18} />

              <span>{ticket.priority}</span>

            </div>

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Department
            </p>

            <p className="mt-2">
              {ticket.department}
            </p>

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Assigned To
            </p>

            <div className="flex gap-2 items-center mt-2">

              <User size={18} />

              <span>{ticket.agent}</span>

            </div>

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Last Updated
            </p>

            <div className="flex gap-2 items-center mt-2">

              <Clock size={18} />

              <span>{ticket.updatedAt}</span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default TicketHeader;