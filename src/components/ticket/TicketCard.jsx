import { Link } from "react-router-dom";
import TicketStatusBadge from "./TicketStatusBadge";

const TicketCard = ({ ticket }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-lg transition">

      <div className="flex justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {ticket.ticketNumber}
          </p>

          <h2 className="text-xl font-semibold mt-1">
            {ticket.subject}
          </h2>

          <div className="flex gap-3 mt-3">

            <span className="text-sm bg-gray-100 px-2 py-1 rounded">
              {ticket.department}
            </span>

            <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
              {ticket.priority}
            </span>

          </div>

        </div>

        <TicketStatusBadge status={ticket.status} />

      </div>

      <div className="flex justify-between mt-6">

        <p className="text-sm text-gray-500">
          Created {ticket.createdAt}
        </p>

        <Link
          to={`/tickets/admin/${ticket.id}`}
          className="text-blue-600 font-medium"
        >
          View →
        </Link>

      </div>

    </div>
  );
};

export default TicketCard;