import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import TicketHeader from "../../components/ticket/TicketHeader";
import MessageBubble from "../../components/ticket/MessageBubble";
import ReplyBox from "../../components/ticket/ReplyBox";
import TicketTimeline from "../../components/ticket/TicketTimeline";
import CustomerCard from "../../components/ticket/CustomerCard";
import TicketStats from "../../components/ticket/TicketStats";

const TicketDetails = () => {

  // Dummy data (replace later with API)
  const ticket = {
    ticketNumber: "TK-10001",
    subject: "Website Down",
    status: "Open",
    priority: "High",
    department: "Technical",
    agent: "Rahul",
    updatedAt: "2 mins ago",
  };

  const messages = [
    {
      id: 1,
      sender: "Abhishek",
      message: "My website is not loading.",
      time: "09:20 AM",
      senderType: "Customer",
    },
    {
      id: 2,
      sender: "Technical Support",
      message: "Can you share a screenshot?",
      time: "09:25 AM",
      senderType: "Agent",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">

      <div className="max-w-7xl mx-auto px-6">

        <Link
          to="/tickets"
          className="inline-flex items-center gap-2 text-blue-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Tickets
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2">

            <TicketHeader ticket={ticket} />

            <div className="bg-white rounded-xl shadow p-6 mt-6 space-y-5">

              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                />
              ))}

            </div>

            <div className="mt-6">
              <ReplyBox />
            </div>

          </div>

          <div className="space-y-6">

            <CustomerCard ticket={ticket} />

            <TicketStats ticket={ticket} />

            <TicketTimeline ticket={ticket} />

          </div>

        </div>

      </div>

    </div>
  );
};

export default TicketDetails;