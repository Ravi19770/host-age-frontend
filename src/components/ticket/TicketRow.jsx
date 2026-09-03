import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

import TicketStatusBadge from "./TicketStatusBadge";
import PriorityBadge from "./PriorityBadge";
import AgentAvatar from "./AgentAvtar";

const TicketRow = ({ ticket }) => {
  return (
    <tr className="border-b hover:bg-gray-50 transition">

      <td className="px-6 py-4 font-semibold">
        {ticket.ticketNumber}
      </td>

      <td className="px-6 py-4">
        <div>

          <p className="font-medium">
            {ticket.subject}
          </p>

          <p className="text-sm text-gray-500">
            {ticket.department}
          </p>

        </div>
      </td>

      <td className="px-6 py-4">
        {ticket.customer}
      </td>

      <td className="px-6 py-4">
        <PriorityBadge
          priority={ticket.priority}
        />
      </td>

      <td className="px-6 py-4">
        <TicketStatusBadge
          status={ticket.status}
        />
      </td>

      <td className="px-6 py-4">
        <AgentAvatar
          agent={ticket.agent}
        />
      </td>

      <td className="px-6 py-4">

        <Link
          to={`/tickets/admin/${ticket.id}`}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Eye size={16} />
          View
        </Link>

      </td>

    </tr>
  );
};

export default TicketRow;