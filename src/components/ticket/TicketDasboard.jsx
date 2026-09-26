import { useEffect, useState } from "react";

import TicketTable from "../../components/Admin/TicketTable";
import api from "../../api/axios";

const TicketDashboard = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await api.get("/api/tickets");

      console.log("Tickets =>", res.data);

      setTickets(res.data.tickets);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <TicketTable tickets={tickets} />
    </div>
  );
};

export default TicketDashboard;