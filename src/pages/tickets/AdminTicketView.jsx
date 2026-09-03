import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CustomerCard from "../../components/ticket/CustomerCard";
import TicketManagement from "../../components/ticket/TicketManagement.jsx";
import AssignAgentModal from "../../components/ticket/AssignAgentModal";
import InternalNotes from "../../components/ticket/InternalNotes";
import ActivityTimeline from "../../components/ticket/TicketTimeline";
import QuickActions from "../../components/ticket/QuickActions";

import MessageBubble from "../../components/ticket/MessageBubble";
import ReplyBox from "../../components/ticket/ReplyBox";

const AdminTicketView = () => {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchTicket = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/tickets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      setTicket(res.data.ticket);
    } catch (err) {
      console.log(err);
    }
  };

  if (!ticket) {
    return <h2 className="p-10">Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2">

            <div className="bg-white rounded-xl shadow p-6 space-y-5">

              {ticket.TicketMessages?.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}

            </div>

            <div className="mt-6">
              <ReplyBox ticket={ticket} />
            </div>

          </div>

          <div className="space-y-6">

            <CustomerCard ticket={ticket} />

            <TicketManagement ticket={ticket} />

            <AssignAgentModal ticket={ticket} />

            <InternalNotes ticket={ticket} />

            <ActivityTimeline ticket={ticket} />

            <QuickActions ticket={ticket} />

          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminTicketView;